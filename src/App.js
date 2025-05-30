import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [plsBalance, setPlsBalance] = useState(0);
  const [stplsBalance, setStplsBalance] = useState(0);

  useEffect(() => {
    // Load stored balances
    const pls = localStorage.getItem("plsBalance");
    const stpls = localStorage.getItem("stplsBalance");
    if (pls) setPlsBalance(parseFloat(pls));
    if (stpls) setStplsBalance(parseFloat(stpls));
  }, []);

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

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount");

    setPlsBalance(prev => {
      const newVal = prev - amount;
      localStorage.setItem("plsBalance", newVal);
      return newVal;
    });

    setStplsBalance(prev => {
      const newVal = prev + amount;
      localStorage.setItem("stplsBalance", newVal);
      return newVal;
    });

    setStakeAmount("");
  };

  const handleUnstake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0 || amount > stplsBalance)
      return alert("Invalid unstake amount");

    setStplsBalance(prev => {
      const newVal = prev - amount;
      localStorage.setItem("stplsBalance", newVal);
      return newVal;
    });

    setPlsBalance(prev => {
      const newVal = prev + amount;
      localStorage.setItem("plsBalance", newVal);
      return newVal;
    });

    setStakeAmount("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Pulse Staking DApp (Simulated)</h1>
      <p>Connect your wallet to simulate staking PLS and receiving stPLS.</p>
      <button onClick={connectWallet} style={{ marginBottom: "1rem" }}>
        {walletAddress
          ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </button>

      <div>
        <p><strong>Your PLS:</strong> {plsBalance.toFixed(2)}</p>
        <p><strong>Your stPLS:</strong> {stplsBalance.toFixed(2)}</p>
      </div>

      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Amount"
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button onClick={handleStake}>Stake</button>
      <button onClick={handleUnstake} style={{ marginLeft: "1rem" }}>
        Unstake
      </button>
    </div>
  );
}

export default App;
