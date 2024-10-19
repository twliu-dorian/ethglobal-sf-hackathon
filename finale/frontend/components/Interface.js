import { useState } from "react";
import $u from '../utils/$u.js';
import * as ethers from "ethers";

const wc = require("../circuit/witness_calculator.js");

const tornadoAddress = "0x06DB9c2856Eab779B2794E98c769a2e6aDA4D4b6";
const tornadoJSON = require("../json/Tornado.json");
const tornadoABI = tornadoJSON.abi;
const tornadoInterface = new ethers.utils.Interface(tornadoABI);

const ButtonState = { Normal: 0, Loading: 1, Disabled: 2 };

const Interface = () => {
       // State variables for form inputs
       const [itemId, setItemId] = useState('');
       const [price, setPrice] = useState('');
       const [recipient, setRecipient] = useState('');
       // Optional: State to hold and display the current wishlist
       const [wishlist, setWishlist] = useState([]);
   
       // Handler for adding a new wishlist item
       const handleAdd = () => {
           if (itemId.trim() === '' || price === '' || recipient.trim() === '') {
               alert('Please fill in all fields.');
               return;
           }
   
           // Add the item to the wishlist
           wishlistManager.addWishlistItem(itemId, parseFloat(price), recipient);
   
           // Update the local wishlist state (for display purposes)
           setWishlist([...wishlistManager.wishlist]);
   
           // Clear the input fields
           setItemId('');
           setPrice('');
           setRecipient('');
       };
   
       // Handler to display the wishlist (optional)
       const handleDisplay = () => {
           wishlistManager.displayWishlist();
           setWishlist([...wishlistManager.wishlist]);
       };
   
       // Handler to clear the wishlist (optional)
       const handleClear = () => {
           wishlistManager.clearWishlist();
           setWishlist([]);
       };
   
       return (
           <div className="container mt-5">
               <h2>Add to Wishlist</h2>
               <div className="mb-3">
                   <label htmlFor="itemId" className="form-label">Item ID</label>
                   <input 
                       type="text" 
                       className="form-control" 
                       id="itemId" 
                       value={itemId} 
                       onChange={(e) => setItemId(e.target.value)} 
                       placeholder="Enter Item ID"
                   />
               </div>
               <div className="mb-3">
                   <label htmlFor="price" className="form-label">Price</label>
                   <input 
                       type="number" 
                       className="form-control" 
                       id="price" 
                       value={price} 
                       onChange={(e) => setPrice(e.target.value)} 
                       placeholder="Enter Price"
                   />
               </div>
               <div className="mb-3">
                   <label htmlFor="recipient" className="form-label">Recipient</label>
                   <input 
                       type="text" 
                       className="form-control" 
                       id="recipient" 
                       value={recipient} 
                       onChange={(e) => setRecipient(e.target.value)} 
                       placeholder="Enter Recipient Address"
                   />
               </div>
               <button className="btn btn-primary me-2" onClick={handleAdd}>Add to Wishlist</button>
               <button className="btn btn-secondary me-2" onClick={handleDisplay}>Display Wishlist</button>
               <button className="btn btn-danger" onClick={handleClear}>Clear Wishlist</button>
   
               {/* Optional: Display the wishlist items */}
               {wishlist.length > 0 && (
                   <div className="mt-5">
                       <h3>Current Wishlist</h3>
                       <ul className="list-group">
                           {wishlist.map((item, index) => (
                               <li key={index} className="list-group-item">
                                   <strong>Item {index + 1}:</strong><br />
                                   Item ID: {item.itemId}<br />
                                   Price: {item.price}<br />
                                   Recipient: {item.recipient}
                               </li>
                           ))}
                       </ul>
                   </div>
               )}
           </div>
       );
    
    const [account, updateAccount] = useState(null);
    const [proofElements, updateProofElements] = useState(null);
    const [proofStringEl, updateProofStringEl] = useState(null);
    const [textArea, updateTextArea] = useState(null);

    // interface states
    const [section, updateSection] = useState("Deposit");
    const [displayCopiedMessage, updateDisplayCopiedMessage] = useState(false);
    const [withdrawalSuccessful, updateWithdrawalSuccessful] = useState(false);
    const [metamaskButtonState, updateMetamaskButtonState] = useState(ButtonState.Normal);
    const [depositButtonState, updateDepositButtonState] = useState(ButtonState.Normal);
    const [withdrawButtonState, updateWithdrawButtonState] = useState(ButtonState.Normal);


    const connectMetamask = async () => {
        try{
            updateMetamaskButtonState(ButtonState.Disabled);
            if(!window.ethereum){
                alert("Please install Metamask to use this app.");
                throw "no-metamask";
            }

            var accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            var chainId = window.ethereum.networkVersion;

            if(chainId != "11155111"){
                alert("Please switch to Sepolia Testnet");
                throw "wrong-chain";
            }

            var activeAccount = accounts[0];
            var balance = await window.ethereum.request({ method: "eth_getBalance", params: [activeAccount, "latest"] });
            balance = $u.moveDecimalLeft(ethers.BigNumber.from(balance).toString(), 18);

            var newAccountState = {
                chainId: chainId,
                address: activeAccount,
                balance: balance
            };
            updateAccount(newAccountState);
        }catch(e){
            console.log(e);
        }

        updateMetamaskButtonState(ButtonState.Normal);
    };
    const depositEther = async () => {
        updateDepositButtonState(ButtonState.Disabled);

        const secret = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();
        const nullifier = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

        const input = {
            secret: $u.BN256ToBin(secret).split(""),
            nullifier: $u.BN256ToBin(nullifier).split("")
        };

        var res = await fetch("/deposit.wasm");
        var buffer = await res.arrayBuffer();
        var depositWC = await wc(buffer);

        const r = await depositWC.calculateWitness(input, 0);
        
        const commitment = r[1];
        const nullifierHash = r[2];

        const value = ethers.BigNumber.from("100000000000").toHexString();

        const tx = {
            to: tornadoAddress,
            from: account.address,
            value: value,
            data: tornadoInterface.encodeFunctionData("deposit", [commitment])
        };

        try{
            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [tx] });

            const proofElements = {
                nullifierHash: `${nullifierHash}`,
                secret: secret,
                nullifier: nullifier,
                commitment: `${commitment}`,
                txHash: txHash
            };

            console.log(proofElements);

            updateProofElements(btoa(JSON.stringify(proofElements)));
        }catch(e){
            console.log(e);
        }

        updateDepositButtonState(ButtonState.Normal);
    };
    const copyProof = () => {
        if(!!proofStringEl){
            flashCopiedMessage();
            navigator.clipboard.writeText(proofStringEl.innerHTML);
        }  
    };
    const withdraw = async () => {
        updateWithdrawButtonState(ButtonState.Disabled);

        if(!textArea || !textArea.value){ alert("Please input the proof of deposit string."); }

        try{
            const proofString = textArea.value;
            const proofElements = JSON.parse(atob(proofString));

            receipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [proofElements.txHash] });
            if(!receipt){ throw "empty-receipt"; }

            const log = receipt.logs[0];
            const decodedData = tornadoInterface.decodeEventLog("Deposit", log.data, log.topics);

            const SnarkJS = window['snarkjs'];

            const proofInput = {
                "root": $u.BNToDecimal(decodedData.root),
                "nullifierHash": proofElements.nullifierHash,
                "recipient": $u.BNToDecimal(account.address),
                "secret": $u.BN256ToBin(proofElements.secret).split(""),
                "nullifier": $u.BN256ToBin(proofElements.nullifier).split(""),
                "hashPairings": decodedData.hashPairings.map((n) => ($u.BNToDecimal(n))),
                "hashDirections": decodedData.pairDirection
            };

            const { proof, publicSignals } = await SnarkJS.groth16.fullProve(proofInput, "/withdraw.wasm", "/setup_final.zkey");

            const callInputs = [
                proof.pi_a.slice(0, 2).map($u.BN256ToHex),
                proof.pi_b.slice(0, 2).map((row) => ($u.reverseCoordinate(row.map($u.BN256ToHex)))),
                proof.pi_c.slice(0, 2).map($u.BN256ToHex),
                publicSignals.slice(0, 2).map($u.BN256ToHex)
            ];

            const callData = tornadoInterface.encodeFunctionData("withdraw", callInputs);
            const tx = {
                to: tornadoAddress,
                from: account.address,
                data: callData
            };
            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [tx] });

            var receipt;
            while(!receipt){
                receipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [txHash] });
                await new Promise((resolve, reject) => { setTimeout(resolve, 1000); });
            }

            if(!!receipt){ updateWithdrawalSuccessful(true); }
        }catch(e){
            console.log(e);
        }

        updateWithdrawButtonState(ButtonState.Normal);
    };

    const flashCopiedMessage = async () => {
        updateDisplayCopiedMessage(true);
        setTimeout(() => {
            updateDisplayCopiedMessage(false);
        }, 1000);
    }

    return (
        <div>

            <nav className="navbar navbar-nav fixed-top bg-dark text-light">
                {
                    !!account ? (
                        <div className="container">
                            <div className="navbar-left">
                                <span><strong>ChainId:</strong></span>
                                <br/>
                                <span>{account.chainId}</span>
                            </div>
                            <div className="navbar-right">
                                <span><strong>{account.address.slice(0, 12) + "..."}</strong></span>
                                <br/>
                                <span className="small">{account.balance.slice(0, 10) + ((account.balance.length > 10) ? ("...") : (""))} ETH</span>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="navbar-left"><h5>Donation Page</h5></div>
                            <div className="navbar-right">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={connectMetamask}
                                    disabled={metamaskButtonState == ButtonState.Disabled}    
                                >Connect Metamask</button>
                            </div>
                        </div>
                    )
                }

                
            </nav>

            <div style={{ height: "60px" }}></div>

            <div className="container" style={{ marginTop: 60 }}>
                <div className="card mx-auto" style={{ maxWidth: 450 }}>
                    {
                        (section == "Deposit") ? (
                            <img className="card-img-top" src="/img/deposit.png" />
                        ) : (
                            <img className="card-img-top" src="/img/withdraw.png" />
                        )
                    }
                    <div className="card-body">

                        <div className="btn-group" style={{ marginBottom: 20 }}>
                            {
                                (section == "Deposit") ? (
                                    <button className="btn btn-primary">Deposit</button>
                                ) : (
                                    <button onClick={() => { updateSection("Deposit"); }} className="btn btn-outline-primary">Deposit</button>   
                                )
                            }
                            {
                                (section == "Deposit") ? (
                                    <button onClick={() => { updateSection("Withdraw"); }} className="btn btn-outline-primary">Withdraw</button> 
                                ) : (
                                    <button className="btn btn-primary">Withdraw</button>
                                )
                            }
                        </div>

                        {
                            (section == "Deposit" && !!account) && (
                                <div>
                                    {
                                        (!!proofElements) ? (
                                            <div>
                                                <div className="alert alert-success">
                                                    <span><strong>Proof of Deposit:</strong></span>
                                                    <div className="p-1" style={{ lineHeight: "12px" }}>
                                                        <span style={{ fontSize: 10 }} ref={(proofStringEl) => { updateProofStringEl(proofStringEl); }}>{proofElements}</span>
                                                    </div>

                                                </div>

                                                <div>
                                                    <button className="btn btn-success" onClick={copyProof}><span className="small">Copy Proof String</span></button>
                                                    {
                                                        (!!displayCopiedMessage) && (
                                                            <span className="small" style={{ color: 'green' }}><strong> Copied!</strong></span>
                                                        )
                                                    }
                                                </div>
                                                
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-secondary">Note: All deposits and withdrawals are of the same denomination of 0.001 ETH.</p>
                                                <button 
                                                    className="btn btn-success" 
                                                    onClick={depositEther}
                                                    disabled={depositButtonState == ButtonState.Disabled}
                                                ><span className="small">Deposit 0.001 ETH</span></button>
                                            </div>
                                            
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            (section != "Deposit" && !!account) && (
                                <div>
                                    {
                                        (withdrawalSuccessful) ? (
                                            <div>
                                                <div className="alert alert-success p-3">
                                                    <div><span><strong>Success!</strong></span></div>
                                                    <div style={{ marginTop: 5 }}>
                                                        <span className="text-secondary">Withdrawal successful. You can check your wallet to verify your funds.</span>
                                                    </div>

                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-secondary">Note: All deposits and withdrawals are of the same denomination of 0.001 ETH.</p>
                                                <div className="form-group">
                                                    <textarea className="form-control" style={{ resize: "none" }} ref={(ta) => { updateTextArea(ta); }}></textarea>
                                                </div>
                                                <button 
                                                    className="btn btn-primary" 
                                                    onClick={withdraw}
                                                    disabled={withdrawButtonState == ButtonState.Disabled}
                                                ><span className="small">Withdraw 0.001 ETH</span></button>
                                            </div>                  
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            (!account) && (
                                <div>
                                    <p>Please connect your wallet to use the sections.</p>
                                </div>
                            )
                        }


                    </div>

                    <div className="card-footer p-4" style={{ lineHeight: "15px" }}>
                        <span className="small text-secondary" style={{ fontSize: "12px" }}>
                            <strong>Disclaimer:</strong> Donation App
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Interface;