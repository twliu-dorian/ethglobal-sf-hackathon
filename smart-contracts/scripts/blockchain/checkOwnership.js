require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;

async function checkOwnership(itemId) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const contract = new ethers.Contract(contractAddress, ['function ownerOf(uint256 tokenId) view returns (address)'], provider);

    console.log("Checking ownership...");
    const owner = await contract.ownerOf(itemId);
    console.log(`The owner of item ${itemId} is: ${owner}`);
}

const itemId = "1234567890123456789012345678901234567890";

checkOwnership(itemId)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });