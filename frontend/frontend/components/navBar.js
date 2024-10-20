import React from 'react';
import styles from '../public/css/nav.module.css';

const menuItems = [
  { label: 'Dashboard', hasDropdown: true },
  { label: 'Impact', hasDropdown: false },
  { label: 'Home', hasDropdown: false }
];

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.menuColumn}>
          <ul className={styles.menu}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                {item.label}
                {item.hasDropdown && <span className={styles.dropdownIcon}></span>}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.logoColumn}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>Anonymous Donate</div>
            <div className={styles.connectWallet}>
              <button className={styles.connectButton}>
                Connect to Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

