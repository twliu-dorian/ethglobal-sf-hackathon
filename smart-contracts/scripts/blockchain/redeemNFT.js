require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.MANUFACTURER_PRIVATE_KEY;

async function redeemNFT(itemId) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const wallet = new ethers.Wallet(privKey, provider);
    const contract = new ethers.Contract(contractAddress, ['function redeemNFT(uint256 tokenId)'], wallet);

    console.log("Redeeming NFT...");
    const tx = await contract.redeemNFT(itemId, { gasLimit: 300000 });
    await tx.wait();
    console.log("NFT redeemed successfully!");
}

const itemId = "1234567890123456789012345678901234567890";

redeemNFT(itemId)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });