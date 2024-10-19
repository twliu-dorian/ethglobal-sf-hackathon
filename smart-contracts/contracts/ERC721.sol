// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WishlistNFT is ERC721 {
    mapping(uint256 => uint8) public wishlistItems;
    mapping(uint256 => uint8) public fulfilmentAmounts;
    mapping(uint256 => bool) public mintedItems;
    mapping(uint256 => address) public itemRecipients;

    constructor() ERC721("WishlistNFT", "WNFT") {}

    function addWishlistItem(
        uint256 itemId,
        uint8 price,
        address recipient
    ) public {
        require(!mintedItems[itemId], "Item already exists");
        require(recipient != address(0), "Invalid recipient address");
        wishlistItems[itemId] = price;
        itemRecipients[itemId] = recipient;
    }

    function fulfilWishlist(uint256 itemId, uint8 amount) public {
        require(wishlistItems[itemId] > 0, "Item not in wishlist");
        require(!mintedItems[itemId], "Item already minted");
        fulfilmentAmounts[itemId] += amount;
        if (fulfilmentAmounts[itemId] >= wishlistItems[itemId]) {
            mintNFT(itemId);
        }
    }

    function mintNFT(uint256 itemId) internal {
        require(!mintedItems[itemId], "NFT already minted for this item");
        address recipient = itemRecipients[itemId];
        require(recipient != address(0), "Recipient not set for this item");
        _safeMint(recipient, itemId);
        mintedItems[itemId] = true;
    }
}
