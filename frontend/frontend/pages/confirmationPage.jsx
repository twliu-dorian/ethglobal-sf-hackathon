import React from "react";
import styles from '../styles/confirmationPage.module.css';
import Header from '../components/header.js';

function ConfirmationPage() {
  return (
    
    <main className={styles.confirmationPage}>
      <Header/ >
      <section className={styles.contentWrapper}>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/379f72f7059fd3f043ce3162f085258e14a09f17d9b3e543d86c66fdd82acb33?placeholderIfAbsent=true&apiKey=f385b829caee41588af58fa031c51f58" 
          className={styles.confirmationIcon} 
          alt="Confirmation icon"
        />
        <h1 className={styles.confirmationTitle}>
          Congratulations! <br /> 
          Your donation has gone through!
        </h1>
        <div className={styles.messageWrapper}>
          <p className={styles.confirmationMessage}>
            You will receive a notification with tracking information once enough people have contributed.
            Thank you for contributing to the cause!
          </p>
          <div className={styles.actionButtons}>
            <button className={styles.trackDonationButton}>Track Donation</button>
            <button className={styles.continueButton}>Continue Browsing</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConfirmationPage;