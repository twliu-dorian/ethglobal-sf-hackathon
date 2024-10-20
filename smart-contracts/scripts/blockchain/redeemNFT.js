require('dotenv').config();
const { ethers } = require('ethers');

const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.MANUFACTURER_PRIVATE_KEY;

async function redeemNFT(itemId) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);
    const wallet = new ethers.Wallet(privKey, provider);
    const contract = new ethers.Contract(contractAddress, [
        'function burnAndRedeem(uint256 tokenId)',
        'function ownerOf(uint256 tokenId) view returns (address)',
        'function itemManufacturers(uint256 tokenId) view returns (address)'
    ], wallet);

    console.log("Checking current owner and manufacturer...");
    const currentOwner = await contract.ownerOf(itemId);
    const manufacturer = await contract.itemManufacturers(itemId);
    console.log("Current owner:", currentOwner);
    console.log("Manufacturer:", manufacturer);
    console.log("Wallet address:", wallet.address);

    if (manufacturer.toLowerCase() !== wallet.address.toLowerCase()) {
        throw new Error("The wallet used does not belong to the manufacturer of this NFT");
    }

    if (currentOwner.toLowerCase() !== wallet.address.toLowerCase()) {
        console.warn("Warning: The manufacturer is not the current owner of the NFT. Make sure it has been transferred to the manufacturer before redeeming.");
    }

    console.log("Redeeming NFT...");
    const tx = await contract.burnAndRedeem(itemId, { gasLimit: 300000 });
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