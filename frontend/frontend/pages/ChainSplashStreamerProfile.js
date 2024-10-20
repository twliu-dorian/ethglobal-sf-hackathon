import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../components/header.js';
import styles from '../components/css/card.module.css';
// const Header = () => {
//   const [isConnected, setIsConnected] = useState(false);

//   const connectWallet = () => {
//     setTimeout(() => {
//       setIsConnected(true);
//     }, 1000);
//   };

//   const handleNavClick = (item) => {
//     console.log(`Navigating to ${item}`);
//     // Here you would typically use a router to navigate
//     // For now, we'll just log the action
//   };

//   return (
//     <header style={{ backgroundColor: "#2F1893" }} className="p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//             <img src="/logo.svg" alt="chainSplash logo" className="w-28 h-28 mt-2" />
//           <h1 className={styles.headerTitle}>ChainSplash</h1>
//         </div>
//         <nav>
//           <ul className={styles.headerTitle2}>
//             {['Dashboard', 'Impact', 'Leaderboard', 'Home'].map((item) => (
//               <li key={item}>
//                 <button 
//                   onClick={() => handleNavClick(item)} 
//                   className="text-white hover:text-gray-300 focus:outline-none"
//                 >
//                   {item}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <button 
//           className={`${styles.headerTitle4} ${isConnected ? 'bg-green-600' : 'bg-custom-purple'}`}
//           onClick={isConnected ? null : connectWallet}
//         >
//           {isConnected ? 'Connected' : <span>Connect to Wallet</span>}
//         </button>
//       </div>
//     </header>
//   );
// };

const streamers = [
  { 
    name: 'Clean Water for All', 
    amount: '$2.99', 
    image: '/ngo0.svg',
    description: 'A project focused on providing access to safe drinking water in rural communities by installing water filtration systems and educating locals on water hygiene practices.',
    category: 'MUSIC'
  },
  { 
    name: 'Tim', 
    amount: '$3.99', 
    image: '/ngo1.svg',
    description: 'Tim hosts tech talks and live coding sessions.',
    category: 'TECHNOLOGY'
  },
  { 
    name: 'Alice', 
    amount: '$7.99', 
    image: '/ngo2.svg',
    description: 'Alice streams K-pop dance covers and reactions.',
    category: 'KPOP'
  },
  { 
    name: 'Joseph', 
    amount: '$5.99', 
    image: '/ngo3.svg',
    description: 'Joseph showcases robotics projects and automation demos.',
    category: 'ROBOTICS'
  },
  { 
    name: 'Emma', 
    amount: '$6.99', 
    image: '/ngo4.svg',
    description: 'Emma hosts charity streams for various global causes.',
    category: 'NGO'
  }
  ,
  { 
    name: 'Sally', 
    amount: '$6.99', 
    image: '/ngo5.svg',
    description: 'Sally hosts charity streams for various global causes.',
    category: 'NGO'
  }
];

const categories = ['MUSIC', 'TECHNOLOGY', 'NGO', 'KPOP', 'ROBOTICS'];

const StreamerCard = ({ name, amount, image, description, category }) => {
  const handleDonate = () => {
    console.log(`Donating to ${name}`);
    // Implement donation logic here
  };

  const handleWatchLater = () => {
    console.log(`Adding ${name} to save folder`);
    // Implement watch later logic here
  };

  return (
      <div className={styles.streamerCard}>
        <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.streamerImage} />

      </div>
      <div className={styles.contentSection}>
        <h3 className={styles.streamerName}>{name}</h3>
        <p className={styles.amount}>{amount}</p>
        <p className={styles.category}>{category}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          <button 
            onClick={handleDonate}
            className={styles.donateButton}
          >
            DONATE
          </button>
          <button 
            onClick={handleWatchLater}
            className={styles.watchLaterButton}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const StreamerProfilePage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className={styles.pageTitle}>STREAMER PROFILES</h2>
        <div className="mb-6">
          <ul className="flex space-x-4">
            {categories.map((category) => (
              <li key={category} className="cursor-pointer hover:text-gray-300">{category}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mb-4">
          <div className="relative">
            <select className="appearance-none bg-purple-600 text-white px-4 py-2 pr-8 rounded-md">
              <option>SORT BY RATING</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streamers.map((streamer, index) => (
            <StreamerCard key={index} {...streamer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StreamerProfilePage;