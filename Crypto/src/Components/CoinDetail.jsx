// CoinDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../Context/CoinContext';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoinDetail = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [timeRange, setTimeRange] = useState('7');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-7hwE3sVk7CQF1aFCNsaYpCB1' }
        };
        
        // Fetch coin details
        const coinResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          options
        );
        const coinData = await coinResponse.json();
        setCoinData(coinData);
        
        // Fetch market chart data
        const marketResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${timeRange}`,
          options
        );
        const marketData = await marketResponse.json();
        setMarketData(marketData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, currency.name, timeRange]);

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">Error: {error}</div>;

  // Prepare chart data
  const priceChartData = {
    labels: marketData.prices.map(price => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: marketData.prices.map(price => price[1]),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const volumeChartData = {
    labels: marketData.total_volumes.map(vol => new Date(vol[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Volume',
        data: marketData.total_volumes.map(vol => vol[1]),
        backgroundColor: '#10b981',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Coin Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={coinData.image.large} alt={coinData.name} className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
              <p className="text-gray-300">Rank: #{coinData.market_cap_rank}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-white">
              {currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}
            </h2>
            <p className={`text-lg ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {['1', '7', '14', '30', '90', '180', '365'].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-2 rounded-lg ${timeRange === days ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            >
              {days}d
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Price Chart ({timeRange} days)</h3>
            <Line 
              data={priceChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    ticks: { color: '#e2e8f0' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                  x: {
                    ticks: { color: '#e2e8f0' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
              }}
            />
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Volume Chart ({timeRange} days)</h3>
            <Bar 
              data={volumeChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    ticks: { color: '#e2e8f0' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                  x: {
                    ticks: { color: '#e2e8f0' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Coin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Market Cap', value: coinData.market_data.market_cap[currency.name] },
            { label: '24h Trading Volume', value: coinData.market_data.total_volume[currency.name] },
            { label: 'All Time High', value: coinData.market_data.ath[currency.name] },
            { label: 'All Time Low', value: coinData.market_data.atl[currency.name] },
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <h4 className="text-gray-300 text-sm mb-1">{stat.label}</h4>
              <p className="text-white font-medium text-xl">
                {currency.symbol}{stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Coin Description */}
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 mb-12">
          <h3 className="text-xl font-bold text-white mb-4">About {coinData.name}</h3>
          <div 
            className="text-gray-300 prose prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {Object.entries(coinData.links).map(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value[0]) {
              return (
                <a 
                  key={key} 
                  href={value[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition"
                >
                  {key.replace(/_/g, ' ')}
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;