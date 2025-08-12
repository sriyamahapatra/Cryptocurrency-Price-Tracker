import React, { useContext, useEffect, useState } from 'react';
import bgImage from '../assets/crypto3.jpg';
import Navbar from './Navbar';
import { CoinContext } from '../Context/CoinContext';

const CoinTable = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const filtered = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.symbol.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(filtered);
  };

  const openCoinDetails = (coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  const filterCoins = (type) => {
    setActiveTab(type);
    switch(type) {
      case 'gainers':
        setDisplayCoin([...allCoin].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h));
        break;
      case 'losers':
        setDisplayCoin([...allCoin].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h));
        break;
      case 'volume':
        setDisplayCoin([...allCoin].sort((a, b) => b.total_volume - a.total_volume));
        break;
      default:
        setDisplayCoin(allCoin);
    }
  };

  useEffect(() => {
    if (allCoin.length > 0) {
      setDisplayCoin(allCoin);
      setIsLoading(false);
    }
  }, [allCoin]);

  // Skeleton loader for grid items
  const GridSkeleton = () => (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-12 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="h-3 w-full bg-gray-700 rounded"></div>
        <div className="h-3 w-full bg-gray-700 rounded"></div>
        <div className="h-3 w-full bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  // Skeleton loader for table rows
  const TableRowSkeleton = () => (
    <div className="grid grid-cols-12 gap-4 p-4 items-center">
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`${i === 1 ? 'col-span-3' : i === 3 ? 'col-span-2' : 'col-span-2'} h-4 bg-gray-700 rounded animate-pulse`}></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[110vh] w-full overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-cyan-900/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        {/* Floating Crypto Icons Animation */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div 
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {allCoin[i] && (
              <img 
                src={allCoin[i].image} 
                alt="" 
                className="w-10 h-10 sm:w-16 sm:h-16"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))'
                }}
              />
            )}
          </div>
        ))}

        <Navbar />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 sm:pt-28 flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Animated Gradient Text */}
          <h1 className="text-5xl sm:text-7xl md:text-7xl font-bold text-white mb-4 sm:mb-6 px-4 space-y-6 sm:space-y-8">
            <span className="animate-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Crypto Market Tracker
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg sm:text-xl text-gray-300 px-4">
            Real-time cryptocurrency prices, market caps, and trading volumes. Track your favorite coins and stay ahead in the crypto market.
          </p>
          
          {/* Enhanced Search Bar */}
          <form 
            onSubmit={searchHandler}
            className="w-full max-w-md px-4 relative mt-4 sm:mt-6"
          >
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={inputHandler}
                placeholder="Search for a cryptocurrency..."
                className="w-full px-6 py-4 sm:py-5 rounded-xl bg-gray-800/70 backdrop-blur-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white placeholder-gray-400 transition-all duration-300 shadow-lg"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-16 sm:-mt-24 relative z-20">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          <button
            onClick={() => filterCoins('all')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'all' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            All Coins
          </button>
          <button
            onClick={() => filterCoins('gainers')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'gainers' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => filterCoins('losers')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'losers' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Top Losers
          </button>
          <button
            onClick={() => filterCoins('volume')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'volume' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            By Volume
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isGridView ? 'Market Overview' : 'Market Data'}
          </h2>
          <div className="flex bg-gray-800 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md transition-all ${!isGridView ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md transition-all ${isGridView ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {isGridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => <GridSkeleton key={i} />)}
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-xl overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-cyan-900/30">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`${i === 1 ? 'col-span-3' : 'col-span-2'} h-4 bg-gray-700 rounded`}></div>
                    ))}
                  </div>
                  {[...Array(5)].map((_, i) => <TableRowSkeleton key={i} />)}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Content State */
          <>
            {/* Table View */}
            {!isGridView ? (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-xl overflow-x-auto">
                <div className="min-w-[900px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-cyan-900/30">
                    <div className="col-span-1 text-center text-sm font-medium text-gray-400">#</div>
                    <div className="col-span-3 text-sm font-medium text-gray-400">Coin</div>
                    <div className="col-span-2 text-right text-sm font-medium text-gray-400">Price</div>
                    <div className="col-span-2 text-center text-sm font-medium text-gray-400">24h</div>
                    <div className="col-span-2 text-right text-sm font-medium text-gray-400">Volume</div>
                    <div className="col-span-2 text-right text-sm font-medium text-gray-400">Market Cap</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-gray-700/50">
                    {displayCoin.slice(0, 20).map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-700/30 transition-colors cursor-pointer group"
                        onMouseEnter={() => setIsHovering(index)}
                        onMouseLeave={() => setIsHovering(null)}
                        onClick={() => openCoinDetails(item)}
                      >
                        <div className="col-span-1 text-center text-sm text-gray-300">{item.market_cap_rank}</div>
                        <div className="col-span-3 flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className={`w-6 h-6 ${isHovering === index ? 'scale-110' : ''} transition-transform`}
                          />
                          <div>
                            <div className="font-medium text-white group-hover:text-purple-300 transition-colors">{item.name}</div>
                            <div className="text-xs text-gray-400 uppercase">{item.symbol}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-right font-medium text-white">
                          {currency.symbol}{item.current_price.toLocaleString()}
                        </div>
                        <div className={`col-span-2 text-center font-medium ${item.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          <div className="inline-flex items-center">
                            {item.price_change_percentage_24h > 0 ? (
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                            {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                          </div>
                        </div>
                        <div className="col-span-2 text-right text-sm text-gray-300">
                          {currency.symbol}{(item.total_volume / 1000000000).toFixed(2)}B
                        </div>
                        <div className="col-span-2 text-right text-sm text-gray-300">
                          {currency.symbol}{(item.market_cap / 1000000000).toFixed(2)}B
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayCoin.slice(0, 12).map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/20 group ${isHovering === index ? 'scale-[1.02]' : ''}`}
                    onMouseEnter={() => setIsHovering(index)}
                    onMouseLeave={() => setIsHovering(null)}
                    onClick={() => openCoinDetails(item)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-8 h-8 group-hover:rotate-6 transition-transform" 
                        />
                        <div>
                          <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{item.name}</h3>
                          <span className="text-xs text-gray-400 uppercase">{item.symbol}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">#{item.market_cap_rank}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="font-medium text-white">
                          {currency.symbol}{item.current_price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">24h Change</span>
                        <span className={`font-medium ${item.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          <div className="inline-flex items-center">
                            {item.price_change_percentage_24h > 0 ? (
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                            {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                          </div>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Market Cap</span>
                        <span className="text-sm text-gray-300">
                          {currency.symbol}{(item.market_cap / 1000000000).toFixed(2)}B
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Coin Details Modal */}
      {isModalOpen && selectedCoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex justify-between items-center border-b border-gray-700">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedCoin.image} 
                  alt={selectedCoin.name} 
                  className="w-10 h-10 rounded-full bg-gray-800 p-1 border border-gray-700 shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedCoin.name}</h2>
                  <p className="text-gray-400 uppercase text-sm">{selectedCoin.symbol}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Price Overview */}
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-white">
                    {currency.symbol}{selectedCoin.current_price.toLocaleString()}
                  </span>
                  <span className={`text-lg font-medium ${selectedCoin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.price_change_percentage_24h > 0 ? (
                      <span className="inline-flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        {Math.abs(selectedCoin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {Math.abs(selectedCoin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  {new Date().toLocaleString()} • Rank #{selectedCoin.market_cap_rank}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                  <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                  <p className="text-white font-medium">
                    {currency.symbol}{(selectedCoin.market_cap / 1000000000).toFixed(2)}B
                  </p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-colors">
                  <p className="text-gray-400 text-sm mb-1">24h Trading Volume</p>
                  <p className="text-white font-medium">
                    {currency.symbol}{(selectedCoin.total_volume / 1000000000).toFixed(2)}B
                  </p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50 hover:border-emerald-500/50 transition-colors">
                  <p className="text-gray-400 text-sm mb-1">Circulating Supply</p>
                  <p className="text-white font-medium">
                    {selectedCoin.circulating_supply.toLocaleString()} {selectedCoin.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50 hover:border-rose-500/50 transition-colors">
                  <p className="text-gray-400 text-sm mb-1">All Time High</p>
                  <p className="text-white font-medium">
                    {currency.symbol}{selectedCoin.ath.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Price Change Cards */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Price Changes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[1, 7, 14, 30].map((days) => {
                    const changeKey = `price_change_percentage_${days}d_in_currency`;
                    const changeValue = selectedCoin[changeKey];
                    return (
                      <div 
                        key={days} 
                        className={`bg-gray-700/20 rounded-lg p-3 text-center border ${changeValue > 0 ? 'border-green-500/20 hover:border-green-500/40' : 'border-red-500/20 hover:border-red-500/40'} transition-colors`}
                      >
                        <p className="text-gray-400 text-xs mb-1">{days}d</p>
                        <p className={`font-medium ${changeValue > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {changeValue ? (
                            <span className="inline-flex items-center justify-center">
                              {changeValue > 0 ? (
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                              {Math.abs(changeValue).toFixed(2)}%
                            </span>
                          ) : 'N/A'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Additional Information</h3>
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">ATH Date</p>
                      <p className="text-white text-sm">
                        {selectedCoin.ath_date ? new Date(selectedCoin.ath_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">ATH Change</p>
                      <p className={`text-sm ${selectedCoin.current_price >= selectedCoin.ath ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedCoin.current_price >= selectedCoin.ath ? (
                          <span className="inline-flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            Currently at ATH
                          </span>
                        ) : (
                          <span className="inline-flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            {((selectedCoin.ath - selectedCoin.current_price) / selectedCoin.ath * 100).toFixed(2)}% below ATH
                          </span>
                        )}
                      </p>
                    </div>
                    {selectedCoin.max_supply && (
                      <div>
                        <p className="text-gray-400 text-sm">Max Supply</p>
                        <p className="text-white text-sm">
                          {selectedCoin.max_supply.toLocaleString()} {selectedCoin.symbol.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-t border-gray-700 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-purple-500/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-gradient {
          background-size: 300%;
          -webkit-animation: animatedgradient 6s ease infinite alternate;
          -moz-animation: animatedgradient 6s ease infinite alternate;
          animation: animatedgradient 6s ease infinite alternate;
        }
        @keyframes animatedgradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default CoinTable;