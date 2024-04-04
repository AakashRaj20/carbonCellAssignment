"use client";

import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";

const CoinCard = () => {
  const [coinData, setCoinData] = useState({});
  const [coinPrice, setCoinPrice] = useState([]);

  const fetchCoinData = async () => {
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      setCoinData(response.data);
      coinPriceArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const coinPriceArray = (data) => {
    const priceArray = Object.keys(data.bpi).map((currency) => ({
      ...data.bpi[currency],
      currency,
    }));
    setCoinPrice(priceArray);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  const decodeSymbol = (symbol) => {
    const div = document.createElement("div");
    div.innerHTML = symbol;
    return div.innerText;
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      {coinData.bpi ? (
        <>
          <div className="flex flex-col gap-2 pb-2 border-b border-neutral-600">
            <h1 className="text-3xl font-bold">Assets</h1>
            <p className="text-base">{coinData.disclaimer}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coinPrice.map((coin, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-xl p-5 flex flex-col gap-5"
              >
                <p className="text-3xl text-center font-bold text-color">
                  {coinData.chartName}
                </p>
                <p className="text-xl font-bold text-[#77DD77]">
                  {`${coin.description}`}{" "}
                  <span className="text-xl text-white font-medium">{`(${coin.code})`}</span>
                </p>
                <p className="text-xl font-medium">
                  Price:{" "}
                  <span className="font-bold text-green-400">
                    {decodeSymbol(coin.symbol) + coin.rate}
                  </span>
                </p>
                <p className="text-xl font-medium">
                  Rate Float:{" "}
                  <span className="font-bold text-green-400">
                    {coin.rate_float.toFixed(2)}
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  <Info />
                  <Button className="wallet-button text-xl font-medium">
                    Trade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-3xl font-bold">Assets</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-56" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinCard;
