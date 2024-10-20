import React from 'react';
import { useRouter } from 'next/router';
import DonationConfirmation from '../public/css/DonationConfirmation.module.css';
const ConfirmDonationButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button className={DonationConfirmation.confirmButton} onClick={handleClick}>
      Confirm Donation
    </button>
  );
};

export default ConfirmDonationButton;