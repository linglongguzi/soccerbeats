import React, {useState , useEffect, Suspense} from 'react';
import clothImg from '../../assets/model4.png';
import girlImg from '../../assets/model3.png';
import AssetCard from '../../components/AssetCard';

import './index.css';

function MyAssets () {
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

  const renderWalletNotConnected = () => (
    <div class="mt-6">Connect wallet to see your assets</div>
  );

  const renderWalletConnected = ()=> (
      <div className="container py-5">
          <div class="grid grid-cols-4 gap-6">
            <AssetCard img={girlImg} isAvatar={true}></AssetCard>
            <AssetCard img={clothImg}></AssetCard>
          </div>
      </div>
  )

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return(
    <Suspense>
      { currentAccount === "" ? (renderWalletNotConnected()) : (renderWalletConnected())}
    </Suspense>
  )
}
export default MyAssets;