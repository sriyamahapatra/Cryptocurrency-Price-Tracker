import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='flex items-center justify-between py-5 px-[10%] text-gray-300 relative z-[1000]'>
        {/*Logo */}
        <h2 className='text-2xl font-bold'>Crypto Price Tracker</h2>
        {/* Navlink */}
        <ul className='flex gap-10 list-none'>
            <li className='cursor-pointer hover:text-white transition'>Home</li>
            <li className='cursor-pointer hover:text-white transition'>Features</li>
            <li className='cursor-pointer hover:text-white transition'>Pricing</li>
            <li className='cursor-pointer hover:text-white transition'>Blog</li>
        </ul>
        {/*Button */}
        <div>
            <button className='items-center px-6 py-2 font-medium text-gray-900 bg-white rounded-full hover:bg-blue-400'>Sign Up</button>
        </div>

        </nav>
    </div>
  )
}

export default Navbar
