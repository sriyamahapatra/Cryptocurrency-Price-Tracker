import { createContext,useEffect,useState } from "react";

export const CoinContext= createContext();
const CoinContextProvide=({children})=>{
    const [allCoin,setAllCoin]=useState([])
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol: "$"
    })
    const fetchAllCoin=async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-7hwE3sVk7CQF1aFCNsaYpCB1'}
          };
          try {
            const response=await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options

            )
            const data=await response.json();
            setAllCoin(data)
            console.log(data);
            
          } catch (error) {
            console.log("Error fetch coin data");
            
          }

    }
    useEffect(()=>{
        fetchAllCoin()

    },[currency])
    return(
        <CoinContext.Provider value={{allCoin,currency,setCurrency}}>
            {children}
        </CoinContext.Provider>

    )
}
export default CoinContextProvide;