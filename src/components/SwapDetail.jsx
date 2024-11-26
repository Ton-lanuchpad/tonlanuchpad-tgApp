import { useState } from "react";

export const SwapDetail = ({ inToken, outToken, minOut, ratio, inTokenPrice, outTokenPrice, slippage }) => {

    const [direction, setDirection] = useState(true);
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div className="mt-3" data-orientation="vertical">
                <div data-state="closed" data-orientation="vertical" className="w-full">
                    <h3 data-orientation="vertical" data-state="closed" className="flex justify-center">
                        <button onClick={() => setShowDetail(!showDetail)}
                            type="button" aria-controls="radix-:r4i:" aria-expanded="false" data-state="closed" data-orientation="vertical"
                            id="radix-:r4h:" className="flex transition-all [&amp;[data-state=open]>svg]:rotate-180 w-full" data-radix-collection-item="">
                            <div className="h-7 flex items-center justify-between w-full" >
                                {
                                    !showDetail ?
                                        <>
                                            <p className="font-normal typography-caption1 flex flex-1 items-center gap-[6px]">
                                                <svg width="20"
                                                    height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="20" height="20" rx="10" fill="rgb(var(--dynamic-green, 21 164 95))"></rect>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M14.3085 7.29809C14.6014 7.59098 14.6014 8.06586 14.3085 8.35875L9.35872 13.3085C9.06582 13.6014 8.59095 13.6014 8.29806 13.3085L5.46963 10.4801C5.17674 10.1872 5.17674 9.7123 5.46963 9.41941C5.76252 9.12652 6.2374 9.12652 6.53029 9.41941L8.82839 11.7175L13.2478 7.29809C13.5407 7.00519 14.0156 7.0052 14.3085 7.29809Z"
                                                        fill="white"></path>
                                                </svg>
                                                <button className="group flex items-center" type="button" onClick={() => setDirection(!direction)}>
                                                    <span className="inline-flex truncate items-center">1 {direction ? inToken : outToken} ≈&nbsp;
                                                        <span className="truncate">{direction ? ratio : (1 / ratio).toFixed(4)}</span>&nbsp;{direction ? outToken : inToken}
                                                        <span className="ml-[2px] text-textTertiary">
                                                            (
                                                            <span title={direction ? ratio.toString() : (1 / ratio).toString()}>
                                                                ${direction ? inTokenPrice : outTokenPrice}
                                                            </span>
                                                            )
                                                        </span>
                                                    </span>
                                                    <svg width="16" height="16"
                                                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                        className="animate-ui-element-transition mx-[2px] text-iconTertiary group-hover:text-accentHover">
                                                        <path
                                                            d="M11.0303 1.96967C10.7374 1.67678 10.2626 1.67678 9.96967 1.96967C9.67678 2.26256 9.67678 2.73744 9.96967 3.03033L10.6893 3.75H4C3.58579 3.75 3.25 4.08579 3.25 4.5C3.25 4.91421 3.58579 5.25 4 5.25L10.6893 5.25L9.96967 5.96967C9.67678 6.26256 9.67678 6.73744 9.96967 7.03033C10.2626 7.32322 10.7374 7.32322 11.0303 7.03033L13.0303 5.03033C13.171 4.88968 13.25 4.69891 13.25 4.5C13.25 4.30109 13.171 4.11032 13.0303 3.96967L11.0303 1.96967Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M12.5 10.75L5.31066 10.75L6.03033 10.0303C6.32322 9.73744 6.32322 9.26256 6.03033 8.96967C5.73744 8.67678 5.26256 8.67678 4.96967 8.96967L2.96967 10.9697C2.82902 11.1103 2.75 11.3011 2.75 11.5C2.75 11.6989 2.82902 11.8897 2.96967 12.0303L4.96967 14.0303C5.26256 14.3232 5.73744 14.3232 6.03033 14.0303C6.32322 13.7374 6.32322 13.2626 6.03033 12.9697L5.31066 12.25H12.5C12.9142 12.25 13.25 11.9142 13.25 11.5C13.25 11.0858 12.9142 10.75 12.5 10.75Z"
                                                            fill="currentColor"></path>
                                                    </svg>
                                                </button>
                                            </p>
                                            <svg width="10" height="24" viewBox="0 0 10 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" className="animate-ui-element-transition text-iconPrimary">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.63679 10.3636C9.98826 10.7151 9.98826 11.2849 9.63679 11.6364L5.63679 15.6364C5.28531 15.9878 4.71547 15.9878 4.36399 15.6364L0.363995 11.6364C0.0125226 11.2849 0.0125227 10.7151 0.363995 10.3636C0.715467 10.0121 1.28531 10.0121 1.63679 10.3636L5.00039 13.7272L8.36399 10.3636C8.71547 10.0121 9.28531 10.0121 9.63679 10.3636Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </>
                                        :
                                        <>
                                            <p className="font-normal typography-caption1 flex flex-1 items-center gap-[6px]">Swap details</p>
                                            <svg
                                                width="10" height="24" viewBox="0 0 10 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="animate-ui-element-transition text-iconPrimary transform rotate-180">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.63679 10.3636C9.98826 10.7151 9.98826 11.2849 9.63679 11.6364L5.63679 15.6364C5.28531 15.9878 4.71547 15.9878 4.36399 15.6364L0.363995 11.6364C0.0125226 11.2849 0.0125227 10.7151 0.363995 10.3636C0.715467 10.0121 1.28531 10.0121 1.63679 10.3636L5.00039 13.7272L8.36399 10.3636C8.71547 10.0121 9.28531 10.0121 9.63679 10.3636Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </>
                                }

                            </div>
                        </button>
                    </h3>
                    <div data-state="open" id="radix-:r4i:" hidden={!showDetail} role="region" aria-labelledby="radix-:r4h:"
                        data-orientation="vertical" className="accordian _accordion_1exf2_1 overflow-hidden transition-all"
                    >
                        <div className="w-full overflow-y-hidden">
                            <div className="flex flex-col gap-2 pt-3">
                                <div className="flex justify-between items-start gap-2">
                                    <span
                                        className="flex items-center gap-3 whitespace-nowrap">
                                        <p className="font-normal typography-caption1 truncate text-textTertiary">1 {inToken} price</p>
                                    </span>
                                    <span className="truncate">
                                        <p className="font-normal typography-caption1">
                                            <span
                                                className="inline-flex truncate items-center">≈&nbsp;
                                                <span
                                                    className="truncate">{ratio}</span>&nbsp;{outToken}
                                                <span
                                                    className="ml-[2px] text-textTertiary">(
                                                    <span
                                                        title="5.721906315288009">${inTokenPrice}</span>)
                                                </span>
                                            </span>
                                        </p>
                                    </span>
                                </div>
                                <div className="flex justify-between items-start gap-2"><span
                                    className="flex items-center gap-3 whitespace-nowrap">
                                    <p className="font-normal typography-caption1 truncate text-textTertiary">1 {outToken} price</p>
                                </span><span className="truncate">
                                        <p className="font-normal typography-caption1"><span
                                            className="inline-flex truncate items-center">≈&nbsp;<span
                                                className="truncate">{(1 / ratio).toFixed(4)}</span>&nbsp;{inToken}<span
                                                    className="ml-[2px] text-textTertiary">(<span
                                                        title="4.7490880294">${outTokenPrice}</span>)</span></span></p>
                                    </span></div>
                                <div className="flex justify-between items-start gap-2"><span
                                    className="flex items-center gap-3 whitespace-nowrap">
                                    <p className="font-normal typography-caption1 flex items-center truncate text-textTertiary">Max.
                                        slippage
                                        <button data-state="closed" className="inline-flex items-center">
                                            <svg width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="text-iconTertiary">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M12 19C15.5899 19 18.5 16.0899 18.5 12.5C18.5 8.91015 15.5899 6 12 6C8.41015 6 5.5 8.91015 5.5 12.5C5.5 16.0899 8.41015 19 12 19ZM12 8.49899C12.5523 8.49899 13 8.94671 13 9.49899C13 10.0513 12.5523 10.499 12 10.499C11.4477 10.499 11 10.0513 11 9.49899C11 8.9467 11.4477 8.49899 12 8.49899ZM12 11.6651C12.4142 11.6651 12.75 12.0009 12.75 12.4151V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V12.4151C11.25 12.0009 11.5858 11.6651 12 11.6651Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </button>
                                    </p>
                                </span><span className="truncate">
                                        <p className="font-normal typography-caption1 truncate"><span className="">{slippage}%</span></p>
                                    </span></div>
                                <div className="flex justify-between items-start gap-2"><span
                                    className="flex items-center gap-3 whitespace-nowrap">
                                    <p className="font-normal typography-caption1 flex items-center truncate text-textTertiary">Minimum
                                        received<button data-state="closed" className="inline-flex items-center"><svg width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="text-iconTertiary">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M12 19C15.5899 19 18.5 16.0899 18.5 12.5C18.5 8.91015 15.5899 6 12 6C8.41015 6 5.5 8.91015 5.5 12.5C5.5 16.0899 8.41015 19 12 19ZM12 8.49899C12.5523 8.49899 13 8.94671 13 9.49899C13 10.0513 12.5523 10.499 12 10.499C11.4477 10.499 11 10.0513 11 9.49899C11 8.9467 11.4477 8.49899 12 8.49899ZM12 11.6651C12.4142 11.6651 12.75 12.0009 12.75 12.4151V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V12.4151C11.25 12.0009 11.5858 11.6651 12 11.6651Z"
                                                fill="currentColor"></path>
                                        </svg></button></p>
                                </span>
                                    <span className="truncate">
                                        <p className="font-normal typography-caption1 truncate">{minOut} STON</p>
                                    </span>
                                </div>
                                <div className="flex justify-between items-start gap-2"><span
                                    className="flex items-center gap-3 whitespace-nowrap">
                                    <p className="font-normal typography-caption1 flex items-center truncate text-textTertiary">
                                        Price
                                        impact
                                        <button data-state="closed" className="inline-flex items-center">
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
                                        <p className="font-normal typography-caption1 truncate text-textPrimary"><span>&lt;0.01%</span></p>
                                    </span>
                                </div>
                                <div className="flex justify-between items-start gap-2">
                                    <span
                                        className="flex items-center gap-3 whitespace-nowrap">
                                        <p className="font-normal typography-caption1 truncate text-textTertiary">Blockchain fee</p>
                                    </span><span className="truncate">
                                        <p className="font-normal typography-caption1 truncate">0.065-0.265 TON</p>
                                    </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}