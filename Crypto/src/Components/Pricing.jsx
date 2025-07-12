// Pricing.jsx
import React, { useContext } from 'react';
import { CoinContext } from '../Context/CoinContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const navigate = useNavigate();

  const topCoins = allCoin.slice(0, 5);
  const trendingCoins = [...allCoin].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pricing</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Real-time pricing for all major cryptocurrencies. Compare prices, track performance, and find the best investment opportunities.
        </p>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {['Basic', 'Pro', 'Enterprise'].map((tier, index) => (
            <div key={index} className={`rounded-xl p-6 border ${index === 1 ? 'border-cyan-400 scale-105 bg-gray-800/50' : 'border-gray-700'} bg-gray-900/50 backdrop-blur-sm`}>
              <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
              <p className="text-gray-300 mb-6">{index === 0 ? 'For beginners' : index === 1 ? 'For serious traders' : 'For institutions'}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {index === 0 ? 'Free' : index === 1 ? '$29.99' : 'Custom'}
                </span>
                {index !== 0 && <span className="text-gray-400">/month</span>}
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time prices',
                  `${index >= 1 ? 'Advanced' : 'Basic'} charts`,
                  `${index >= 1 ? 'Unlimited' : 'Limited'} watchlists`,
                  `${index >= 2 ? 'Dedicated' : 'Community'} support`,
                  `${index >= 1 ? 'API access' : 'No API access'}`
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-lg font-medium ${index === 1 ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all`}
              >
                {index === 0 ? 'Get Started' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>

        {/* Top Coins Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Top Cryptocurrencies</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-white/10 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
              <div className="col-span-1 text-center text-white/80 font-medium">Rank</div>
              <div className="col-span-4 text-white/80 font-medium">Coin</div>
              <div className="col-span-2 text-right text-white/80 font-medium">Price</div>
              <div className="col-span-2 text-center text-white/80 font-medium">24h Change</div>
              <div className="col-span-3 text-right text-white/80 font-medium">Market Cap</div>
            </div>
            
            <div className="divide-y divide-white/10">
              {topCoins.map((coin, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                >
                  <div className="col-span-1 text-center text-white/70">{coin.market_cap_rank}</div>
                  <div className="col-span-4 flex items-center gap-4">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <span className="text-white font-medium">{coin.name}</span>
                  </div>
                  <div className="col-span-2 text-right text-white font-medium">
                    {currency.symbol}{coin.current_price.toLocaleString()}
                  </div>
                  <div className={`col-span-2 text-center font-medium ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className="col-span-3 text-right text-white/80">
                    {currency.symbol}{(coin.market_cap / 1000000000).toFixed(2)}B
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Coins */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Trending Coins (24h)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingCoins.map((coin, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-cyan-400/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <div>
                    <h3 className="text-white font-medium">{coin.name}</h3>
                    <p className="text-indigo-300 text-sm uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">
                    {currency.symbol}{coin.current_price.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;