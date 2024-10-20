require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.RECIPIENT_PRIVATE_KEY;

async function addWishlistItem(itemId, price, recipient, manufacturer) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const wallet = new ethers.Wallet(privKey, provider);
    const contract = new ethers.Contract(contractAddress, ['function addWishlistItem(uint256 itemId, uint8 price, address recipient, address manufacturer)'], wallet);

    console.log("Adding wishlist item...");
    const tx = await contract.addWishlistItem(itemId, price, recipient, manufacturer, { gasLimit: 300000 });
    await tx.wait();
    console.log("Wishlist item added successfully!");
}

const itemId = "1234567890123456789012345678901234567890";
const price = 3;
const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const manufacturer = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

addWishlistItem(itemId, price, recipient, manufacturer)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });