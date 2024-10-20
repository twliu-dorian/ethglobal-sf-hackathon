const { userPrivateKey, commitmentGeneratorWasmPath, apiUrlKey, contractAddress, userAddress } = require("./config.js");
const wc = require("../../commit-to-donation_js/witness_calculator.js");
const { ethers, JsonRpcProvider } = require("ethers");
const { utils } = require("./utils.js");
const config = require("./config.js");
const fs = require('fs').promises;
const path = require('path');

const signerWallet = new ethers.Wallet(userPrivateKey);
const provider = new JsonRpcProvider(apiUrlKey);
const signer = signerWallet.connect(provider);

const wishListNFT = require("../../artifacts/contracts/Wishlist.sol/WishlistNFT.json");
const wishListNFTabi = wishListNFT.abi;
const wishListNFTInterface = new ethers.Interface(wishListNFTabi);

const calculateCommitment = async (value, secret) => {
    try {
        const input = {
            secret: utils.generateRandomBitString(256).split(''),
            nullifier: utils.generateRandomBitString(256).split(''),
        };

        const secretBinary = input.secret.join('');
        // const secretString = BigInt('0b' + secretBinary).toString();
        const nullifierBinary = input.nullifier.join('');
        // const nullifierString = BigInt('0b' + nullifierBinary).toString();

        const absolutePath = path.resolve(commitmentGeneratorWasmPath);
        const wasmBuffer = await fs.readFile(absolutePath);
        var secret = await wc(wasmBuffer);

        const witnessResult = await secret.calculateWitness(input, 0);

        const commitment = witnessResult[1];
        const nullifierHash = witnessResult[2];

        const valueWei = ethers.parseEther(value);
        const unsignedTx = {
            to: contractAddress,
            from: userAddress,
            value: valueWei,
            data: wishListNFTInterface.encodeFunctionData("commitmentStorage", [commitment])
        };
        console.log(unsignedTx);

        const tx = await signer.sendTransaction(unsignedTx);
        await tx.wait();

        const txReceipt = await provider.getTransactionReceipt(tx.hash);
        console.log('Transaction Receipt:', txReceipt);

        const log = txReceipt.logs[0];

        const decodedData = wishListNFTInterface.decodeEventLog(
            "commitmentEvent",
            log.data,
            log.topics
        );
        console.log('Decoded event data:', decodedData);

        const secretElements = {
            root: BigInt(decodedData.root).toString(),
            nullifierHash: nullifierHash.toString(),
            commitment: commitment.toString(),
            hashPairings: decodedData.hashPairings.map((n) => BigInt(n).toString()),
            hashDirections: decodedData.pairDirection.toString(),
            txHash: tx.hash
        };

        console.log("proof elements:", secretElements);
        secretB64 = btoa(JSON.stringify(secretElements));
        const resolvedPath = path.resolve(__dirname, config.secretPath);
        console.log("Resolved path:", resolvedPath);
        await fs.writeFile(resolvedPath, secretB64);

    } catch (e) {
        console.log(e);
    }
};

calculateCommitment('1', 'your_secret_here').then(() => {
    console.log('Commitment calculation complete');
}).catch((error) => {
    console.error('Error:', error);
});