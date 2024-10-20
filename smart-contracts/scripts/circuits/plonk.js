const snarkJS = require("snarkjs");
const { ethers, JsonRpcProvider } = require("ethers");
const { plonkZkeyPath, fulfillWasmPath, contractAddress, apiUrlKey, platformPrivateKey, platformAddress } = require("./config.js");
const { utils } = require("./utils.js");

const signerWallet = new ethers.Wallet(platformPrivateKey);
const provider = new JsonRpcProvider(apiUrlKey);
const signer = signerWallet.connect(provider);

const wishListNFT = require("../../artifacts/contracts/Wishlist.sol/WishlistNFT.json");
const wishListNFTabi = wishListNFT.abi;
const wishListNFTInterface = new ethers.Interface(wishListNFTabi);

const plonkVerifier = async (proofInput) => {
    try {
        // Generate proof and public signals using snarkJS
        console.log("proof input from plonk js", proofInput);
        const { proof, publicSignals } = await snarkJS.plonk.fullProve(proofInput, fulfillWasmPath, plonkZkeyPath);
        console.log("zero knowledge proofs:\n", proof);
        console.log("circuit public signals:\n", publicSignals);

        // Generate proof and public signals JSON
        utils.generateProofJSON(proof);
        utils.generatePublicJSON(publicSignals);

        var proofA = proof.A.slice(0, 2).map(utils.BN256ToHex)
        var proofB = proof.B.slice(0, 2).map(utils.BN256ToHex)
        var proofC = proof.C.slice(0, 2).map(utils.BN256ToHex)
        var proofZ = proof.Z.slice(0, 2).map(utils.BN256ToHex)
        var proofT1 = proof.T1.slice(0, 2).map(utils.BN256ToHex)
        var proofT2 = proof.T2.slice(0, 2).map(utils.BN256ToHex)
        var proofT3 = proof.T3.slice(0, 2).map(utils.BN256ToHex)
        var proofWxi = proof.Wxi.slice(0, 2).map(utils.BN256ToHex)
        var proofWxiw = proof.Wxiw.slice(0, 2).map(utils.BN256ToHex)
        // Extract proof components and map to hex
        const proofInputs = [
            ...proofA, ...proofB, ...proofC, ...proofZ, ...proofT1, ...proofT2, ...proofT3, ...proofWxi, ...proofWxiw,
            utils.BN256ToHex(proof.eval_a),
            utils.BN256ToHex(proof.eval_b),
            utils.BN256ToHex(proof.eval_c),
            utils.BN256ToHex(proof.eval_s1),
            utils.BN256ToHex(proof.eval_s2),
            utils.BN256ToHex(proof.eval_zw),
        ];
        const callInputs = [proofInputs, publicSignals.slice(0, 3).map(utils.BN256ToHex)];

        console.log("smart contract call inputs:\n", callInputs);

        // Create transaction object
        const unsignedTx = {
            to: contractAddress,
            from: platformAddress,
            data: wishListNFTInterface.encodeFunctionData("verifyPlonk", callInputs)
        };

        // Send transaction and wait for receipt
        const tx = await signer.sendTransaction(unsignedTx);
        const receipt = await tx.wait(); // Wait for transaction receipt

        return receipt;
    } catch (error) {
        console.error("Error in plonkVerifier:", error);
    } finally {
        provider.removeAllListeners(); // Clean up any lingering listeners
        provider._websocket?.terminate(); // If using a websocket provider, terminate the connection
    }
}

module.exports = {
    plonkVerifier
};

