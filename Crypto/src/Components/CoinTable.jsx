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

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const filtered = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
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

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
      {/* Hero Section */}
      <div
        className="relative h-[110vh] w-full bg-cover bg-center bg-no-repeat rounded-b-[150px] shadow-2xl shadow-indigo-900 overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>
        <Navbar />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 mt-[8rem] flex flex-col items-start gap-8">
          {/* Heading */}
          <h1 className="text-[64px] md:text-[72px] font-extrabold leading-tight text-white drop-shadow-2xl">
            Secure, Smart, and <br />
            <span className="animate-gradient text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400">
              Easy Crypto Checking
            </span>
          </h1>

          {/* Subtext */}
          <p className="w-[80%] text-[#e0e0e0] text-[20px] leading-[1.7] drop-shadow-md">
            Stay in control of your digital assets with our powerful crypto tracking platform.
            Get real-time updates, monitor your portfolio, and verify transactions effortlessly.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={searchHandler}
            className="relative flex items-center w-full max-w-[600px] p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-indigo-800"
          >
            <input
              onChange={inputHandler}
              value={input}
              type="text"
              placeholder="🔍 Search crypto by name or symbol..."
              className="flex-1 text-white text-[16px] pl-4 bg-transparent outline-none placeholder-white/60"
            />
            <button
              type="submit"
              className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/40"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8 -mt-20 relative z-20">
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {isGridView ? 'Crypto Grid View' : 'Crypto List View'}
          </h2>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/30 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isGridView ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  List View
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid View
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Table/Grid Section */}
        {!isGridView ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-white/10 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
              <div className="col-span-1 text-center text-white/80 font-medium">Rank</div>
              <div className="col-span-4 text-white/80 font-medium">Coin</div>
              <div className="col-span-1 text-center text-white/80 font-medium">Symbol</div>
              <div className="col-span-2 text-right text-white/80 font-medium">Price</div>
              <div className="col-span-2 text-center text-white/80 font-medium">24h Change</div>
              <div className="col-span-2 text-right text-white/80 font-medium">Market Cap</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/10">
              {displayCoin.slice(0, 12).map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-200 group cursor-pointer"
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                  onClick={() => openCoinDetails(item)}
                >
                  <div className="col-span-1 text-center text-white/70">{item.market_cap_rank}</div>
                  <div className="col-span-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-8 h-8 transition-transform duration-300 ${isHovering === index ? 'scale-110' : ''}`}
                    />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <div className="col-span-1 text-center uppercase text-indigo-300 font-mono">{item.symbol}</div>
                  <div className="col-span-2 text-right text-white font-medium">
                    {currency.symbol}
                    {item.current_price.toLocaleString()}
                  </div>
                  <div
                    className={`col-span-2 text-center font-medium ${item.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                  </div>
                  <div className="col-span-2 text-right text-white/80">
                    {currency.symbol}
                    {(item.market_cap / 1000000000).toFixed(2)}B
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayCoin.slice(0, 12).map((item, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-4 border border-white/10 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer ${isHovering === index ? 'ring-2 ring-indigo-500' : ''}`}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => openCoinDetails(item)}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10 rounded-2xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center p-2 backdrop-blur-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-indigo-300 uppercase text-sm mb-3 font-mono">{item.symbol}</p>
                  <div className="mt-auto w-full">
                    <p className="text-white font-medium mb-1">
                      {currency.symbol}
                      {item.current_price.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm font-medium ${item.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {item.price_change_percentage_24h > 0 ? '↑' : '↓'}{' '}
                      {Math.abs(Math.floor(item.price_change_percentage_24h * 100) / 100)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coin Details Modal */}
      {isModalOpen && selectedCoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-gradient-to-br from-gray-800 to-indigo-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-900 to-purple-900 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCoin.name}</h2>
                  <p className="text-indigo-200 uppercase font-mono">{selectedCoin.symbol}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">Current Price</h3>
                  <p className="text-2xl font-bold text-white">
                    {currency.symbol}{selectedCoin.current_price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">Market Cap</h3>
                  <p className="text-2xl font-bold text-white">
                    {currency.symbol}{(selectedCoin.market_cap / 1000000000).toFixed(2)}B
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">24h Change</h3>
                  <p className={`text-2xl font-bold ${selectedCoin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.price_change_percentage_24h > 0 ? '↑' : '↓'}{' '}
                    {Math.abs(Math.floor(selectedCoin.price_change_percentage_24h * 100) / 100)}%
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">24h Trading Volume</h3>
                  <p className="text-2xl font-bold text-white">
                    {currency.symbol}{(selectedCoin.total_volume / 1000000000).toFixed(2)}B
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">All Time High</h3>
                  <p className="text-xl font-bold text-white">
                    {currency.symbol}{selectedCoin.ath.toLocaleString()}
                  </p>
                  <p className={`text-sm ${selectedCoin.current_price >= selectedCoin.ath ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.current_price >= selectedCoin.ath ? 'Currently at ATH!' : `${((selectedCoin.ath - selectedCoin.current_price) / selectedCoin.ath * 100).toFixed(2)}% below ATH`}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-white/80 text-sm mb-2">Circulating Supply</h3>
                  <p className="text-xl font-bold text-white">
                    {selectedCoin.circulating_supply.toLocaleString()} {selectedCoin.symbol.toUpperCase()}
                  </p>
                  {selectedCoin.max_supply && (
                    <p className="text-white/70 text-sm">
                      Max Supply: {selectedCoin.max_supply.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-white/80 text-sm mb-2">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/70 text-sm">Market Cap Rank</p>
                    <p className="text-white font-medium">#{selectedCoin.market_cap_rank}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Price Change (24h)</p>
                    <p className={`font-medium ${selectedCoin.price_change_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currency.symbol}{Math.abs(selectedCoin.price_change_24h).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-t border-white/10 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinTable;