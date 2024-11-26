import React from 'react';
import ton from "../assets/commons/ton.svg"
import { TonConnectButton } from '@tonconnect/ui-react';

export default function WalletConnectBar() {
    return (
        <div className="flex justify-around items-center w-[389px] h-[60px] mt-7 mb-2">
            <div className="w-[166.25px] h-[40px] flex items-center gap-2">
                <div className="w-[39.96px] h-[40px] bg-[#019AED] rounded-full flex justify-center items-center">
                    <img src={ton} alt="ton" className="w-[22.29px] h-[28.54px] object-contain" />
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] font-extrabold leading-[24px]">TON</p>
                    <p className="text-[15px] font-[400] tracking-[5px] uppercase">Launchpad</p>
                </div>
            </div>
            <div className="w-[127px] h-[40px] bg-[#019AED] rounded-lg flex justify-center items-center gap-2">
                <TonConnectButton />
            </div>
        </div>
    )
}
