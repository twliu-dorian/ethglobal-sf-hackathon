// src/components/Deposit.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ButtonState } from "../constants/ButtonState";
import witnessCalculator from "../circuit/witness_calculator.js";
import tornadoJSON from "../json/Tornado.json";
import depositImg from "../public/img/deposit.png";
import $u from '../utils/$u.js';

const Deposit = ({
    account,
    wcModule,
    tornadoInterface,
    setProofElements
}) => {
    const [depositButtonState, setDepositButtonState] = useState(ButtonState.Normal);

    const depositEther = async () => {
        if (!wcModule) {
            alert("Witness calculator not loaded yet.");
            return;
        }

        setDepositButtonState(ButtonState.Disabled);

        try {
            const secret = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();
            const nullifier = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

            const input = {
                secret: $u.BN256ToBin(secret).split(""),
                nullifier: $u.BN256ToBin(nullifier).split("")
            };

            const witness = wcModule.calculateWitness(input, 0);

            const commitment = witness[1];
            const nullifierHash = witness[2];

            const value = ethers.utils.parseEther("0.001").toHexString();

            const tx = {
                to: "0x06DB9c2856Eab779B2794E98c769a2e6aDA4D4b6", // tornadoAddress
                from: account.address,
                value: value,
                data: tornadoInterface.encodeFunctionData("deposit", [commitment])
            };

            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [tx] });

            const proofElementsData = {
                nullifierHash: `${nullifierHash}`,
                secret: secret,
                nullifier: nullifier,
                commitment: `${commitment}`,
                txHash: txHash
            };

            console.log(proofElementsData);

            setProofElements(btoa(JSON.stringify(proofElementsData)));
        } catch (e) {
            console.error(e);
            alert("Deposit failed.");
        } finally {
            setDepositButtonState(ButtonState.Normal);
        }
    };

    return (
        <div>
            <p className="text-secondary">Note: All deposits and withdrawals are of the same denomination of 0.001 ETH.</p>
            <button
                className="btn btn-success"
                onClick={depositEther}
                disabled={depositButtonState === ButtonState.Disabled}
            >
                <span className="small">Deposit 0.001 ETH</span>
            </button>
        </div>
    );
};

export default Deposit;
