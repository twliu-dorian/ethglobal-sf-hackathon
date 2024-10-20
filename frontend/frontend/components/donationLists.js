import React from "react";
import styles from '../public/css/DonationConfirmation.module.css';

const donationItems = [
  { name: "EWB's orphan centre", amount: 22 },
  { name: "Steven's IPHONE 18", amount: 63 },
  { name: "PlANT-A-TREE", amount: 52 },
];

function DonationList() {
  const total = donationItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className={styles.donationListSection}>
      <h2 className={styles.listTitle}>Donation List</h2>
      <ul className={styles.donationItems}>
        {donationItems.map((item, index) => (
          <li key={index} className={styles.donationItem}>
            <span className={styles.itemName}>{item.name}</span>
            <div className={styles.itemAmount}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{item.amount}</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/06b1d11b15c1eaa5ebe5986757ccfd9c959206a95b4f24fa40a3af2ac0868cde?placeholderIfAbsent=true&apiKey=43c1a25f84654539a2ceb0693edc8e81" alt="" className={styles.editIcon} />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.totalSection}>
        <div className={styles.totalWrapper}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>${total}</span>
        </div>        
      </div>
    </section>
  );
}

export default DonationList;