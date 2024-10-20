import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Header from '../components/header.js';


// const Header = () => (
//   <header className="bg-indigo-700 text-white p-4 flex justify-between items-center">
//     <div className="flex items-center space-x-2">
//       <div className="bg-yellow-400 rounded-full p-2 w-10 h-10 flex items-center justify-center">
//         <span className="text-black font-bold">CS</span>
//       </div>
//       <span className="text-2xl font-bold">ChainSplash</span>
//     </div>
//     <nav className="space-x-4">
//       <a href="#" className="hover:underline">Dashboard</a>
//       <a href="#" className="hover:underline">Impact</a>
//       <a href="#" className="hover:underline">Leaderboard</a>
//       <a href="#" className="hover:underline">Home</a>
//     </nav>
//     <button className="bg-white text-indigo-700 px-4 py-2 rounded-full font-semibold">
//       Connect to Wallet
//     </button>
//   </header>
// );

const NGOProfile = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4">
      <div className="w-24 h-24 bg-yellow-400 rounded-full overflow-hidden">
        <img src="NGO0.svg" alt="Hi, Global Relief Hub" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-indigo-700">HI, Global Relief Hub</h2>
        <p className="text-xl text-gray-600">WELCOME TO YOUR DASHBOARD !</p>
        <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm mt-2">Level 4 NGO</span>
      </div>
    </div>
  </div>
);

const NFTTransferTracker = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">NFT Transfer Tracker</h2>
    <div className="space-y-4">
      {['Education for Girls in Africa', 'Food Aid for Refugee Camps', 'Medical Supplies for Remote Clinics', 'Clean Water for Rural Villages'].map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const FundraisingTracker = () => {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
      const fetchCompletion = async () => {
        try {
          const response = await fetch('http://localhost:3003/api/smart_contract/get_completion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setCompletion(data.percentage);
        } catch (error) {
          console.error('Error fetching completion:', error);
        }
      };
  
      fetchCompletion();
    }, []);
 return(
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">Fundraising Tracker</h2>
    <div className="space-y-4">
    <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Human Aid</span>
            <span className="text-blue-600 font-bold">{`${(completion * 100).toFixed(0)}% to complete`}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{width: `${completion * 100}%`}}
            ></div>
          </div>
    </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Education for Girls in Africa</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">COMPLETED!</span>
        </div>
        <div className="w-full bg-green-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Clean Water for Rural Villages</span>
          <span className="text-blue-600 font-bold">75% to complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
        </div>
      </div>
      {/* Add more fundraising items here */}
    </div>
  </div>
);
}

const GoodsTracker = () => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Goods Tracker</h2>
      <div className="space-y-6">
        {['Education for Girls in Africa', 'Medical Supplies for Remote Clinics', 'Food Aid for Refugee Camps'].map((item, index) => (
          <div key={index}>
            <h3 className="font-medium text-sm mb-2">{item}</h3>
            <div className="flex flex-col space-y-2">
              {['Customer', 'Shipping', 'Confirm', 'Success'].map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stepIndex === 3 ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs`}>
                    ✓
                  </div>
                  <span className="text-xs">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  

const ImpactMetrics = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">Impact Metrics</h2>
    <div className="space-y-4">
      {[
        'You have successfully helped 21,000 people!',
        'You have successfully helped 500 girls!',
        'You have successfully helped people in remote areas!'
      ].map((metric, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Heart className="text-red-500" />
          <span>{metric}</span>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto mt-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <NGOProfile />
            </div>
            <div>
              <NFTTransferTracker />
            </div>
            <div className="md:col-span-2">
              <FundraisingTracker />
            </div>
            <div>
              <GoodsTracker />
            </div>
            <div>
              <ImpactMetrics />
            </div>
          </div>
        </main>
      </div>
    );
  };

export default Dashboard;