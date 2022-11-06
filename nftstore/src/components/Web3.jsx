// import { useOwnedNFTs, useContract } from "@thirdweb-dev/react";

// export const soccerBeatsContractAddress = "0xf4910C763eD4e47A585E2D34baA9A4b611aE448C";

// export function GetNFTFromWallet(walletAddress) {
//     const contract = useContract(soccerBeatsContractAddress);
//     const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, walletAddress);
//     console.log("ownedNFT: ");
//     console.log(ownedNFTs)
// }

// export const GetAddress = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have metamask!");
//       return;
//     }

//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//       return accounts[0];
//     } else {
//       console.log("No authorized account found");
//       return undefined;
//     }
//   }