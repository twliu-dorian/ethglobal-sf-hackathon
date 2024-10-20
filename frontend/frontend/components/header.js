import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '../public/css/header.module.css';

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  const handleNavClick = (item) => {
    console.log(`Navigating to ${item}`);
    // Here you would typically use a router to navigate
    // For now, we'll just log the action
  };

  return (
    
    <header style={{ backgroundColor: "#2F1893" }} className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="chainSplash logo" className="w-28 h-28 mt-2" />
          <h1 className={styles.headerTitle}>ChainSplash</h1>
        </div>
<nav>
  <ul className={styles.headerTitle2}>
    {[
      { name: 'Dashboard', route: '/ngoDash' },
      { name: 'Impact', route: '#' },
      { name: 'Leaderboard', route: '#' },
      { name: 'Home', route: '/ChainSplashStreamerProfile' }
    ].map((item) => (
      <li key={item.name}>
        <button 
          onClick={() => {
            if (item.route !== '#') {
              window.location.href = item.route;
            } else {
              console.log(`Navigating to ${item.name}`);
            }
          }} 
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          {item.name}
        </button>
      </li>
    ))}
  </ul>
</nav>
        {/* <button 
          className={`${styles.headerTitle4} ${isConnected ? 'bg-green-600' : 'bg-custom-purple'}`}
          onClick={isConnected ? null : connectWallet}
        >
          {isConnected ? 'Connected' : <span>Connect to Wallet</span>}
        </button> */}
      </div>
    </header>
  );
};

export default Header;