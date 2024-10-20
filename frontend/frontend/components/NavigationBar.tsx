import React from 'react';
import styles from './css/NavigationBar.module.css';
import MenuItem from './MenuItem';

interface NavigationBarProps {
  menuItems: string[];
  logo: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ menuItems, logo }) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.menuColumn}>
          <div className={styles.menu}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} label={item} />
            ))}
            <div className={styles.dropdownIcon}></div>
          </div>
        </div>
        <div className={styles.logoColumn}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>{logo}</div>
            <div className={styles.connectWallet}>
              <button className={styles.connectButton}>Connect to Wallet</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;