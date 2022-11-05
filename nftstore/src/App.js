import React, { useEffect, useState } from "react";
import './styles/App.css';
import Wallet from "./components/Wallet";
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
 
  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */
  return (
   <Wallet />
  );
};

export default App;