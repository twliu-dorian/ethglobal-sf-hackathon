require('dotenv').config();

module.exports = {
    apiUrlKey: process.env.API_URL_KEY,
    userPrivateKey: process.env.USER_PRIVATE_KEY,
    userAddress: process.env.USER_ADDRESS,

    platformPrivateKey: process.env.PLATFORM_PRIVATE_KEY,
    platformAddress: process.env.PLATFORM_ADDRESS,

    commitmentGeneratorWasmPath: process.env.COMMITMENT_WASM_PATH,
    fulfillWasmPath: process.env.FULFILL_WASM_PATH,

    contractAddress: process.env.CONTRACT_ADDRESS,

    secretPath: process.env.SECRET_PATH,

    plonkZkeyPath: process.env.PLONK_ZKEY_PATH
};
