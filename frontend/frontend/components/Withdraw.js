// src/components/Withdraw.js
import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import { ButtonState } from "../constants/ButtonState";
import withdrawImg from "../public/img/withdraw.png";
import $u from '../utils/$u.js';

const Withdraw = ({
    account,
    wcModule,
    tornadoInterface,
    setupZkey,
    withdrawWasm
}) => {
    const [withdrawButtonState, setWithdrawButtonState] = useState(ButtonState.Normal);
    const [withdrawalSuccessful, setWithdrawalSuccessful] = useState(false);
    const [displayCopiedMessage, setDisplayCopiedMessage] = useState(false);
    const textAreaRef = useRef(null);

    const withdraw = async () => {
        if (!wcModule) {
            alert("Witness calculator not loaded yet.");
            return;
        }

        setWithdrawButtonState(ButtonState.Disabled);

        if (!textAreaRef.current || !textAreaRef.current.value) {
            alert("Please input the proof of deposit string.");
            setWithdrawButtonState(ButtonState.Normal);
            return;
        }

        try {
            const proofString = textAreaRef.current.value;
            const proofElementsData = JSON.parse(atob(proofString));

            let receipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [proofElementsData.txHash] });
            if (!receipt) {
                throw new Error("empty-receipt");
            }

            const log = receipt.logs[0];
            const decodedData = tornadoInterface.decodeEventLog("Deposit", log.data, log.topics);

            const SnarkJS = window.snarkjs;
            if (!SnarkJS) {
                throw new Error("SnarkJS not loaded.");
            }

            const proofInput = {
                "root": $u.BNToDecimal(decodedData.root),
                "nullifierHash": proofElementsData.nullifierHash,
                "recipient": $u.BNToDecimal(account.address),
                "secret": $u.BN256ToBin(proofElementsData.secret).split(""),
                "nullifier": $u.BN256ToBin(proofElementsData.nullifier).split(""),
                "hashPairings": decodedData.hashPairings.map((n) => ($u.BNToDecimal(n))),
                "hashDirections": decodedData.pairDirection
            };

            const { proof, publicSignals } = await SnarkJS.groth16.fullProve(proofInput, withdrawWasm, setupZkey);

            const callInputs = [
                proof.pi_a.slice(0, 2).map($u.BN256ToHex),
                proof.pi_b.slice(0, 2).map((row) => ($u.reverseCoordinate(row.map($u.BN256ToHex)))),
                proof.pi_c.slice(0, 2).map($u.BN256ToHex),
                publicSignals.slice(0, 2).map($u.BN256ToHex)
            ];

            const callData = tornadoInterface.encodeFunctionData("withdraw", callInputs);
            const tx = {
                to: "0x06DB9c2856Eab779B2794E98c769a2e6aDA4D4b6", // tornadoAddress
                from: account.address,
                data: callData
            };
            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [tx] });

            // Poll for transaction receipt
            let txReceipt = null;
            while (!txReceipt) {
                txReceipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [txHash] });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            if (txReceipt.status === '0x1') { // Success
                setWithdrawalSuccessful(true);
            } else {
                throw new Error("Withdrawal transaction failed.");
            }
        } catch (e) {
            console.error(e);
            alert("Withdrawal failed.");
        } finally {
            setWithdrawButtonState(ButtonState.Normal);
        }
    };

    return (
        <div>
            {withdrawalSuccessful ? (
                <div className="alert alert-success">
                    <strong>Success!</strong>
                    <p className="text-secondary">Withdrawal successful. You can check your wallet to verify your funds.</p>
                </div>
            ) : (
                <div>
                    <p className="text-secondary">Note: All deposits and withdrawals are of the same denomination of 0.001 ETH.</p>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            style={{ resize: "none" }}
                            ref={textAreaRef}
                            placeholder="Enter Proof String"
                        ></textarea>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={withdraw}
                        disabled={withdrawButtonState === ButtonState.Disabled}
                    >
                        <span className="small">Withdraw 0.001 ETH</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
