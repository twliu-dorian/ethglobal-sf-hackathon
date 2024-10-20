// src/components/Wishlist.js
import React, { useState } from "react";

const Wishlist = () => {
    const [itemId, setItemId] = useState('');
    const [price, setPrice] = useState('');
    const [recipient, setRecipient] = useState('');
    const [wishlist, setWishlist] = useState([]);

    // Define a simple wishlistManager
    const wishlistManager = {
        wishlist: [],
        addWishlistItem: (id, price, recipient) => {
            wishlistManager.wishlist.push({ itemId: id, price, recipient });
        },
        displayWishlist: () => {
            console.log("Current Wishlist:", wishlistManager.wishlist);
        },
        clearWishlist: () => {
            wishlistManager.wishlist = [];
        }
    };

    // Handlers for Wishlist
    const handleAdd = () => {
        if (itemId.trim() === '' || price === '' || recipient.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Add the item to the wishlist
        wishlistManager.addWishlistItem(itemId, parseFloat(price), recipient);

        // Update the local wishlist state (for display purposes)
        setWishlist([...wishlistManager.wishlist]);

        // Clear the input fields
        setItemId('');
        setPrice('');
        setRecipient('');
    };

    const handleDisplay = () => {
        wishlistManager.displayWishlist();
        setWishlist([...wishlistManager.wishlist]);
    };

    const handleClear = () => {
        wishlistManager.clearWishlist();
        setWishlist([]);
    };

    return (
        <div className="container mt-4">
            <h2>Add to Wishlist</h2>
            <div className="mb-3">
                <label htmlFor="itemId" className="form-label">Item ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="itemId"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    placeholder="Enter Item ID"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="recipient" className="form-label">Recipient</label>
                <input
                    type="text"
                    className="form-control"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter Recipient Address"
                />
            </div>
            <button className="btn btn-primary me-2" onClick={handleAdd}>Add to Wishlist</button>
            <button className="btn btn-secondary me-2" onClick={handleDisplay}>Display Wishlist</button>
            <button className="btn btn-danger" onClick={handleClear}>Clear Wishlist</button>

            {/* Display Wishlist */}
            {wishlist.length > 0 && (
                <div className="mt-5">
                    <h3>Current Wishlist</h3>
                    <ul className="list-group">
                        {wishlist.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Item {index + 1}:</strong><br />
                                Item ID: {item.itemId}<br />
                                Price: {item.price}<br />
                                Recipient: {item.recipient}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
