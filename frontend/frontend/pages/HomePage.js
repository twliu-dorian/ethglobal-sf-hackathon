import React from "react";
import styles from '../public/css/DonationConfirmation.module.css';
import ConfirmationSection from '../components/confirmationSelection.js';
import DonationList from '../components/donationLists.js';
import NavBar from "../components/navBar.js"; // Ensure correct path and casing

function DonationConfirmation() {
  return (
    <>
      <NavBar /> {/* Include NavBar */}
      <main className={styles.donatePage}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <ConfirmationSection />
            <DonationList />
          </div>
        </div>
      </main>
    </>
  );
}

export default DonationConfirmation;
