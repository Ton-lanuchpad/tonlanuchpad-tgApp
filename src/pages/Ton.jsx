import React, { useContext } from "react"
import ProgressBar from "../utils/ProgressBar"
import launchpad from "../assets/commons/launchpadbg.svg"
import WalletConnectBar from "../components/WalletConnectBar"
import { UserDataContext } from "../Context/userData";
import { useTonAddress } from "@tonconnect/ui-react";
export default function Ton() {
    const userFriendlyAddress = useTonAddress();
    const { userPoints } = useContext(UserDataContext);
    const inputStyle = {
        backgroundImage: 'linear-gradient(to bottom right, #0f21336c, #252f406c)',
        border: '1px solid #24467E6c'
    };

    const commonInputClasses = "w-full px-4 py-3 rounded-lg text-[16px] font-[400] tracking-[3px] bg-[#0f21336c] bg-opacity-50 outline-none";

    const ProjectForm = () => (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-[339px] flex justify-start items-center mt-3">
                <span className="text-[20px] font-[600] tracking-[3px]">Create Project</span>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[339px] mt-6">
                <input
                    type="text"
                    name="tokenName"
                    placeholder="Token Name"
                    className={commonInputClasses}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="tokenSymbol"
                    placeholder="Token Symbol"
                    className={commonInputClasses}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="tokenSupply"
                    placeholder="Total Supply"
                    className={commonInputClasses}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="decimals"
                    placeholder="Decimals"
                    className={commonInputClasses}
                    style={inputStyle}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className={commonInputClasses}
                    style={inputStyle}
                />

                <div className="relative">
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 bg-gradient-to-br from-[#0f21336c] to-[#252f406c] border-[1px] border-[#24467E6c] px-4 py-3 rounded-lg text-[16px] font-[400] tracking-[3px] w-full">
                        Upload Logo
                    </div>
                </div>

                <button
                    className="w-full mt-4 px-4 py-3 rounded-lg text-[16px] font-[500] tracking-[3px] text-white
                             bg-gradient-to-r from-[#24467E] to-[#524B9E] hover:from-[#2a508f] hover:to-[#5d54b0]
                             transition-all duration-300 border border-[#24467E] shadow-lg"
                >
                    Create Project
                </button>
            </div>
        </div>
    );

    return (
        <div className={`w-[100%] sm:w-[100%] md:w-[390px] min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden ${!userFriendlyAddress && 'overflow-hidden'} ${!userFriendlyAddress && 'h-[90vh]'}`}
            style={{ backgroundImage: `url(${launchpad})` }}>
            <div className="flex flex-col justify-center items-center text-white w-[100%]">
                <WalletConnectBar />
                <div className="w-[349px] h-[153px] mt-5">
                    <div className="flex flex-col w-[100%] justify-center items-center">
                        <p className="text-[16px] font-[700] tracking-[3px]">TOTAL REWARD BALANCE</p>
                        <p className="text-[42px] font-bold tracking-[3px] z-10">{userPoints.toLocaleString()}</p>
                        <div className="absolute bottom-9 light-container">
                            <div className="light left-light"></div>
                            <div className="light right-light"></div>
                            <div className="glow-shadow"></div>
                        </div>
                    </div>
                    <hr className="flex-grow h-[1px] bg-[#24467E] mb-3" />
                    <div className=" w-[100%] h-[30px] flex justify-between items-center">
                        <div className="flex justify-center items-center gap-1">
                            <p className="text-[12px] text-[#019aed] font-[700] tracking-[3px]">Rank</p> <span className="text-[14px]">32123</span>
                        </div>
                        <div className="h-[20px] flex justify-center items-center gap-2">
                            <p className="text-[12px] text-white font-[700] tracking-[3px]">To Next Rank</p>
                            <ProgressBar active={6} />
                        </div>
                    </div>
                    <hr className="flex-grow h-[1px] bg-[#24467E] mt-3" />

                </div>

                {!userFriendlyAddress ? (
                    <div className="flex flex-col justify-center items-center w-full relative">
                        <div className="filter blur-sm brightness-50 pointer-events-none">
                            <ProjectForm />
                        </div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[90%]">
                            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0f2133] to-[#252f40] border-2 border-[#24467E] rounded-xl mx-auto backdrop-blur-md shadow-2xl">
                                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#24467E] to-[#524B9E] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <p className="text-[24px] font-[600] tracking-[2px] text-white mb-3">
                                    Connect Wallet
                                </p>
                                <p className="text-[16px] font-[400] tracking-[1px] text-gray-300 text-center leading-relaxed">
                                    Please connect your TON wallet to create and manage projects
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ProjectForm />
                )}
                <div className="h-[100px]" />
            </div>
        </div>
    );
}
