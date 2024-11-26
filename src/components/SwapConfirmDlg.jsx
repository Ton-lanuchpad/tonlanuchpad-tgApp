

export const SwapConfirmDlg = ({
    showDialog,
    closeDialog,
    confirmSwap,
    isConfirmingTx,
    inToken,
    inTokenLogo,
    inTokenAmount,
    inTokenPrice,
    outToken,
    outTokenLogo,
    outTokenAmount,
    outTokenPrice,
    ratio,
    slippage,
    minOut,
    priceImpact,
    fee
}) => {

    if (!showDialog) {
        return null;
    }

    return (
        <>
            <div data-state="open"
                className="z-[2] fixed inset-0 bg-black/[0.6] cursor-pointer data-[state=open]:animate-[modal-desktop-overlay-show_300ms_ease-out] data-[state=closed]:animate-[modal-desktop-overlay-hide_300ms_ease-out]">
                <div role="dialog" id="radix-:rkd:" aria-describedby="radix-:rkf:" aria-labelledby="radix-:rke:" data-state="open"
                    className="swapconfirm_dlg flex flex-col bg-backgroundModal rounded-xl outline-none w-full max-w-[500px] fixed m-auto top-1/2 left-0 right-0 -translate-y-1/2 data-[state=open]:animate-[modal-desktop-content-show_300ms_ease-out] data-[state=closed]:animate-[modal-desktop-content-hide_300ms_ease-out] sm:max-md:h-[100vh]"
                >
                    <div className="flex flex-col flex-1 p-6 overflow-x-hidden overflow-y-auto">
                        {
                            isConfirmingTx ?
                                <div className="bg-white p-5 rounded-[20px] flex flex-col items-center justify-center flex-1 overflow-auto sm:-mx-4 md:-mx-6 sm:px-4 md:px-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    <svg
                                        width="56" height="56" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className="animate-[spin_1s_steps(8)_infinite] inline-block mb-5 text-buttonPrimary">
                                        <g id="16/Loader">
                                            <path id="Vector 1692" opacity="0.1" d="M8 2L8 3.5" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1698" opacity="0.9" d="M8 12.5L8 14" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1703" d="M3.75732 3.75735L4.81798 4.81801" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1704" opacity="0.7" d="M11.182 11.182L12.2427 12.2426" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1699" opacity="0.5" d="M14 8L12.5 8" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1700" d="M3.5 8L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round"></path>
                                            <path id="Vector 1701" opacity="0.3" d="M12.2427 3.75735L11.182 4.81801" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path id="Vector 1702" d="M4.81799 11.182L3.75733 12.2426" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg>
                                    <h4 className="mb-3 font-bold text-center text-[20px]">Confirm transaction in your wallet</h4>
                                    <p className="font-normal text-center text-[16px]">Swap {inTokenAmount} {inToken} to {outTokenAmount} {outToken}</p>
                                </div>
                                :
                                <div className="bg-white p-5 rounded-[20px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    <div>
                                        <h4 id="radix-:rke:" className="font-extrabold text-[32px] min-h-[3.2rem] mb-5 md:mb-6">Confirm swap</h4>
                                    </div>
                                    <div className="flex flex-col overflow-auto sm:-mx-4 md:-mx-6 sm:px-4 md:px-6">
                                        <div className="flex justify-between gap-6">
                                            <p className="font-normal typography-caption1 text-textTertiary">You send</p>
                                            <p className="font-normal typography-caption1 text-textTertiary"><span title="58.35894873186">${(inTokenAmount * inTokenPrice).toFixed(2)}</span>
                                            </p>
                                        </div>
                                        <div className="mt-2 flex max-h-7 items-center gap-[6px]">
                                            <img loading="lazy" className="w-6 h-6 rounded-full token-logo"
                                                src={inTokenLogo}
                                            />
                                            <h3 className="font-medium typography-h3">{inToken}</h3>
                                            <h3 className="ml-auto font-bold truncate typography-h3">{inTokenAmount}</h3>
                                        </div>
                                        <div className="shrink-0 bg-stroke h-[1px] w-full my-4"></div>
                                        <div className="flex justify-between gap-6">
                                            <p className="font-normal typography-caption1 text-textTertiary">You receive</p>
                                            <p className="font-normal typography-caption1 text-textTertiary"><span
                                                title="57.680990965255994">${(outTokenAmount * outTokenPrice).toFixed(2)}</span></p>
                                        </div>
                                        <div className="mt-2 flex max-h-7 items-center gap-[6px]">
                                            <img loading="lazy" className="w-6 h-6 rounded-full token-logo"
                                                src={outTokenLogo} />
                                            <h3 className="font-medium typography-h3">{outToken}</h3>
                                            <h3 className="ml-auto font-bold truncate typography-h3">{outTokenAmount}</h3>
                                        </div>
                                        <div className="shrink-0 bg-stroke h-[1px] w-full my-5"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-2"><span
                                                className="flex items-center gap-3 whitespace-nowrap">
                                                <p className="flex items-center font-normal truncate typography-caption1 text-textTertiary">Rate</p>
                                            </span><span className="truncate">
                                                    <p className="font-normal typography-caption1"><button className="flex items-center group"
                                                        type="button">
                                                        <span className="inline-flex items-center truncate">1 {outToken} ≈&nbsp;
                                                            <span
                                                                className="truncate">{ratio.toFixed(4)}</span>&nbsp;{inToken}
                                                            <span
                                                                className="ml-[2px] text-textTertiary">(<span
                                                                    title="1.01158359624">${outTokenPrice.toFixed(4)}</span>)</span>
                                                        </span>
                                                        <svg width="16" height="16"
                                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                            className="animate-ui-element-transition mx-[2px] text-iconTertiary group-hover:text-accentHover !hidden">
                                                            <path
                                                                d="M11.0303 1.96967C10.7374 1.67678 10.2626 1.67678 9.96967 1.96967C9.67678 2.26256 9.67678 2.73744 9.96967 3.03033L10.6893 3.75H4C3.58579 3.75 3.25 4.08579 3.25 4.5C3.25 4.91421 3.58579 5.25 4 5.25L10.6893 5.25L9.96967 5.96967C9.67678 6.26256 9.67678 6.73744 9.96967 7.03033C10.2626 7.32322 10.7374 7.32322 11.0303 7.03033L13.0303 5.03033C13.171 4.88968 13.25 4.69891 13.25 4.5C13.25 4.30109 13.171 4.11032 13.0303 3.96967L11.0303 1.96967Z"
                                                                fill="currentColor"></path>
                                                            <path
                                                                d="M12.5 10.75L5.31066 10.75L6.03033 10.0303C6.32322 9.73744 6.32322 9.26256 6.03033 8.96967C5.73744 8.67678 5.26256 8.67678 4.96967 8.96967L2.96967 10.9697C2.82902 11.1103 2.75 11.3011 2.75 11.5C2.75 11.6989 2.82902 11.8897 2.96967 12.0303L4.96967 14.0303C5.26256 14.3232 5.73744 14.3232 6.03033 14.0303C6.32322 13.7374 6.32322 13.2626 6.03033 12.9697L5.31066 12.25H12.5C12.9142 12.25 13.25 11.9142 13.25 11.5C13.25 11.0858 12.9142 10.75 12.5 10.75Z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                    </button>
                                                    </p>
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="flex items-center gap-3 whitespace-nowrap">
                                                    <p className="flex items-center font-normal truncate typography-caption1 text-textTertiary">Max.
                                                        slippage<button data-state="closed" className="inline-flex items-center">
                                                            <svg width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                className="text-iconTertiary">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M12 19C15.5899 19 18.5 16.0899 18.5 12.5C18.5 8.91015 15.5899 6 12 6C8.41015 6 5.5 8.91015 5.5 12.5C5.5 16.0899 8.41015 19 12 19ZM12 8.49899C12.5523 8.49899 13 8.94671 13 9.49899C13 10.0513 12.5523 10.499 12 10.499C11.4477 10.499 11 10.0513 11 9.49899C11 8.9467 11.4477 8.49899 12 8.49899ZM12 11.6651C12.4142 11.6651 12.75 12.0009 12.75 12.4151V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V12.4151C11.25 12.0009 11.5858 11.6651 12 11.6651Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </button>
                                                    </p>
                                                </span>
                                                <span className="truncate">
                                                    <p className="font-normal truncate typography-caption1"><span className="">{slippage}%</span></p>
                                                </span></div>
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="flex items-center gap-3 whitespace-nowrap">
                                                    <p className="flex items-center font-normal truncate typography-caption1 text-textTertiary">Minimum
                                                        received<button data-state="closed" className="inline-flex items-center">
                                                            <svg width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                className="text-iconTertiary">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M12 19C15.5899 19 18.5 16.0899 18.5 12.5C18.5 8.91015 15.5899 6 12 6C8.41015 6 5.5 8.91015 5.5 12.5C5.5 16.0899 8.41015 19 12 19ZM12 8.49899C12.5523 8.49899 13 8.94671 13 9.49899C13 10.0513 12.5523 10.499 12 10.499C11.4477 10.499 11 10.0513 11 9.49899C11 8.9467 11.4477 8.49899 12 8.49899ZM12 11.6651C12.4142 11.6651 12.75 12.0009 12.75 12.4151V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V12.4151C11.25 12.0009 11.5858 11.6651 12 11.6651Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </button>
                                                    </p>
                                                </span>
                                                <span className="truncate">
                                                    <p className="font-normal truncate typography-caption1">{minOut} {outToken}</p>
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="flex items-center gap-3 whitespace-nowrap">
                                                    <p className="flex items-center font-normal truncate typography-caption1 text-textTertiary">Price
                                                        impact<button data-state="closed" className="inline-flex items-center">
                                                            <svg width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                className="text-iconTertiary">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M12 19C15.5899 19 18.5 16.0899 18.5 12.5C18.5 8.91015 15.5899 6 12 6C8.41015 6 5.5 8.91015 5.5 12.5C5.5 16.0899 8.41015 19 12 19ZM12 8.49899C12.5523 8.49899 13 8.94671 13 9.49899C13 10.0513 12.5523 10.499 12 10.499C11.4477 10.499 11 10.0513 11 9.49899C11 8.9467 11.4477 8.49899 12 8.49899ZM12 11.6651C12.4142 11.6651 12.75 12.0009 12.75 12.4151V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V12.4151C11.25 12.0009 11.5858 11.6651 12 11.6651Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </button>
                                                    </p>
                                                </span>
                                                <span className="truncate">
                                                    <p className="font-normal truncate typography-caption1 text-textPrimary"><span>&lt;{priceImpact}%</span></p>
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="flex items-center gap-3 whitespace-nowrap">
                                                    <p className="font-normal truncate typography-caption1 text-textTertiary">Blockchain fee</p>
                                                </span>
                                                <span className="truncate">
                                                    <p className="font-normal truncate typography-caption1">{fee}</p>
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="flex items-center gap-3 whitespace-nowrap">
                                                    <p className="font-normal truncate typography-caption1 text-textTertiary">Route</p>
                                                </span>
                                                <span className="truncate">
                                                    <p className="font-normal truncate typography-caption1">{inToken} › {outToken}</p>
                                                </span></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-5 mt-auto md:gap-3 md:pt-6">
                                        <button
                                            onClick={confirmSwap}
                                            className="animate-ui-element-transition bg-sky-500 text-white px-[24px] rounded-[16px] h-[56px] whitespace-nowrap flex items-center justify-center flex-1">
                                            <p className="font-medium typography-button1 truncate inline-flex items-center justify-center gap-[8px]">
                                                Confirm swap</p>
                                        </button>
                                    </div>
                                </div>
                        }

                    </div>
                    <button onClick={closeDialog} className="absolute right-[-30px] top-2 box-content rounded-full bg-white/[.12] px-[10px] py-[5px] text-white" >
                        ✕
                    </button>
                </div>
            </div>

        </>

    );
}