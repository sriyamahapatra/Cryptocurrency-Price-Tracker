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
            if (!key || key === "your_actual_api_key_here") {
                setApiStatus("unavailable");
                console.warn("Hugging Face API key not found or not configured");
            } else {
                setApiStatus("available");
            }
        };
        
        checkApiKey();
    }, []);

    // Price-based sentiment analysis (reliable fallback)
    const getSentimentFromPriceChange = (priceChange) => {
        if (priceChange === null || priceChange === undefined) return '😐';
        
        if (priceChange > 15) return '🚀';
        if (priceChange > 8) return '😊';
        if (priceChange > 3) return '🙂';
        if (priceChange > 0) return '😐';
        if (priceChange > -3) return '😐';
        if (priceChange > -8) return '🙁';
        if (priceChange > -15) return '😠';
        return '💀';
    };

    // Hugging Face API sentiment analysis
    const analyzeWithHuggingFace = async (prompt) => {
        if (apiStatus !== "available") {
            return null;
        }
        
        try {
            // Alternative model that might work better
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

    // Hybrid approach: Try API occasionally, fallback to price-based sentiment
    const analyzeSentiment = async (coin) => {
        // Use price-based sentiment as primary approach
        const priceBasedSentiment = getSentimentFromPriceChange(coin.price_change_percentage_24h);
        
        // Only try API if it's available and for 20% of requests
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

        // First set all sentiments based on price
        coins.slice(0, 20).forEach(coin => {
            sentiments[coin.id] = getSentimentFromPriceChange(coin.price_change_percentage_24h);
        });

        setCoinSentiments({...sentiments});

        // Then try to enhance some with API calls if available
        if (apiStatus === "available") {
            for (const coin of coins.slice(0, 10)) {
                try {
                    const sentiment = await analyzeSentiment(coin);
                    sentiments[coin.id] = sentiment;
                    
                    // Update as we go
                    setCoinSentiments(prev => ({...prev, [coin.id]: sentiment}));
                    
                    // Add delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                } catch (error) {
                    console.error(`Error analyzing sentiment for ${coin.name}:`, error);
                    // Keep the price-based sentiment
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
            
            // Fetch sentiments after coins are loaded
            fetchSentimentsForTopCoins(data);
            
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
        // Set up interval to refresh data every 5 minutes
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