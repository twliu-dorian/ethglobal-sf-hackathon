const { userPrivateKey, commitmentGeneratorWasmPath, apiUrlKey, contractAddress, proofPath } = require("./config.js")
const wc = require("../../commit-to-donation_js/witness_calculator.js")
const { ethers, JsonRpcProvider } = require("ethers")
const { utils } = require("./utils.js")
const fs = require('fs').promises;
const fs2 = require('fs');
const path = require('path');

const signerWallet = new ethers.Wallet(userPrivateKey);
const provider = new JsonRpcProvider(apiUrlKey);
const signer = signerWallet.connect(provider);

const zkAgreementJSON = require("../../artifacts/contracts/zkAgreement.sol/zkAgreement.json")
const zkAgreementABI = zkAgreementJSON.abi;
const zkAgreementInterface = new ethers.Interface(zkAgreementABI)

const calculateCommitment = async (value, secret) => {
    try {
        const input = {
            secret: utils.generateRandomBitString(256).split(''),
            nullifier: utils.generateRandomBitString(256).split(''),
        }

        const secretBinary = input.secret.join('');
        const secretString = BigInt('0b' + secretBinary).toString();
        const nullifierBinary = input.nullifier.join('');
        const nullifierString = BigInt('0b' + nullifierBinary).toString();

        const absolutePath = path.resolve(commitmentGeneratorWasmPath);
        const wasmBuffer = await fs.readFile(absolutePath);
        var secret = await wc(wasmBuffer);

        const witnessResult = await secret.calculateWitness(input, 0);

        const commitment = witnessResult[1];
        const nullifierHash = witnessResult[2];

        const valueWei = ethers.parseEther(value);
        const unsignedTx = {
            to: zkAgreementAddress,
            from: buyerAddress,
            value: valueWei,
            data: zkAgreementInterface.encodeFunctionData("agreement", [commitment])
        };
        console.log(unsignedTx)

        const tx = await signer.sendTransaction(unsignedTx);
        await tx.wait();

        const txReceipt = await provider.getTransactionReceipt(tx.hash);
        console.log('Transaction Receipt:', txReceipt);

        const log = txReceipt.logs[0];

        const decodedData = zkAgreementInterface.decodeEventLog("Agreement", log.data, log.topics);

        const proofElements = {
            merkleRoot: BigInt(decodedData.root).toString(),
            nullifierHash: nullifierHash.toString(),
            secret: secretString,
            nullifier: nullifierString,
            commitment: commitment.toString(),
            hashPairings: decodedData.hashPairings.map((n) => BigInt(n).toString()),
            hashDirections: decodedData.pairDirection.toString(),
            commitmentValue: ethers.formatUnits(decodedData.commitmentValue, "ether").toString(),
            txHash: tx.hash
        };

        console.log("proof elements:", proofElements);
        proofB64 = btoa(JSON.stringify(proofElements));
        fs2.writeFileSync(proofPath, proofB64);

    } catch (e) {
        console.log(e);
    }
}

calculateCommitment('0.1', 'your_secret_here').then(() => {
    console.log('Commitment calculation complete');
}).catch((error) => {
    console.error('Error:', error);
});