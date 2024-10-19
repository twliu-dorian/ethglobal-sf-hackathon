// wishlistManager.js

export class WishlistManager {
    constructor() {
        this.wishlist = [];
    }

    // Method to add an item to the wishlist
    addWishlistItem(itemId, price, recipient) {
        const newItem = { itemId, price, recipient };
        this.wishlist.push(newItem);
        console.log("Wishlist item added successfully!", newItem);
    }

    // Method to display all items in the wishlist
    displayWishlist() {
        if (this.wishlist.length === 0) {
            console.log("The wishlist is currently empty.");
        } else {
            console.log("Wishlist Items:");
            this.wishlist.forEach((item, index) => {
                console.log(`Item ${index + 1}:`);
                console.log(`  Item ID: ${item.itemId}`);
                console.log(`  Price: ${item.price}`);
                console.log(`  Recipient: ${item.recipient}`);
            });
        }
    }

    // Method to clear the wishlist
    clearWishlist() {
        this.wishlist = [];
        console.log("Wishlist cleared.");
    }
}
