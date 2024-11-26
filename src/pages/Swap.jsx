import React, { useContext, useState, useEffect } from "react"
import home from "../assets/commons/home.svg"
import ProgressBar from "../utils/ProgressBar"
import { UserDataContext } from "../Context/userData"
import WalletConnectBar from "../components/WalletConnectBar"
import ModalSwap from '../components/ModalSwap';
import { useTonConnectModal } from "@tonconnect/ui-react"
import { useTonConnect } from "../hooks/useTonConnect";
import { useTonClient } from "../hooks/useTonClient"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { beginCell } from '@ton/core';
import { toNano } from '@ton/core';
import { DEX, pTON } from '@ston-fi/sdk';
import { SwapDetail } from "../components/SwapDetail"
import { SwapConfirmDlg } from "../components/SwapConfirmDlg"

export default function Swap() {
    const { userPoints } = useContext(UserDataContext);
    const [fromToken, setFromToken] = useState("USDT");
    const [toToken, setToToken] = useState("TOKEN");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [inTokenAmount, setInTokenAmount] = useState(0);
    const [outTokenAmount, setOutTokenAmount] = useState(0);
    const [inTokenBalance, setInTokenBalance] = useState(0);
    const [inToken, setInToken] = useState("TON");
    const [inTokenAddress, setInTokenAddress] = useState("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");
    const [outTokenAddress, setOutTokenAddress] = useState("EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO");
    const [outToken, setOutToken] = useState("STON");
    const [outTokenBalance, setOutTokenBalance] = useState(0);
    const [inTokenDecimal, setInTokenDecimal] = useState(9);
    const [outTokenDecimal, setOutTokenDecimal] = useState(9);
    const [slippage, setSlippage] = useState(2.5);
    const [minOutAmount, setMinOutAmount] = useState(0);
    const walletModal = useTonConnectModal();
    const { assetsList, myPoolList, connected, address, simulateSwap, tonConnectUI } = useTonConnect();
    const { getTonBalance, getTokenBalance, tonClient } = useTonClient();
    const [isShowSwapConfirmDlg, setIsShowSwapConfirmDlg] = useState(false);
    const queryString = useLocation().search;
    const navigate = useNavigate();
    const [params, setParams] = useState({});
    const [skipEffect, setSkipEffect] = useState(false);
    const [priceImpact, setPriceImpact] = useState(5);
    const [inTokenLogo, setInTokenLogo] = useState("");
    const [outTokenLogo, setOutTokenLogo] = useState("");
    const [inTokenPrice, setInTokenPrice] = useState(0);
    const [outTokenPrice, setOutTokenPrice] = useState(0);
    const [isConfirmingTx, setIsConfirmingTx] = useState(false);
    const [selectInTokenDlg, setSelectInTokenDlg] = useState(true);
    const adminWallet = 'UQAEua9EjDUlArEgUIpXfKbOg4ITKv5NgnO6V130NkObuLKa';

    useEffect(() => {
        if (connected && address) {
            getAssetsBalance(fromToken);
            getAssetsBalance(toToken);
        }
    }, [connected, address, inToken, outToken]);

    useEffect(() => {
        const urlParams = new URLSearchParams(queryString);
        const paramsObj = {};
        urlParams.forEach((value, key) => {
            paramsObj[key] = value;
        });

        setParams(paramsObj);
        if (paramsObj.chartVisible === undefined || paramsObj.chartVisible === true) {
            navigate("/swap?chartVisible=false&ft=TON&tt=STON");
            setParams({ chatVisible: false, ft: "TON", tt: "STON" });
            return;
        }
        setInToken(paramsObj.ft ? paramsObj.ft : "TON");
        setOutToken(paramsObj.tt ? paramsObj.tt : "STON");
    }, []);

    useEffect(() => {
        if (skipEffect) return;

        for (const asset of assetsList) {
            if (asset.symbol !== inToken) continue;

            setInTokenLogo(asset.image_url);
            setInTokenDecimal(asset.decimals);
            setInTokenAddress(asset.contract_address);
            setInTokenPrice(Number(asset.dex_price_usd));
        }
    }, [outToken, assetsList]);

    useEffect(() => {
        if (skipEffect) return;

        for (const asset of assetsList) {
            if (asset.symbol !== outToken) continue;

            setOutTokenLogo(asset.image_url);
            setOutTokenDecimal(asset.decimals);
            setOutTokenAddress(asset.contract_address);
            setOutTokenPrice(Number(asset.dex_price_usd));
            break;
        }
    }, [toToken, assetsList]);

    const handleSelectToken = async (name, address) => {
        console.log("name", name);
        console.log("address", address);
        setSkipEffect(true);

        console.log("paramsObj select1", params);

        const paramsObj = Object.assign({}, params);

        const savedSelectAsset = localStorage.getItem('totalAssetList');
        let assetLocalList = [];
        if (savedSelectAsset)
            assetLocalList = JSON.parse(savedSelectAsset);

        let asset = null;
        if (assetLocalList.length !== 0)
            asset = assetLocalList.filter((item) => item.symbol == name)[0];
        else
            asset = assetsList.filter((item) => item.symbol == name)[0];

        console.log("selectInTokenDlg", selectInTokenDlg);
        if (asset === null || asset === undefined) {
            asset = await getSearchList(address);
        }
        console.log("asset:---------------------", asset);

        if (selectInTokenDlg) {
            setInToken(asset.meta.symbol);
            setInTokenDecimal(Number(asset.meta.decimals));
            setInTokenAddress(asset.contract_address);
            setInTokenAmount(0);
            setInTokenLogo(asset.meta.image_url);
            setInTokenBalance(
                Number(Number(Number(myPoolList && myPoolList[asset?.contract_address] ? myPoolList[asset?.contract_address] : "0") / 10 ** Number(asset?.meta.decimals)).toFixed(4))
            );
            setInTokenPrice(Number(asset.dex_price_usd ? asset.dex_price_usd : "0"));
            paramsObj.ft = name;
        } else {
            setOutToken(asset.meta.symbol);
            setOutTokenDecimal(Number(asset.meta.decimals));
            setOutTokenAddress(asset.contract_address);
            setOutTokenAmount(0);
            setOutTokenLogo(asset.meta.image_url);
            setOutTokenBalance(
                Number(Number(Number(myPoolList && myPoolList[asset?.contract_address] ? myPoolList[asset?.contract_address] : "0") / 10 ** Number(asset?.meta.decimals)).toFixed(4))
            );
            setOutTokenPrice(Number(asset.dex_price_usd ? asset.dex_price_usd : "0"));
            paramsObj.ft = name;
        }
        setIsModalOpen(false);

        console.log("paramsObj select", paramsObj);

        setParams(paramsObj);
        window.history.pushState(
            null,
            "",
            `/swap?chartVisible=false&ft=${paramsObj.ft}&tt=${paramsObj.tt}`
        );
        setSkipEffect(false);
    };

    const getOutputAmount = async (outTokenAddr, inTokenAddr, inAmount, slippage) => {
        let outAmount = 0;
        let minOutAmount = 0;

        try {
            const res = await simulateSwap(
                outTokenAddr,
                inTokenAddr,
                inAmount,
                slippage
            );
            outAmount = Number(res.ask_units);
            minOutAmount = Number(res.min_ask_units);
        } catch (e) { }
        if (outTokenAddr == outTokenAddress) {
            setOutTokenAmount(outAmount / 10 ** outTokenDecimal);
            setMinOutAmount(minOutAmount / 10 ** outTokenDecimal);
        } else {
            setInTokenAmount(outAmount / 10 ** inTokenDecimal);
            setMinOutAmount(minOutAmount / 10 ** inTokenDecimal);
        }
    };

    const handleInputAmount = (val) => {

        if (val === "" || /^[+-]?\d*\.?\d*$/.test(val)) {
            const amount = Number(val);
            setInTokenAmount(amount);

            const inAmount = BigInt(amount * 10 ** inTokenDecimal);
            getOutputAmount(
                outTokenAddress,
                inTokenAddress,
                inAmount.toString(),
                (slippage / 100).toString()
            );
        }
    };

    const handleOutputAmount = (val) => {

        if (val === "" || /^[+-]?\d*\.?\d*$/.test(val)) {
            const amount = Number(val);
            setOutTokenAmount(amount);

            const inAmount = BigInt(amount * 10 ** outTokenDecimal);
            getOutputAmount(
                inTokenAddress,
                outTokenAddress,
                inAmount.toString(),
                (slippage / 100).toString()
            );
        }
    };

    const swithInAndOut = async () => {
        setSkipEffect(true);
        const paramsObj = Object.assign({}, params);
        paramsObj.tt = params.ft;
        paramsObj.ft = params.tt;
        setParams(paramsObj);

        window.history.pushState(
            null,
            "",
            `/swap?chartVisible=false&ft=${params.tt}&tt=${params.ft}`
        );

        const tmpInToken = inToken;
        const tmpInTokenDecimal = inTokenDecimal;
        const tmpInTokenAddress = inTokenAddress;
        const tmpInTokenAmount = inTokenAmount;
        const tmpInTokenLogo = inTokenLogo;
        const tmpInTokenBalance = inTokenBalance;
        const tmpInTokenPrice = inTokenPrice;

        setInToken(outToken);
        setInTokenDecimal(outTokenDecimal);
        setInTokenAddress(outTokenAddress);
        setInTokenAmount(outTokenAmount);
        setInTokenLogo(outTokenLogo);
        setInTokenBalance(outTokenBalance);
        setInTokenPrice(outTokenPrice);

        setOutToken(tmpInToken);
        setOutTokenDecimal(tmpInTokenDecimal);
        setOutTokenAddress(tmpInTokenAddress);
        setOutTokenAmount(tmpInTokenAmount);
        setOutTokenLogo(tmpInTokenLogo);
        setOutTokenBalance(tmpInTokenBalance);
        setOutTokenPrice(tmpInTokenPrice);

        setSkipEffect(false);
    };

    const handleSwap = async () => {
        if (!connected) {
            walletModal.open();
            return;
        }

        setIsShowSwapConfirmDlg(true);
    };

    const handleTokenClick = (field) => {
        setActiveField(field);
        setIsModalOpen(true);
    };


    const getAssetsBalance = async (asset) => {
        let balance = 0;

        if (asset === "TON") {
            balance = await getTonBalance(address);
        } else {
            balance = await getTokenBalance(address, asset);
        }

        if (asset === fromToken) setInTokenBalance(balance);
        if (asset === toToken) setOutTokenBalance(balance);

        return balance;
    };

    const confirmSwap = async () => {
        setIsConfirmingTx(true);

        // const router = tonClient.open(new DEX.v1.Router());
        const router = tonClient.open(
            DEX.v2_1.Router.create(
                "EQDQ6j53q21HuZtw6oclm7z4LU2cG6S2OKvpSSMH548d7kJT" // CPI Router v2.1.0
            )
        );

        const proxyTon = await pTON.v2_1.create(
            "EQBnGWMCf3-FZZq1W4IWcWiGAc3PHuZ0_H-7sad2oY00o83S" // pTON v2.1.0
            // "EQACS30DNoUQ7NfApPvzh7eBmSZ9L4ygJ-lkNWtba8TQT1h7" // pTON v2.1.0
        );

        console.log({ address, inTokenAmount, outTokenAddress })

        console.log("inputAddress:", inTokenAddress)
        console.log("outputAddress:", outTokenAddress);
        console.log("inAmout:", inTokenAmount);

        let txParams;
        // let amount = 0.1;
        const body = beginCell()
            .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
            .storeStringTail(
                `Swap Fee`
            ) // write our text comment
            .endCell();


        if (inTokenAddress === 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c') {
            //  ton -> jetton
            // amount = 0.185 * 0.01;
            txParams = await router.getSwapTonToJettonTxParams({
                userWalletAddress: address, // ! replace with your address
                proxyTon: proxyTon,
                offerAmount: toNano(inTokenAmount.toString()),
                askJettonAddress: outTokenAddress, // TestRED
                minAskAmount: toNano("0.1"),
                queryId: 12345,
            });

        } else if (outTokenAddress === 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c') {
            //  jetton -> ton
            // amount = 0.125 * 0.01;
            console.log("jetton------>ton");
            txParams = await router.getSwapJettonToTonTxParams({
                userWalletAddress: address, // ! replace with your address
                offerJettonAddress: inTokenAddress, // TestRED
                offerAmount: toNano(inTokenAmount.toString()),
                minAskAmount: toNano("0.05"),
                proxyTon,
            });

        } else {
            //  jetton -> jetton
            // amount = 0.175 * 0.01;
            console.log("jetton------>ton");
            txParams = await router.getSwapJettonToJettonTxParams({
                userWalletAddress: address, // ! replace with your address
                offerJettonAddress: inTokenAddress, // TesREED
                offerAmount: toNano(inTokenAmount.toString()),
                askJettonAddress: outTokenAddress, // TestBlue
                minAskAmount: toNano("0.1"),
            });
        }

        const feeInst = {
            address: adminWallet, // destination address
            amount: toNano(0.1).toString(), //Toncoin in nanotons
            payload: body.toBoc().toString("base64"),
        };

        const swapInst = {
            address: txParams.to.toString(),
            amount: txParams.value.toString(),
            payload: txParams.body?.toBoc().toString("base64"),
        };

        await tonConnectUI.sendTransaction({
            validUntil: Date.now() + 1000000,
            messages: [
                feeInst, swapInst
            ],
        });

        setIsConfirmingTx(false);
    }

    const getSearchList = async (selecttoken) => {
        const res = await axios.post("https://rpc.ston.fi", {
            "jsonrpc": "2.0",
            "id": 3,
            "method": "asset.search",
            "params": {
                "search_string": selecttoken,
                "condition": "!blacklisted | (blacklisted & wallet_has_balance)",
                "limit": 50
            }
        });

        const assets = res.data.result.assets;
        return assets[0];
    };
    console.log("inToken", inToken);
    console.log("outToken", outToken);

    return <>
        <div className="w-[100%] sm:w-[100%] md:w-[390px] min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden" style={{ backgroundImage: `url(${home})` }}>
            <div className="flex flex-col justify-center items-center text-white w-[100%]">
                <WalletConnectBar />
                <div className="w-[349px] h-[153px] mt-5">
                    <div className="flex flex-col w-[100%] justify-center items-center">
                        <p className="text-[16px] font-[700] tracking-[3px]">TOTAL REWARD BALANCE</p>
                        <p className="text-[42px] font-bold tracking-[3px] z-1">{userPoints.toLocaleString()}</p>
                        <div className="absolute bottom-9 light-container">
                            <div className="light left-light"></div>
                            <div className="light right-light"></div>
                            <div className="glow-shadow"></div>
                        </div>
                    </div>
                    <hr className="flex-grow h-[1px] bg-[#24467E] mb-3" />
                    <div className="w-[100%] h-[30px] flex justify-between items-center">
                        <div className="flex justify-center items-center gap-1">
                            <p className="text-[12px] text-[#019aed] font-[700] tracking-[3px]">Rank</p>
                            <span className="text-[14px]">32123</span>
                        </div>
                        <div className="h-[20px] flex justify-center items-center gap-2">
                            <p className="text-[12px] text-white font-[700] tracking-[3px]">To Next Rank</p>
                            <ProgressBar active={6} />
                        </div>
                    </div>
                    <hr className="flex-grow h-[1px] bg-[#24467E] mt-3" />
                </div>
                <div className="flex flex-col justify-start items-start mt-5 w-[349px]">
                    <span className="font-[700] text-[16px] mb-3 bg-gradient-to-r from-[#019aed] to-[#00f2fe] bg-clip-text text-transparent">Swap Tokens</span>
                    <div className="w-full backdrop-blur-md bg-[#0f21334d] border border-[#24467E6c] rounded-xl p-6 shadow-2xl">
                        <div className="relative">
                            <input
                                type="number"
                                placeholder={`Enter ${fromToken} amount`}
                                value={inTokenAmount}
                                data-invalid={!connected}
                                onChange={(e) => handleInputAmount(e.target.value)}
                                className="w-full px-4 py-4 rounded-xl text-[16px] font-[400] tracking-[3px] bg-[#ffffff0a] outline-none border border-[#ffffff1a] focus:border-[#019aed] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#019aed] font-bold cursor-pointer hover:opacity-80"
                                onClick={() => { handleTokenClick('from'), setSelectInTokenDlg(true) }}
                            >
                                {inToken}
                            </span>
                        </div>

                        <div className="flex justify-center my-4">
                            <div
                                className="bg-gradient-to-r from-[#019aed] to-[#00f2fe] p-3 rounded-full cursor-pointer hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-[#019aed]/50"
                                onClick={swithInAndOut}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: 'rotate(90deg)' }}
                                >
                                    <path
                                        d="M17 4L20 7M20 7L17 10M20 7H8M7 14L4 17M4 17L7 20M4 17H16"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                placeholder={`You will receive ${toToken}`}
                                value={outTokenAmount}
                                onChange={(e) => handleOutputAmount(e.target.value)}
                                className="w-full px-4 py-4 rounded-xl text-[16px] font-[400] tracking-[3px] bg-[#ffffff0a] outline-none border border-[#ffffff1a] focus:border-[#019aed] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#019aed] font-bold cursor-pointer hover:opacity-80"
                                onClick={() => { handleTokenClick('to'), setSelectInTokenDlg(false) }}
                            >
                                {outToken}
                            </span>
                        </div>
                        {inTokenAmount != 0 ? (
                            <SwapDetail
                                inToken={inToken}
                                outToken={outToken}
                                minOut={Number(minOutAmount.toFixed(4))}
                                ratio={Number((outTokenAmount / inTokenAmount).toFixed(4))}
                                inTokenPrice={Number(inTokenPrice.toFixed(4))}
                                outTokenPrice={Number(outTokenPrice.toFixed(4))}
                                slippage={slippage}
                            />
                        ) : (
                            ""
                        )}
                        {inTokenAmount !== 0 ? (
                            <button
                                onClick={handleSwap}
                                className="w-full bg-gradient-to-r from-[#019aed] to-[#00f2fe] text-white font-bold py-4 rounded-xl mt-6 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-[#019aed]/50"
                            >
                                {connected ? "Swap" : "Connect Wallet"}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full bg-gray-500 text-gray-300 font-bold py-4 rounded-xl mt-6 cursor-not-allowed opacity-50"
                            >
                                Enter an amount
                            </button>
                        )}
                    </div>
                </div>
                <div className="h-[100px]" />
            </div>
        </div>
        <ModalSwap
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectToken={handleSelectToken}
        />
        <SwapConfirmDlg
            closeDialog={() => setIsShowSwapConfirmDlg(false)}
            confirmSwap={confirmSwap}
            isConfirmingTx={isConfirmingTx}
            showDialog={isShowSwapConfirmDlg}
            inToken={inToken}
            inTokenLogo={inTokenLogo}
            inTokenAmount={inTokenAmount}
            inTokenPrice={inTokenPrice}
            outToken={outToken}
            outTokenLogo={outTokenLogo}
            outTokenAmount={outTokenAmount}
            outTokenPrice={outTokenPrice}
            ratio={inTokenAmount / outTokenAmount}
            slippage={slippage}
            minOut={minOutAmount}
            priceImpact={priceImpact}
            fee={"0.065-0.265 TON"}
        />
    </>
}
