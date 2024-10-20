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
        "stateMutability": "payable",
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
        // Calculate the Ether amount to send
        const etherAmount = ethers.parseEther(amount.toString());

        const tx = await contract.fulfillWishlist(itemId, amount, {
            gasLimit: 300000,
            value: etherAmount  // Send the calculated Ether amount
        });
        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Wishlist item fulfilled successfully!");
        console.log("Item ID:", itemId);
        console.log("Amount fulfilled:", amount);
        console.log("Ether sent:", ethers.formatEther(etherAmount), "ETH");
    } catch (error) {
        console.error("Error details:", error);
        if (error.reason) {
            console.error("Revert reason:", error.reason);
        }
    }
}

// ----------inputs-----------
// Replace these with actual values or command line arguments
var args = process.argv.slice(2);
var itemId;
var amount;

if (typeof args === 'undefined' || args.length == 0) {
    itemId = "1234567890123456789012345678901234567890"; // Example itemId
    amount = 1; // Example amount to fulfill (in Ether)
} else {
    itemId = args[0]
    amount = args[1]
}


console.log("\nGenerated Values:");
console.log("Item ID:", itemId);
console.log("Amount (in Ether):", amount);
// ---------------------------

fulfillWishlistItem(itemId, amount)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });