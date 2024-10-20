require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.RECIPIENT_PRIVATE_KEY;

async function transferToManufacturer(itemId) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const wallet = new ethers.Wallet(privKey, provider);
    const contract = new ethers.Contract(contractAddress, [
        'function transferToManufacturer(uint256 tokenId)'
    ], wallet);

    console.log("Transferring NFT to manufacturer...");
    const tx = await contract.transferToManufacturer(itemId, { gasLimit: 300000 });
    await tx.wait();
    console.log("NFT transferred successfully!");
}

const itemId = "1234567890123456789012345678901234567890";

transferToManufacturer(itemId)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });