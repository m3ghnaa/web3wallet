import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div className="sol-wallet-container">
      <button
        className="add-sol-wallet-button"
        onClick={async function () {
          try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
          } catch (error) {
            console.error("Error generating Solana wallet:", error);
          }
        }}
      >
        Add SOL Wallet
      </button>

      <div className="public-keys-container">
        {publicKeys.map((p, index) => (
          <div key={index} className="public-key-item">
            Solana Public Key {index + 1}: {p}
          </div>
        ))}
      </div>
    </div>
  );
}
