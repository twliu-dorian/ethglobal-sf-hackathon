import React from 'react';
import Head from 'next/head';
import Header from '../components/header.js';

const DonationConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
      <Header/ >
      <Head>
        <title>Donation Confirmation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md w-full space-y-8">
        {/* Pixelated Heart Icon */}
        <div className="w-24 h-24 mx-auto">
          <svg viewBox="0 0 10 10" className="w-full h-full">
            <rect x="2" y="1" width="2" height="1" fill="#FF4136" />
            <rect x="6" y="1" width="2" height="1" fill="#FF4136" />
            <rect x="1" y="2" width="8" height="1" fill="#FF4136" />
            <rect x="1" y="3" width="8" height="3" fill="#FF4136" />
            <rect x="2" y="6" width="6" height="1" fill="#FF4136" />
            <rect x="3" y="7" width="4" height="1" fill="#FF4136" />
            <rect x="4" y="8" width="2" height="1" fill="#FF4136" />
            {/* Add yellow pixels */}
            <rect x="3" y="2" width="1" height="1" fill="#FFDC00" />
            <rect x="5" y="3" width="1" height="1" fill="#FFDC00" />
          </svg>
        </div>

        {/* Congratulatory Message */}
        <h1 className="text-3xl font-bold text-indigo-600 tracking-wider">
          CONGRATULATIONS!
        </h1>
        <h2 className="text-2xl font-semibold text-indigo-600 tracking-wider">
          YOUR DONATION HAS GONE THROUGH!
        </h2>

        {/* Notification Message */}
        <p className="text-gray-500 mt-4">
          You will receive a notification with tracking information once enough people have contributed. Thank you for contributing to the cause!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <button className="px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-100 transition duration-300">
            TRACK DONATION
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">
            CONTINUE BROWSING
          </button>
        </div>
      </main>
    </div>
  );
};

export default DonationConfirmation;