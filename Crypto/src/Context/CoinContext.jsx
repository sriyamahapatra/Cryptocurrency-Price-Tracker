import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CoinContext = createContext();

const CoinContextProvide = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });
    const [coinSentiments, setCoinSentiments] = useState({});
    const [isLoadingSentiments, setIsLoadingSentiments] = useState(false);
    const [apiStatus, setApiStatus] = useState("checking"); // checking, available, unavailable

    // Check if API key is available
    useEffect(() => {
        const checkApiKey = () => {
            const key = import.meta.env.VITE_HUGGING_FACE_API_KEY;
            if (!key || key === "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english") {
                setApiStatus("unavailable");
                console.warn("Hugging Face API key not found or not configured");
            } else {
                setApiStatus("available");
            }
        };
        
        checkApiKey();
    }, []);

    const getSentimentFromPriceChange = (priceChange) => {
        if (priceChange === null || priceChange === undefined) return '😐';
        
        if (priceChange > 10) return '🚀';
        if (priceChange > 6) return '😊';
        if (priceChange > 2) return '🙂';
        if (priceChange > 0) return '😐';
        if (priceChange > -2) return '😐';
        if (priceChange > -6) return '🙁';
        if (priceChange > -10) return '😠';
        return '💀';
    };

    // Hugging Face API sentiment analysis
    const analyzeWithHuggingFace = async (prompt) => {
        if (apiStatus !== "available") {
            return null;
        }
        
        try {
            const API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
            const headers = {
                "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            };
            
            const response = await axios.post(API_URL, { inputs: prompt }, { 
                headers,
                timeout: 10000
            });
            
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                const sentimentData = response.data[0];
                
                if (Array.isArray(sentimentData)) {
                    const sortedSentiments = sentimentData.sort((a, b) => b.score - a.score);
                    const topSentiment = sortedSentiments[0];
                    
                    if (topSentiment.label === 'positive') return '😊';
                    if (topSentiment.label === 'neutral') return '😐';
                    if (topSentiment.label === 'negative') return '😠';
                }
            }
            
            return null;
        } catch (error) {
            console.log("Hugging Face API failed:", error.message);
            if (error.response?.status === 403) {
                setApiStatus("unavailable");
            }
            return null;
        }
    };

    const analyzeSentiment = async (coin) => {
        const priceBasedSentiment = getSentimentFromPriceChange(coin.price_change_percentage_24h);
        
        if (apiStatus === "available" && Math.random() < 0.2) {
            const prompt = `${coin.name} cryptocurrency is ${coin.price_change_percentage_24h > 0 ? 'rising' : 'falling'} today.`;
            const apiSentiment = await analyzeWithHuggingFace(prompt);
            
            if (apiSentiment) {
                return apiSentiment;
            }
        }
        
        return priceBasedSentiment;
    };

    // Fetch sentiment for top coins
    const fetchSentimentsForTopCoins = async (coins) => {
        setIsLoadingSentiments(true);
        const sentiments = {};

        coins.slice(0, 20).forEach(coin => {
            sentiments[coin.id] = getSentimentFromPriceChange(coin.price_change_percentage_24h);
        });

        setCoinSentiments({...sentiments});

        if (apiStatus === "available") {
            for (const coin of coins.slice(0, 10)) {
                try {
                    const sentiment = await analyzeSentiment(coin);
                    sentiments[coin.id] = sentiment;
                    
                    setCoinSentiments(prev => ({...prev, [coin.id]: sentiment}));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                } catch (error) {
                    console.error(`Error analyzing sentiment for ${coin.name}:`, error);
                   
                }
            }
        }

        setIsLoadingSentiments(false);
    };

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': 'CG-7hwE3sVk7CQF1aFCNsaYpCB1' 
            }
        };
        
        try {
            console.log("Fetching coin data...");
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Fetched coins:", data.length);
            setAllCoin(data);
            fetchSentimentsForTopCoins(data);
            
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
        const interval = setInterval(fetchAllCoin, 300000);
        return () => clearInterval(interval);
    }, [currency]);

    return (
        <CoinContext.Provider value={{ 
            allCoin, 
            currency, 
            setCurrency, 
            coinSentiments, 
            isLoadingSentiments,
            apiStatus
        }}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvide;
