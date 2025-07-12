// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinTable from './Components/CoinTable';
import Pricing from './Components/Pricing';
import CoinDetail from './Components/CoinDetail';
import Features from './Components/Features';
import Blog from './Components/Blog';
import CoinContextProvide from './Context/CoinContext';

const App = () => {
  return (
    <CoinContextProvide>
      <Router>
        <div className='bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen text-white'>
          <Routes>
            <Route path="/" element={<CoinTable />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/coin/:coinId" element={<CoinDetail />} />
            <Route path="/features" element={<Features />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </Router>
    </CoinContextProvide>
  );
};

export default App;
