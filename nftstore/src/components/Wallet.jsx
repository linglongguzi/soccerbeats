import React, { useEffect, useState } from "react";
import connectWalletImg from '../assets/connectWallet.png';
import wallet2 from '../assets/wallet2.png';
import styles from './Wallet.css';

const Wallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error);
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button class="walletBtn" onClick={connectWallet} >
      <img class="icon" src={wallet2} alt="wallet" />
      Connect Wallet
    </button>
  );
  
  const renderConnectedContainer = () =>(
    <div className={styles.walletContainer}>
      <button class="bg-gradient-to-r from-pink-200 via-pink-400 to-pink-600 text-white py-2 px-4 rounded-full inline-flex items-center"> 
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
        <span>{getShortAddress(currentAccount)}</span>
      </button>
    </div>
  );

  const getShortAddress = (address) => (
    `${getFirstNDigits(address, 4)}...${getLastNDigits(address,4)}`
  );
 
  const getFirstNDigits = (address, n) =>{
    console.log(address.substring(0, n));
    return address.substring(0, n);
  }
  const getLastNDigits = (address, n) =>{
    return address.substring(address.length - n);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */
  return (
      <div>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            renderConnectedContainer()
          )}
        </div>
  );
};

export default Wallet;