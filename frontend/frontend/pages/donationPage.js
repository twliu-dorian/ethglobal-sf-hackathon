import React from "react";
import Header from "../components/header.js"; // Correctly import Header with uppercase 'H'
import styles from '../public/css/DonationConfirmation.module.css';
import ConfirmationSection from '../components/confirmationSelection.js';
import DonationList from '../components/donationLists.js';
import ConfirmDonationButton from "../components/ConfirmDonationButton.js";
//import NavBar from "../components/navBar.js"; // Ensure correct path and casing



function DonationConfirmation() {
  return (
    <>
      <Header /> {/* Use the Header component */}
      <main className={styles.donatePage}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <ConfirmationSection />
            <DonationList />
          </div>
        </div>
        <ConfirmDonationButton />

      </main>
      
    </>
  );
}

export default DonationConfirmation;
