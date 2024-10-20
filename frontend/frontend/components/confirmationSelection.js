import React from "react";
import styles from '../public/css/DonationConfirmation.module.css';

function ConfirmationSection() {
  return (
    <section className={styles.confirmationSection}>
      <div className={styles.confirmationContent}>
        <h2 className={styles.sectionTitle}>Confirmation</h2>
        <div className={styles.deliveryInfo}>
          <h3 className={styles.subTitle}>Delivery</h3>
          <p className={styles.address}>
            30 Valley Lane, Los Angeles, CA 90006
          </p>
        </div>
        <div className={styles.paymentInfo}>
        <button className={styles.editButton}>Edit</button>

          <div className={styles.paymentMethod}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/53e52191-06ab-48fc-bef9-b2eea16e3acc?placeholderIfAbsent=true&apiKey=43c1a25f84654539a2ceb0693edc8e81" alt="Payment method" className={styles.paymentIcon} />          </div>

        </div>
        <div className={styles.commentSection}>
          <h3 className={styles.subTitle}>Comment</h3>
        </div>
        <textarea className={styles.commentInput} placeholder="Enter your comment" aria-label="Enter your comment"></textarea>
        <button className={styles.backButton}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b9e9489f9e3100d291be289c08194f80b51bc1227cfb95a427cd84d6326ce32?placeholderIfAbsent=true&apiKey=43c1a25f84654539a2ceb0693edc8e81" alt="" className={styles.backIcon} />
          Confirm 
        </button>
      </div>
    </section>
  );
}

export default ConfirmationSection;