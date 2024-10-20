// pages/index.js

import React from 'react'; // Ensure React is imported
import Script from "next/script";
import Interface from '../components/MetaMask.js';

const Index = () => {
    return (
        <div>
            <link rel="stylesheet" href="/css/bootstrap.min.css" />
            <Script src="/js/snarkjs.min.js" />
            <Interface />
        </div>
    );
};

export default Index;
