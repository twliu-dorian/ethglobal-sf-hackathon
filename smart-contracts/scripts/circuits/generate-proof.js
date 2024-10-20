const fs = require("fs").promises;
const path = require('path');
const config = require("./config.js");
const { utils } = require("./utils.js");
const { plonkVerifier } = require("./plonk.js");

const generateProof = async () => {
    try {
        // Resolve the path relative to the current script
        const resolvedPath = path.resolve(__dirname, config.secretPath);
        console.log("Resolved path:", resolvedPath);

        const proofString = await fs.readFile(resolvedPath, 'utf8');
        let proofElements;
        try {
            proofElements = JSON.parse(Buffer.from(proofString, 'base64').toString('utf8'));
        } catch (parseError) {
            console.error("Error parsing proof file. It might not be base64 encoded. Trying direct JSON parse...");
            proofElements = JSON.parse(proofString);
        }

        const proofInput = {
            "root": proofElements.root,
            "nullifierHash": proofElements.nullifierHash,
            "itemId": "1234567890123456789012345678901234567890", // TODO: Modify this as needed
            "commitment": proofElements.commitment,
            "hashPairings": proofElements.hashPairings,
            "hashDirections": utils.convertToBinaryArray(proofElements.hashDirections),
        };
        console.log("Proof input:", proofInput);

        const jsonData = JSON.stringify(proofInput, null, 2);
        await fs.writeFile(path.resolve(__dirname, '../../fulfill_js/input.json'), jsonData);
        console.log("Proof input saved to input.json", proofInput);
        const txReceipt = await plonkVerifier(proofInput);
        console.log('Transaction Receipt:', txReceipt);

        return txReceipt;
    } catch (error) {
        console.error('Error in generateProof:', error);
        throw error;
    }
};

generateProof()
    .then(() => {
        console.log('Proof generation complete');
    })
    .catch((error) => {
        console.error('Error in proof generation:', error);
        process.exit(1);
    });