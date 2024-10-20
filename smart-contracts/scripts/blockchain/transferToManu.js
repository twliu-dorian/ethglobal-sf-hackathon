require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.RECIPIENT_PRIVATE_KEY;

async function transferToManufacturer(itemId, manufacturer) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const wallet = new ethers.Wallet(privKey, provider);
    const contract = new ethers.Contract(contractAddress, ['function transferFrom(address from, address to, uint256 tokenId)'], wallet);

    console.log("Transferring NFT to manufacturer...");
    const tx = await contract.transferFrom(wallet.address, manufacturer, itemId, { gasLimit: 300000 });
    await tx.wait();
    console.log("NFT transferred successfully!");
}

const itemId = "1234567890123456789012345678901234567890";
const manufacturer = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

transferToManufacturer(itemId, manufacturer)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });