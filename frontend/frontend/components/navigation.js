// src/components/Navbar.js
import React from "react";
import { ButtonState } from "../constants/ButtonState";

const Navbar = ({
    account,
    connectMetamask,
    metamaskButtonState
}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Donation Page</a>
                <div className="d-flex">
                    {
                        account ? (
                            <div className="d-flex flex-column text-end text-light">
                                <span><strong>ChainId:</strong> {parseInt(account.chainId, 16)}</span>
                                <span><strong>Address:</strong> {account.address.slice(0, 12)}...</span>
                                <span className="small">{parseFloat(account.balance).toFixed(4)} ETH</span>
                            </div>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={connectMetamask}
                                disabled={metamaskButtonState === ButtonState.Disabled}
                            >
                                {metamaskButtonState === ButtonState.Disabled ? "Connecting..." : "Connect Metamask"}
                            </button>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
