import React, { useContext, useEffect, useState } from 'react'
import bgImage from '../assets/crypto3.jpg'
import Navbar from './Navbar'
import { CoinContext } from '../Context/CoinContext'

const CoinTable = () => {
    const {allCoin,currency}=useContext(CoinContext)
    const[displayCoin,setDisplayCoin]=useState([])
    const[input,setInput]=useState('')
    const inputHandler=(event)=>{
        setInput(event.target.value);
        if(event.target.value===""){
            setDisplayCoin(allCoin)
        }
    }

    const seachHandler=async(event)=>{
        event.preventDefault();
        const coins=await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLocaleLowerCase());
        })
        setDisplayCoin(coins)

    }
    useEffect(()=>{
        setDisplayCoin(allCoin)
    },[allCoin])
  return (
    <div>
        <div className='pb-[3rem]'>
            {/*Hero section*/}    
            <div className='relative h-[110vh] w-full bg-cover bg-center bg-no-repeat rounded-b-[150px] ' style={{backgroundImage: `url(${bgImage})`}}>
                     <Navbar/>
                <div className='max-w-[900px] ml-[-50px] mt-[8rem] flex flex-col items-center text-left gap-8'>
                    <h1 className='text-[60px] ml-[-85px] font-bond leading-tight'> Secure,Smart, and <br/>
                    Easy Crypto Checking</h1>
                    <p className='w-[75%] text-[#e3e3e3] text-[18px] leading-[1.5]'> Stay in control of your digital asserts with our powerful crypto checking platform.Get real-time updates, track your portfolio, and verify transactions with ease.</p>
                    <form onSubmit={seachHandler}  className='relative z-10 flex items-center w-[60%] bg-white rounded-md p-2 text-[20px] ml-[-130px] gap-3'>
                        <input onChange={inputHandler}
                        value={input}
                        type="text" 
                        placeholder='Search crypto' 
                        className='flex-1 text-[16px] outline-none border-none pl-2 text-black' />
                        <button type="submit" className='bg-[#4727ff] text-white text-[16px] px-6 py-2 rounded-md cursor-pointer'>Search</button>
                    </form>

                </div>
            </div>
            {/*Coin Table */}
            <div className="max-w-[1000px] mx-auto relative mt-[3rem]">
                <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1.5fr] p-4 items-center border-b border-gray-700">
                    <p>Rank</p>
                    <p>Coins</p>
                    <p>Symbol</p>
                    <p>Current Price</p>
                    <p className="text-center">Price Change</p>
                    <p className="text-right">Market cap</p>
                </div>
                {
                    displayCoin.slice(0,12).map((item,index)=>(
                        <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1.5fr] p-4 items-center border-b border-gray-700 last:border-none">
                            <p>{item.market_cap_rank}</p>
                            <div className="flex items-center gap-3">
                                <img src={item.image} alt="" className="w-[35px]"/>
                                <p>{item.name}</p>
                            </div>
                            <p>{item.symbol}</p>
                            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                            <p className={
                                item.price_change_percentage_24h>0
                                ?"text-[#00d515] text-center"
                                :"text-[#ff4646] text-center"}>
                                {Math.floor(item.price_change_percentage_24h *100)/100}%
                                </p>
                            <p className="text-right">{currency.symbol}{item.market_cap}</p>
                        </div>

                    ))

                }
            </div>

        </div>
      
    </div>
  )
}

export default CoinTable
