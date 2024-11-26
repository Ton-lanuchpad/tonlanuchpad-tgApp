import { useTonConnect } from "../hooks/useTonConnect.ts";
import { PoolItem } from "../utils/utils.tsx";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the context value type
interface PoolContextType {
  poolData: PoolItem[];
  farmsLength: number;
  getPoolItemByAddress: (poolAddress: string) => PoolItem | undefined; // New function
}

// Create the context with an initial default value
const PoolContext = createContext<PoolContextType | undefined>(undefined);

// Custom hook to use the Pool context
export const usePoolContext = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("usePoolContext must be used within a PoolProvider");
  }
  return context;
};

// PoolProvider component
interface PoolProviderProps {
  children: ReactNode;
}

export const PoolProvider: React.FC<PoolProviderProps> = ({ children }) => {
  const { assetsList, poolList, farmList } = useTonConnect();
  const [farmsLength, setFarmsLength] = useState<number>(0);
  const [poolData, setPoolData] = useState<PoolItem[]>([]);

  useEffect(() => {
    let poolTempList: PoolItem[] = [];
    const farmsWithAPYLength = farmList.filter(
      (farm: {
        status: string; apy: string
      }) => parseFloat(farm.apy) > 0 && farm.status == "operational"
    ).length;
    setFarmsLength(farmsWithAPYLength);

    poolList.map((item: any) => {
      const poolAddress = item.address;
      const token0Address = item.token0_address;
      const token1Address = item.token1_address;

      const token0Data = assetsList.find(
        (asset: any) => asset.contract_address === token0Address
      );

      const token1Data = assetsList.find(
        (asset: any) => asset.contract_address === token1Address
      );

      let token0Image = "";
      let token0Symbol = "";
      let token0USDPrice = 0;
      let token1Image = "";
      let token1Symbol = "";
      let token1USDPrice = 0;

      if (token0Data && token1Data) {
        token0Image = token0Data.image_url;
        token0Symbol = token0Data.symbol;
        token0USDPrice = Number(token0Data.dex_usd_price);
        token1Image = token1Data.image_url;
        token1Symbol = token1Data.symbol;
        token1USDPrice = Number(token1Data.dex_usd_price);
      }

      const farmData = farmList.find(
        (farmlist: any) => farmlist.pool_address === poolAddress && farmlist.status == "operational"
      );
      let farm = "0.00";
      if (farmData) {
        farm = (parseFloat(farmData.apy) * 100).toFixed(2);
      }

      const APR24 = (parseFloat(item.apy_1d) * 100).toFixed(2);
      const APR7d = (parseFloat(item.apy_7d) * 100).toFixed(2);
      const APR30d = (parseFloat(item.apy_30d) * 100).toFixed(2);
      const TVL = parseInt(item.tvl);
      const volume24 = parseInt(item.volume_24h_usd);
      const myLiquidity = "0";
      const lp_fee = item.lp_fee;
      const reserve0 = item.reserve0;
      const reserve1 = item.reserve1;

      poolTempList.push({
        poolAddress,
        token0Address,
        token1Address,
        token0Image,
        token0Symbol,
        token0USDPrice,
        token1Symbol,
        token1Image,
        token1USDPrice,
        farm,
        APR24,
        APR7d,
        APR30d,
        TVL,
        volume24,
        myLiquidity,
        lp_fee,
        reserve0,
        reserve1,
      });
    });
    setPoolData(poolTempList);
  }, [assetsList, poolList, farmList]);

  // Function to get a pool item by address
  const getPoolItemByAddress = (poolAddress: string): PoolItem | undefined => {
    return poolData.find((pool) => pool.poolAddress === poolAddress);
  };

  return (
    <PoolContext.Provider
      value={{ poolData, farmsLength, getPoolItemByAddress }}
    >
      {children}
    </PoolContext.Provider>
  );
};
