import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// const DonationContext = createContext();

// export const DonationProvider = ({ children }) => {
//   const [donationId, setDonationId] = useState(null);

//   return (
//     <DonationContext.Provider value={{ donationId, setDonationId }}>
//       {children}
//     </DonationContext.Provider>
//   );
// };

const streamers = [
  { 
    name: 'Global Relief Hub', 
    amount: '$2.99', 
    image: '/ngo0.svg',
    description: 'Emergency Shelter Kits – Distributing 500 emergency shelter kits to flood victims.',
    category: 'HUMAN AID'
  },
  { 
    name: 'Aid4All', 
    amount: '$3.99', 
    image: '/ngo1.svg',
    description: 'Food Aid for Drought – Delivering food supplies to 1,000 families affected by drought.',
    category: 'HUMAN AID'
  },
  { 
    name: 'HelpNow', 
    amount: '$1.99', 
    image: '/ngo2.svg',
    description: 'Medical Relief for Refugees – Providing essential medical care to refugees in conflict zones.',
    category: 'EDUCATION'
  },
  { 
    name: 'Rapid Response', 
    amount: '$5.99', 
    image: '/ngo3.svg',
    description: 'Water Purification for Crisis Areas – Supplying clean water to 10,000 people in disaster-hit areas.',
    category: 'HUMAN AID'
  },
  { 
    name: 'Crisis Aid Network', 
    amount: '$6.99', 
    image: '/ngo4.svg',
    description: 'Winter Clothing Distribution – Distributing warm clothes to 2,000 displaced people during winter.',
    category: 'NGO'
  }
  ,
  { 
    name: 'Relief Action', 
    amount: '$6.99', 
    image: '/ngo5.svg',
    description: 'Emergency Health Kits – Delivering 1,500 health kits to earthquake-affected communities.',
    category: 'NGO'
  }
];

const categories = ['HUMANITARIAN AID', 'ENVIRONMENT', 'EDUCATION', 'ANIMAL WALFARE'];

const StreamerCard = ({ name, amount, image, description, category }) => {
  // const { setDonationId } = useContext(DonationContext);

  const handleDonate = () => {
    console.log(`Donating to ${name}`);
    // setDonationId(id);
    navigate('/donatePage');
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
      <div>
      <Header />
      <header>
        <h2 className={styles.pageTitle}>NGO PROFILES</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.categoriesAndSortContainer}>
          <ul className={styles.categoriesList}>
            {categories.map((category) => (
              <li 
                key={category} 
                className={styles.categoryTitle}
              >
                {category}
              </li>
            ))}
          </ul>
          <div className={styles.sortContainer}>
            <div className={styles.selectWrapper}>
              <select className={styles.sortSelect}>
                <option>SORT BY RATING</option>
              </select>
              <ChevronDown className={styles.chevronIcon} />
            </div>
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