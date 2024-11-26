import { Address, beginCell } from "@ton/ton";

export interface PoolItem {
  poolAddress: string;
  token0Address: string;
  token1Address: string;
  token0Image: string;
  token0Symbol: string;
  token0USDPrice: number;
  token1Image: string;
  token1Symbol: string;
  token1USDPrice: number;
  farm: string;
  APR24: string;
  APR7d: string;
  APR30d: string;
  TVL: number;
  volume24: number;
  myLiquidity: string;
  lp_fee: string;
  reserve0: string;
  reserve1: string;
  tags?: string | '';
  routerAddress?: string | '';
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getJettonWalletAddress = async (
  client: any,
  ownerAddress: string,
  jettonMasterAddress: string
) => {
  const result = await client.runMethod(
    Address.parse(jettonMasterAddress),
    "get_wallet_address",
    [
      {
        type: "slice",
        cell: beginCell().storeAddress(Address.parse(ownerAddress)).endCell(),
      },
    ]
  );
  return result.stack.readAddress().toString();
};