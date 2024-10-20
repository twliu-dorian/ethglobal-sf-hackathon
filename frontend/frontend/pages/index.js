
import Script from "next/script";
import Interface from '../components/Interface.js';
import { WishlistManager } from '../components/wishListManager.js';

const Index = () => {

    const wishlistManager = new WishlistManager();

         // Example usage of WishlistManager
    wishlistManager.displayWishlist();

        
    return (
        <div>
            <link rel="stylesheet" href="/css/bootstrap.min.css"></link>
            <Script src="/js/snarkjs.min.js" />
            <Interface />
        </div>
    )
};

export default Index;