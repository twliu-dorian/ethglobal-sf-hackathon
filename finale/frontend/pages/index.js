import Script from "next/script";
import Interface from '../components/Interface.js';
import Head from 'next/head';
import { WishlistManager } from '/Users/hu/Work/ETH Global/ethglobal-sf-hackathon/finale/frontend/components/wishListManager.js';

const Index = () => {

     // Initialize WishlistManager with 'new'
     const wishlistManager = new WishlistManager();

     // Example usage of WishlistManager
     wishlistManager.addWishlistItem(
         "0x1234567890abcdef1234567890abcdef12345678",
         5,
         "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
     );
     wishlistManager.displayWishlist();


    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <title>Wishlist App</title>
            </Head>
            <Script src="/js/snarkjs.min.js" strategy="lazyOnload" />
            <main>
                <Interface />
            </main>
        </div>
        
    );
};

export default Index;


