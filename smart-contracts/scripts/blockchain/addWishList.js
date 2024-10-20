// require('dotenv').config();
// const { ethers } = require('ethers');
// const crypto = require('crypto');

// // Replace with your contract's address
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const apiUrlKey = process.env.API_URL_KEY;
// const privKey = process.env.USER_PRIVATE_KEY;
// // Replace with your contract's ABI
// const abi = [
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "itemId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint8",
//                 "name": "price",
//                 "type": "uint8"
//             },
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             }
//         ],
//         "name": "addWishlistItem",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

// async function addWishlistItem() {
//     // Connect to the Ethereum network
//     const provider = new ethers.JsonRpcProvider(apiUrlKey);

//     // Create a wallet instance
//     const wallet = new ethers.Wallet(privKey, provider);

//     // Create a contract instance
//     const contract = new ethers.Contract(contractAddress, abi, wallet);

//     // // Send a transaction 
//     try {
//         const tx = await contract.addWishlistItem(itemId, price, recipient, { gasLimit: 300000 });
//         console.log("Transaction hash:", tx.hash);
//         await tx.wait();
//         console.log("Wishlist item added successfully!");
//     } catch (error) {
//         console.error("Error details:", error);
//         if (error.reason) {
//             console.error("Revert reason:", error.reason);
//         }
//     }
// }

// // ----------inputs-----------
// const randomBytes = crypto.randomBytes(32);

// const itemId = "1234567890123456789012345678901234567890"
// const price = "3";
// const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
// console.log("\nGenerated Values:");
// console.log("Item ID:", itemId);
// console.log("Price:", price);
// console.log("Recipient:", recipient);
// // ---------------------------

// addWishlistItem(itemId, price, recipient)
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

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