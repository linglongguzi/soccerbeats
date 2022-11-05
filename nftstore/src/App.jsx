import React, { useEffect, useState } from "react";
import './styles/App.css';
import Wallet from "./components/Wallet";
import { AccessoryPage } from "./components/AccessoryPage";
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
 
  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */
  return (
   <AccessoryPage />

   
  );
};

export default App;