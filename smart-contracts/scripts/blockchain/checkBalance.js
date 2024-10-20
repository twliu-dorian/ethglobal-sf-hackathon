require('dotenv').config();
const { ethers } = require('ethers');

const apiUrlKey = process.env.API_URL_KEY;

async function checkBalance(address, description) {
    const provider = new ethers.JsonRpcProvider(apiUrlKey);

    console.log(`Checking balance for ${description} (${address})`);

    try {
        const balance = await provider.getBalance(address);
        const balanceInEther = ethers.formatEther(balance);
        console.log(`Balance: ${balanceInEther} ETH`);
        console.log(`Balance in Wei: ${balance.toString()} Wei`);
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

// Addresses to check with descriptions
const addressesToCheck = [
    { address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', description: 'Manufacturer' },
    { address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', description: 'Recipient' },
    { address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', description: 'User' },
    { address: process.env.CONTRACT_ADDRESS, description: 'Contract' },
    // Add any other addresses you want to check
];

async function checkAllBalances() {
    for (const { address, description } of addressesToCheck) {
        if (address) {
            await checkBalance(address, description);
            console.log('---');
        }
    }
}

checkAllBalances()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });