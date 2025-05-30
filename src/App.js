import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } else {
      alert("MetaMask not found. Please install it to use this DApp.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Pulse Staking DApp</h1>
      <p>Connect your wallet to stake PLS and receive stPLS (coming soon).</p>
      <button onClick={connectWallet}>
        {walletAddress
          ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
}

export default App;
