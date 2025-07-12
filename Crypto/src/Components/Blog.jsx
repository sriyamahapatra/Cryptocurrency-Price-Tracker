// src/Components/Blog.jsx
import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: "Understanding Blockchain Technology",
      excerpt: "Learn the fundamentals of blockchain and how it powers cryptocurrencies.",
      date: "May 15, 2023"
    },
    {
      title: "Bitcoin Halving: What It Means for Investors",
      excerpt: "Exploring the impact of Bitcoin's halving events on its price and the market.",
      date: "April 28, 2023"
    },
    {
      title: "The Rise of DeFi in 2023",
      excerpt: "How decentralized finance is changing the financial landscape.",
      date: "March 10, 2023"
    },
    {
      title: "NFT Market Trends to Watch",
      excerpt: "Current trends and future predictions for the NFT space.",
      date: "February 22, 2023"
    },
    {
      title: "Crypto Security Best Practices",
      excerpt: "Essential tips to keep your cryptocurrency investments safe.",
      date: "January 5, 2023"
    },
    {
      title: "Altcoin Season: Is It Coming?",
      excerpt: "Analyzing market indicators for the next altcoin season.",
      date: "December 18, 2022"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Blog</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Latest news, insights, and analysis from the world of cryptocurrency.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-indigo-400/50 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <p className="text-indigo-300 text-sm">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;