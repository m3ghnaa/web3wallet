import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="app-container">
      <h1>Generate Your Own Crypto Wallets!</h1>
      <p> This tool allows you to generate a 12-word seed phrase and create Ethereum & Solana wallets instantly. </p>
      <p> Easily create a new mnemonic and derive wallet addresses.
Generate multiple wallets for both Ethereum and Solana.
Securely store your mnemonic and private keys, as they are not saved anywhere.
Built using React, bip39, ethers.js, and Solana web3.js.</p>
      
      
      <button onClick={async function() {
        const mn = generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>

      {/* Display the mnemonic as individual words in divs */}
      <div className="mnemonic-container">
        {mnemonic && mnemonic.split(" ").map((word, index) => (
          <div key={index} className="mnemonic-word">
            {word}
          </div>
        ))}
      </div>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </div>
  )
}

export default App
