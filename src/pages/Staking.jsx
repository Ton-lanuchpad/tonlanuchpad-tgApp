import launchpad from "../assets/commons/launchpadbg.svg"
import WalletConnectBar from "../components/WalletConnectBar";
import ProgressBar from "../utils/ProgressBar";
import { UserDataContext } from "../Context/userData";
import { useContext } from "react";

export default function Staking() {
    const { userPoints } = useContext(UserDataContext);
    const inputStyle = {
        backgroundImage: 'linear-gradient(to bottom right, #0f21336c, #252f406c)',
        border: '1px solid #24467E6c'
    };

    const commonInputClasses = "w-full px-4 py-3 rounded-lg text-[16px] font-[400] tracking-[3px] bg-[#0f21336c] bg-opacity-50 outline-none";

    return (
        <div className={`w-[100%] sm:w-[100%] md:w-[390px] min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden `}
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
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-full max-w-[339px] flex justify-center items-center mt-3">
                        <span className="text-[20px] font-[600] tracking-[3px]">Coming Soon</span>
                    </div> 
                </div>
                <div className="h-[100px]" />
            </div>
        </div>
    );
} 