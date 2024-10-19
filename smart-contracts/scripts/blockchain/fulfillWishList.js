// fulfill-wishlist.js
require('dotenv').config();
const { ethers } = require('ethers');

// Replace with your contract's address
const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;
const privKey = process.env.USER_PRIVATE_KEY;

// Replace with your contract's ABI
const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "amount",
                "type": "uint8"
            }
        ],
        "name": "fulfillWishlist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function fulfillWishlistItem(itemId, amount) {
    // Connect to the Ethereum network
    const provider = new ethers.JsonRpcProvider(apiUrlKey);

    // Create a wallet instance
    const wallet = new ethers.Wallet(privKey, provider);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Send a transaction to fulfill the wishlist item
    try {
        const tx = await contract.fulfillWishlist(itemId, amount, { gasLimit: 300000 });
        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Wishlist item fulfilled successfully!");
        console.log("Item ID:", itemId);
        console.log("Amount fulfilled:", amount);
    } catch (error) {
        console.error("Error details:", error);
        if (error.reason) {
            console.error("Revert reason:", error.reason);
        }
    }
}

// ----------inputs-----------
// Replace these with actual values or command line arguments
const itemId = "0xf1055091e0ade97fcac4ccc88f906bc20881442f0e02aef19a9834cd8125281b"; // Example itemId
const amount = 1; // Example amount to fulfill
console.log("\nGenerated Values:");
console.log("Item ID:", itemId);
console.log("Amount:", amount);
// ---------------------------

fulfillWishlistItem(itemId, amount)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });