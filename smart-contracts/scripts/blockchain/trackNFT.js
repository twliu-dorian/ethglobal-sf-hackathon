// trackWishlistNFTEvents.js
require('dotenv').config();
const { ethers } = require('ethers');

// Replace with your contract's address
const contractAddress = process.env.CONTRACT_ADDRESS;
const apiUrlKey = process.env.API_URL_KEY;

// ABI for the events we're interested in
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "price",
                "type": "uint8"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "WishlistItemAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "amount",
                "type": "uint8"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "fulfiller",
                "type": "address"
            }
        ],
        "name": "WishlistFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "NFTMinted",
        "type": "event"
    }
];

async function trackWishlistNFTEvents() {
    // Connect to the Ethereum network
    const provider = new ethers.JsonRpcProvider(apiUrlKey);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);

    console.log("Listening for WishlistNFT events...");

    // Set up event listeners
    contract.on("WishlistItemAdded", (itemId, price, recipient, event) => {
        console.log("\nWishlist Item Added!");
        console.log("Item ID:", itemId.toString());
        console.log("Price:", price);
        console.log("Recipient:", recipient);
        console.log("Transaction Hash:", event.transactionHash);
        console.log("Block Number:", event.blockNumber);
        console.log("---");
    });

    contract.on("WishlistFulfilled", (itemId, amount, fulfiller, event) => {
        console.log("\nWishlist Fulfilled!");
        console.log("Item ID:", itemId.toString());
        console.log("Amount:", amount);
        console.log("Fulfiller:", fulfiller);
        console.log("Transaction Hash:", event.transactionHash);
        console.log("Block Number:", event.blockNumber);
        console.log("---");
    });

    contract.on("NFTMinted", (itemId, recipient, event) => {
        console.log("\nNFT Minted!");
        console.log("Item ID:", itemId.toString());
        console.log("Recipient:", recipient);
        console.log("Transaction Hash:", event.transactionHash);
        console.log("Block Number:", event.blockNumber);
        console.log("---");
    });

    // Keep the script running
    await new Promise(() => { });
}

trackWishlistNFTEvents()
    .then(() => {
        // This won't be reached as the script keeps running
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        process.exit(1);
    });