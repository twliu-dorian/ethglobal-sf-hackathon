require('dotenv').config();

module.exports = {
    apiUrlKey: process.env.API_URL_KEY,
    userPrivateKey: process.env.USER_PRIVATE_KEY,
    commitmentGeneratorWasmPath: process.env.COMMITMENT_WASM_PATH,
    contractAddress: process.env.CONTRACT_ADDRESS,
    proofPath: process.env.PROOF_PATH,
    plonkZkeyPath: process.env.PLONK_ZKEY_PATH
};
