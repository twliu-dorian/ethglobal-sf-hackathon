// src/components/Interface.js
import React, { useState, useRef } from "react";
import Navbar from "./navigation";
import Wishlist from "./wishList";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import useEthereum from "../hooks/useEthereum";
import depositImg from "../public/img/deposit.png";
import withdrawImg from "../public/img/withdraw.png";

const Interface = () => {
    const {
        account,
        connectMetamask,
        metamaskButtonState,
        wcModule,
        proofElements,
        setProofElements,
        tornadoInterface
    } = useEthereum();

    const [section, setSection] = useState("Deposit");
    const [displayCopiedMessage, setDisplayCopiedMessage] = useState(false);

    const proofStringRef = useRef(null);

    const copyProof = () => {
        if (proofStringRef.current) {
            flashCopiedMessage();
            navigator.clipboard.writeText(proofStringRef.current.innerText);
        }
    };

    const flashCopiedMessage = () => {
        setDisplayCopiedMessage(true);
        setTimeout(() => {
            setDisplayCopiedMessage(false);
        }, 1000);
    };

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar
                account={account}
                connectMetamask={connectMetamask}
                metamaskButtonState={metamaskButtonState}
            />

            {/* Spacer for Fixed Navbar */}
            <div style={{ height: "70px" }}></div>

            {/* Wishlist Section */}
            <Wishlist />

            {/* Main Interface Section */}
            <div className="container mt-5">
                <div className="card mx-auto" style={{ maxWidth: 450 }}>
                    <img className="card-img-top" src={section === "Deposit" ? depositImg : withdrawImg} alt={`${section} Image`} />
                    <div className="card-body">

                        {/* Section Buttons */}
                        <div className="btn-group mb-4">
                            <button
                                className={`btn ${section === "Deposit" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSection("Deposit")}
                            >
                                Deposit
                            </button>
                            <button
                                className={`btn ${section === "Withdraw" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSection("Withdraw")}
                            >
                                Withdraw
                            </button>
                        </div>

                        {/* Deposit Section */}
                        {section === "Deposit" && account && (
                            <div>
                                {proofElements ? (
                                    <div>
                                        <div className="alert alert-success">
                                            <strong>Proof of Deposit:</strong>
                                            <div className="p-2" style={{ fontSize: "12px", wordBreak: "break-all" }}>
                                                <span ref={proofStringRef}>{proofElements}</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success" onClick={copyProof}>
                                            <span className="small">Copy Proof String</span>
                                        </button>
                                        {displayCopiedMessage && (
                                            <span className="small text-success ms-2"><strong>Copied!</strong></span>
                                        )}
                                    </div>
                                ) : (
                                    <Deposit
                                        account={account}
                                        wcModule={wcModule}
                                        tornadoInterface={tornadoInterface}
                                        setProofElements={setProofElements}
                                    />
                                )}
                            </div>
                        )}

                        {/* Withdraw Section */}
                        {section === "Withdraw" && account && (
                            <Withdraw
                                account={account}
                                wcModule={wcModule}
                                tornadoInterface={tornadoInterface}
                                setupZkey="../public/setup_final.zkey" // Ensure the correct path
                                withdrawWasm="../public/withdraw.wasm" // Ensure the correct path
                            />
                        )}

                        {/* Prompt to Connect Wallet */}
                        {!account && (
                            <div>
                                <p>Please connect your wallet to use the sections.</p>
                            </div>
                        )}
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer text-muted text-center">
                        <small>
                            <strong>Disclaimer:</strong> Donation App
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interface;
