// src/pages/DonationConfirmation.jsx

import React from "react";
import Header from "../components/Header.js"; // Ensure correct casing
import styles from '../public/css/DonationConfirmation.module.css';
import ConfirmationSection from '../components/ConfirmationSelection.js';
import DonationList from '../components/DonationLists.js';
import ConfirmDonationButton from "../components/ConfirmDonationButton.js";
// import NavBar from "../components/NavBar.js"; // Ensure correct path and casing if needed

function DonationConfirmation() {
  return (
    <>
      <Header /> {/* Use the Header component */}
      
      <main className={styles.donatePage}>
      <div className={styles.imageContainer}>
              <img 
                src="/img/NGO1.png" 
                alt="NGO Logo" 
                className={styles.ngoImage} 
              />
            </div>
        <div className={styles.container}>
          
          <div className={styles.contentWrapper}>
            {/* Add the Image Here */}
          
            
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
