import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiBarChart2, FiBell, FiDollarSign, FiPieChart, FiShield, FiGlobe } from 'react-icons/fi';

const Features = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = {
    all: [
      {
        id: 1,
        title: "Real-time Market Data",
        description: "Access up-to-the-second cryptocurrency prices, volumes, and market caps from all major exchanges worldwide.",
        icon: <FiBarChart2 className="text-2xl" />,
        extendedInfo: "Our data pipeline processes over 10,000 price updates per second across 500+ exchanges, giving you the most accurate and timely information available.",
        stats: "10,000+ updates/sec"
      },
      {
        id: 2,
        title: "Portfolio Tracking",
        description: "Track all your crypto investments in one place with automatic profit/loss calculations.",
        icon: <FiPieChart className="text-2xl" />,
        extendedInfo: "Connect your exchange accounts via API or manually add holdings. View performance over time with interactive charts and tax-ready reports.",
        stats: "30+ exchanges supported"
      },
      {
        id: 3,
        title: "Custom Price Alerts",
        description: "Set alerts for price movements, percentage changes, and technical indicators.",
        icon: <FiBell className="text-2xl" />,
        extendedInfo: "Receive notifications via email, mobile push, or browser alerts when your conditions are met. Create complex alert conditions with our advanced trigger system.",
        stats: "15+ alert types"
      },
      {
        id: 4,
        title: "Advanced Charting",
        description: "Professional-grade charts with dozens of technical indicators and drawing tools.",
        icon: <FiDollarSign className="text-2xl" />,
        extendedInfo: "Access candlestick, line, and area charts with 50+ technical indicators. Save chart templates and compare multiple assets side-by-side.",
        stats: "50+ indicators"
      },
      {
        id: 5,
        title: "Security Features",
        description: "Enterprise-grade security to protect your data and privacy.",
        icon: <FiShield className="text-2xl" />,
        extendedInfo: "We use bank-level encryption, two-factor authentication, and regular security audits to ensure your data remains protected at all times.",
        stats: "256-bit encryption"
      },
      {
        id: 6,
        title: "Multi-currency Support",
        description: "View prices and values in your preferred local currency.",
        icon: <FiGlobe className="text-2xl" />,
        extendedInfo: "Supports 50+ fiat currencies with automatic conversion rates updated every minute. View your portfolio in multiple currencies simultaneously.",
        stats: "50+ currencies"
      }
    ],
    analytics: [
      // Filtered features for analytics tab
    ],
    security: [
      // Filtered features for security tab
    ]
  };

  const toggleFeature = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to track, analyze, and optimize your cryptocurrency investments
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            {['all', 'analytics', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features[activeTab].map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white/5 backdrop-blur-sm rounded-xl border ${expandedFeature === feature.id ? 'border-indigo-400' : 'border-white/10'} overflow-hidden transition-all duration-300`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleFeature(feature.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-500/10 p-3 rounded-lg text-indigo-400">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    <p className="mt-1 text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedFeature === feature.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-gray-300 mb-4">{feature.extendedInfo}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300">
                        {feature.stats}
                      </span>
                      <button className="inline-flex items-center text-indigo-400 hover:text-indigo-300">
                        Learn more <FiArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12 border border-indigo-400/20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your crypto portfolio?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of investors who are already using our platform to maximize their crypto returns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all transform hover:scale-105">
                Get Started - It's Free
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/20">
                See Live Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;