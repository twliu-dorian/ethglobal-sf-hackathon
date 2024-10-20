const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();
// const ownerAddress = process.env.OWNER_ADDRESS;

async function main() {
    const Hasher = await hre.ethers.getContractFactory("Hasher");
    const hasher = await Hasher.deploy();
    await hasher.waitForDeployment();
    const hasherAddress = await hasher.getAddress();
    console.log("hasher address:", hasherAddress);

    const plonkVerifier = await hre.ethers.getContractFactory("PlonkVerifier")
    const plonkverifier = await plonkVerifier.deploy();
    await plonkverifier.waitForDeployment();
    const plonkVerifierAddress = await plonkverifier.getAddress();
    console.log("plonk Verifier address:", plonkVerifierAddress);

    const WishListNFT = await hre.ethers.getContractFactory("WishlistNFT");
    const wishlistNFT = await WishListNFT.deploy(hasherAddress, plonkVerifierAddress);
    await wishlistNFT.waitForDeployment();
    console.log("wishlistNFT nft address:", await wishlistNFT.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});