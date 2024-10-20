import React, { useState } from 'react';

import { ChevronDown } from 'lucide-react';



const streamers = [

  { name: 'Bob', rating: 13.99 },

  { name: 'Tim', rating: 9.89 },

  { name: 'Joseph', rating: 2.99 },

  { name: 'Steven', rating: 9.99 },

  { name: 'Alice', rating: 7.99 },

  { name: 'Brian', rating: 4.99 },

];



const StreamerCard = ({ name, rating }) => (

  <div className="bg-white rounded-lg overflow-hidden shadow-md">

    <div className="h-24 bg-purple-400 relative">

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">

        <div className="w-16 h-16 bg-purple-600 rounded-md flex items-center justify-center">

          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">

            Photo

          </div>

        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">

            <span className="text-white text-xs font-bold">👑</span>

          </div>

        </div>

      </div>

    </div>

    <div className="p-4 text-center">

      <h3 className="font-bold text-gray-800">{name}</h3>

      <p className="text-sm text-gray-600">${rating.toFixed(2)}</p>

      <div className="mt-2 space-x-2">

        <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs">DONATE</button>

        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">WATCH LATER</button>

      </div>

    </div>

  </div>

);



const ChainSplashStreamerProfile = () => {

  const [sortBy, setSortBy] = useState('RATING');



  return (

    <div className="bg-gray-100 min-h-screen">

      <header className="bg-indigo-700 text-white p-4">

        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">

          <div className="flex items-center space-x-2 mb-4 sm:mb-0">

            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">

              <span className="text-white font-bold">👑</span>

            </div>

            <h1 className="text-xl font-bold">ChainSplash</h1>

          </div>

          <nav className="mb-4 sm:mb-0">

            <ul className="flex space-x-4 text-sm">

              <li>Dashboard</li>

              <li>Impact</li>

              <li>Leaderboard</li>

              <li>Home</li>

            </ul>

          </nav>

          <button className="bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">Connect to Wallet</button>

        </div>

      </header>

      <main className="container mx-auto py-8 px-4">

        <h2 className="text-3xl font-bold mb-4 text-gray-800">STREAMER PROFILE</h2>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

          <div className="flex flex-wrap gap-4">

            <button className="text-purple-600 font-semibold text-sm">MUSIC</button>

            <button className="text-gray-500 text-sm">TECHNOLOGY</button>

            <button className="text-gray-500 text-sm">NGO</button>

            <button className="text-gray-500 text-sm">KPOP</button>

            <button className="text-gray-500 text-sm">ROBOTICS</button>

          </div>

          <div className="flex items-center">

            <span className="text-sm text-gray-500 mr-2">SORT BY</span>

            <div className="relative">

              <select

                value={sortBy}

                onChange={(e) => setSortBy(e.target.value)}

                className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm"

              >

                <option value="RATING">RATING</option>

                <option value="NAME">NAME</option>

                <option value="POPULARITY">POPULARITY</option>

              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                <ChevronDown size={16} />

              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {streamers.map((streamer, index) => (

            <StreamerCard key={index} {...streamer} />

          ))}

        </div>

      </main>

    </div>

  );

};



export default ChainSplashStreamerProfile;