"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Web3 } from "web3";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Wallet = () => {
  const pathname = usePathname();

  const [connectedAccount, setConnectedAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [connectedAccount]);

  const connectMetamask = async () => {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      setError("Not Installed");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Not Installed");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setConnectedAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setConnectedAccount("");
      //setError("Not Installed");
    }
  };

  const errorUi = (error, connectedAccount) => {
    if (error === "Not Installed") {
      return (
        <>
          <p>
            Metamask is not installed. Please install Metamask to connect your
            wallet.
          </p>

          <Link
            target="_blank"
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=google.com"
          >
            <Button className="wallet-button text-2xl font-bold">
              Download MetaMask
            </Button>
          </Link>
        </>
      );
    } else if (!connectedAccount && error !== "Not Installed") {
      return (
        <>
          <p>
            Connect your Metamask Wallet to get started to Track and Manage your
            assets.
          </p>
          <Button
            onClick={() => connectMetamask()}
            className="wallet-button text-2xl font-bold"
          >
            Connect Wallet
          </Button>
        </>
      );
    } else {
      return (
        <>
          <p>"Your Metamask Wallet is connected"</p>
          <Button className="wallet-button text-xl md:text-sm lg:text-2xl">
            {connectedAccount.slice(0, 18) + "..."}
          </Button>
        </>
      );
    }
  };

  console.log(connectedAccount);

  return (
    <div
      className={`flex flex-col gap-16 bg-neutral-900 rounded-xl p-5 pb-9 text-white ${
        pathname === "/wallet" && "h-full"
      }`}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Wallet Info</h1>
        <Separator className="bg-neutral-700 h-[1.5px]" />
      </div>
      <div className="text-green-400 flex flex-col gap-12 items-center justify-center text-center font-medium text-lg">
        <Image
          src="/images/metamask-icon.svg"
          alt="metamask-icon"
          width={100}
          height={100}
        />
        {errorUi(error, connectedAccount)}
      </div>
    </div>
  );
};

export default Wallet;
