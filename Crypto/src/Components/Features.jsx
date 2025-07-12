// src/Components/Features.jsx
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Real-time Prices",
      description: "Get up-to-the-second cryptocurrency prices from all major exchanges.",
      icon: "📊"
    },
    {
      title: "Portfolio Tracking",
      description: "Track your crypto investments and see your portfolio performance.",
      icon: "💼"
    },
    {
      title: "Price Alerts",
      description: "Set custom alerts for price movements and never miss an opportunity.",
      icon: "🔔"
    },
    {
      title: "Detailed Charts",
      description: "Interactive charts with multiple time frames and technical indicators.",
      icon: "📈"
    },
    {
      title: "Multi-currency",
      description: "View prices in your preferred currency (USD, EUR, GBP, etc.).",
      icon: "💱"
    },
    {
      title: "Comprehensive Data",
      description: "Market cap, volume, circulating supply, and all key metrics.",
      icon: "🧮"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Features</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Our platform offers everything you need to stay on top of the cryptocurrency market.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-indigo-400/50 transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;