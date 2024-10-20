// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "./mimc5Sponge.sol";
import "./ReentrancyGuard.sol";

interface IPlonkVerifier {
    function verifyProof(
        uint256[24] calldata _proof,
        uint256[3] calldata _pubSignals
    ) external;
}

contract WishlistNFT is ERC721 {
    mapping(uint256 => uint8) public wishlistItems;
    mapping(uint256 => uint8) public fulfillmentAmounts;
    mapping(uint256 => bool) public mintedItems;
    mapping(uint256 => address) public itemRecipients;
    mapping(uint256 => address) public itemManufacturers;
    mapping(uint256 => uint256) public itemValues;

    event WishlistItemAdded(
        uint256 indexed itemId,
        uint8 price,
        address indexed recipient,
        address indexed manufacturer
    );
    event WishlistFulfilled(
        uint256 indexed itemId,
        uint8 amount,
        address indexed fulfiller
    );

    event NFTMinted(uint256 indexed itemId, address indexed recipient);
    event NFTRedeemed(
        uint256 indexed itemId,
        address indexed manufacturer,
        uint256 value
    );

    // ============================================================================
    // ============================= ZKP-RELATED ELEMENTS =========================
    // ============================================================================
    Hasher hasher;
    address groth16Verifier;
    address plonkVerifier;

    uint public treeLevel = 10;
    uint256 public denomination = 1 ether;
    uint public nextLeafIdx = 0;

    mapping(uint256 => bool) public roots;
    mapping(uint8 => uint256) lastLevelHash;
    mapping(uint => bool) public nullifierHashes;
    mapping(uint256 => bool) public commitments;

    uint256[10] levelDefaults = [
        63771806957809309726317474227089898627135440676260389143578078221402337729597,
        26329784091809616525656596827869754057735600617732985836257533869889848689540,
        91812545750724120478049643735121533121180674247352352428571686173858273812548,
        37460817908076601381291603917636845998871678032835421649609720027002581164371,
        9627294466522009764250266663696874060400336828234707190076472738519008426653,
        13855014489163768114573979355157461109742526590910186847340523945768036922571,
        53905928342978876520984791451694802705133215706595604178784790255233737269703,
        87646555410478181956045998784285324128878755394746302981889809258235802684312,
        73382807414385780209502054336991662169384348553898491823190037666338086508945,
        55592519799874930900949387802369149234060515939655775391990208064877268637902
    ];

    event commitmentEvent(
        uint256 root,
        uint256[10] hashPairings,
        uint8[10] pairDirection,
        uint256 denomination
    );

    // ============================================================================
    // ============================= ZKP-RELATED ELEMENTS =========================
    // ============================================================================

    constructor(
        address _hasher,
        address _plonkVerifier
    )
        // address _plonkVerifier,
        ERC721("WishlistNFT", "WNFT")
    {
        hasher = Hasher(_hasher);
        plonkVerifier = _plonkVerifier;
    }

    function addWishlistItem(
        uint256 itemId,
        uint8 price,
        address recipient,
        address manufacturer
    ) public {
        require(!mintedItems[itemId], "Item already exists");
        require(recipient != address(0), "Invalid recipient address");
        require(manufacturer != address(0), "Invalid manufacturer address");
        wishlistItems[itemId] = price;
        itemRecipients[itemId] = recipient;
        itemManufacturers[itemId] = manufacturer;
        itemValues[itemId] = price * 1 ether;

        emit WishlistItemAdded(itemId, price, recipient, manufacturer);
    }

    function fulfillWishlist(uint256 itemId, uint8 amount) public payable {
        require(wishlistItems[itemId] > 0, "Item not in wishlist");
        require(!mintedItems[itemId], "Item already minted");
        require(msg.value == amount * 1 ether, "Incorrect Ether amount");

        fulfillmentAmounts[itemId] += amount;

        emit WishlistFulfilled(itemId, amount, msg.sender);

        if (fulfillmentAmounts[itemId] >= wishlistItems[itemId]) {
            mintNFT(itemId);
        }
    }

    function mintNFT(uint256 itemId) internal {
        require(!mintedItems[itemId], "NFT already minted for this item");
        address recipient = itemRecipients[itemId];
        require(recipient != address(0), "Recipient not set for this item");
        _safeMint(recipient, itemId);
        mintedItems[itemId] = true;

        emit NFTMinted(itemId, recipient);
    }

    function commitmentStorage(uint256 _commitment) external payable {
        require(!commitments[_commitment], "duplicate commitment hash");
        require(nextLeafIdx < 2 ** treeLevel, "the tree is full");
        uint256 newRoot;
        uint256[10] memory hashPairings;
        uint8[10] memory hashDirections;
        uint256 currentIdx = nextLeafIdx;
        uint256 currentHash = _commitment;

        uint256 left;
        uint256 right;
        uint256[2] memory ins;

        for (uint8 i = 0; i < treeLevel; i++) {
            if (currentIdx % 2 == 0) {
                left = currentHash;
                right = levelDefaults[i];
                hashPairings[i] = levelDefaults[i];
                hashDirections[i] = 0;
            } else {
                left = lastLevelHash[i];
                right = currentHash;
                hashPairings[i] = lastLevelHash[i];
                hashDirections[i] = 1;
            }
            lastLevelHash[i] = currentHash;

            ins[0] = left;
            ins[1] = right;

            uint256 h = hasher.MiMC5Sponge{gas: 150000}(ins, _commitment);

            currentHash = h;
            currentIdx = currentIdx / 2;
        }

        newRoot = currentHash;
        roots[newRoot] = true;
        nextLeafIdx += 1;

        commitments[_commitment] = true;
        emit commitmentEvent(newRoot, hashPairings, hashDirections, msg.value);
    }

    function verifyPlonk(
        uint256[24] calldata _proof,
        uint256[3] calldata _pubSignals
    ) external payable {
        uint _root = _pubSignals[0];
        uint _nullifierHash = _pubSignals[1];
        uint256 _itemId = _pubSignals[2];

        require(!nullifierHashes[_nullifierHash], "already-spent");
        require(roots[_root], "non-root");

        (bool verifyOK, ) = plonkVerifier.call(
            abi.encodeCall(
                IPlonkVerifier.verifyProof,
                (_proof, [_root, _nullifierHash, _itemId])
            )
        );

        require(verifyOK, "invalid zero knowledge proof");

        nullifierHashes[_nullifierHash] = true;

        // Call fulfillWishlist function
        this.fulfillWishlist{value: denomination}(_itemId, 1);
    }

    function redeemNFT(uint256 tokenId) public nonReentrant {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can redeem the NFT"
        );
        require(
            msg.sender == itemManufacturers[tokenId],
            "Only the manufacturer can redeem the NFT"
        );

        uint256 redeemValue = itemValues[tokenId];
        require(
            address(this).balance >= redeemValue,
            "Insufficient contract balance"
        );

        // Burn the NFT
        _burn(tokenId);

        // Transfer the value to the manufacturer
        (bool success, ) = payable(msg.sender).call{value: redeemValue}("");
        require(success, "Transfer failed");

        emit NFTRedeemed(tokenId, msg.sender, redeemValue);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(
            to == itemManufacturers[tokenId],
            "NFT can only be transferred to the specified manufacturer"
        );
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(
            to == itemManufacturers[tokenId],
            "NFT can only be transferred to the specified manufacturer"
        );
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(
            to == itemManufacturers[tokenId],
            "NFT can only be transferred to the specified manufacturer"
        );
        super.safeTransferFrom(from, to, tokenId, data);
    }

    receive() external payable {}
}
