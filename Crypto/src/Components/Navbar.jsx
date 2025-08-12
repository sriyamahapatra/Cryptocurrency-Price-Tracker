import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const { openSignUp } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className='flex items-center justify-between py-5 px-4 md:px-[10%] text-gray-300 relative z-[1000]'>
        {/* Logo */}
        <Link to="/" className='text-2xl font-bold hover:text-white transition'>Crypto Price Tracker</Link>
        
        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className='md:hidden text-white focus:outline-none'
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop Navlinks */}
        <ul className='hidden md:flex gap-10 list-none'>
          <li className='cursor-pointer hover:text-white transition'>
            <Link to="/">Home</Link>
          </li>
          <li className='cursor-pointer hover:text-white transition'>
            <Link to="/features">Features</Link>
          </li>
          <li className='cursor-pointer hover:text-white transition'>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className='cursor-pointer hover:text-white transition'>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <button 
              onClick={() => openSignUp()} 
              className='items-center px-6 py-2 font-medium text-gray-900 bg-white rounded-full hover:bg-blue-400 transition'
            >
              Sign Up
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-800 text-gray-300 px-4 py-2 absolute w-full z-[999]'>
          <ul className='flex flex-col gap-4 list-none'>
            <li className='cursor-pointer hover:text-white transition py-2 border-b border-gray-700'>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className='cursor-pointer hover:text-white transition py-2 border-b border-gray-700'>
              <Link to="/features" onClick={toggleMenu}>Features</Link>
            </li>
            <li className='cursor-pointer hover:text-white transition py-2 border-b border-gray-700'>
              <Link to="/pricing" onClick={toggleMenu}>Pricing</Link>
            </li>
            <li className='cursor-pointer hover:text-white transition py-2 border-b border-gray-700'>
              <Link to="/blog" onClick={toggleMenu}>Blog</Link>
            </li>
          </ul>
          <div className="flex flex-col gap-4 mt-4 pb-4">
            <SignedOut>
              <button 
                onClick={() => {
                  openSignUp();
                  toggleMenu();
                }} 
                className='w-full px-6 py-2 font-medium text-gray-900 bg-white rounded-full hover:bg-blue-400 transition'
              >
                Sign Up
              </button>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;