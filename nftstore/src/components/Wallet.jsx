import React, { useEffect, useState } from "react";
import connectWalletImg from '../assets/connectWallet.png';
import styles from './Wallet.css';

const Wallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
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
    <button onClick={connectWallet} >
      Connect Wallet
    </button>
  );
  
  const renderConnectedContainer = () =>(
    <div className={styles.walletContainer}>
      <img width="125" height="36" src={connectWalletImg} alt="wallet connected" />
      <p className={styles.walletAddress}>{getShortAddress(currentAccount)}</p>
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