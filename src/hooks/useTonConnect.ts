import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
// import { Address, Sender, SenderArguments } from '@ton/core';
import { Sender, SenderArguments } from '@ton/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Address } from "@ton/ton";
// import { NETWORK } from '@src/config';
import { useTonClient } from './useTonClient';

interface assetType {
  blacklisted: boolean;
  community: boolean;
  contract_address: string;
  decimals: number;
  default_list: boolean;
  default_symbol: boolean;
  deprecated: boolean;
  dex_price_usd: string;
  dex_usd_price: string;
  display_name: string;
  image_url: string;
  kind: string;
  priority: number;
  symbol: string;
  tags: string[];
  taxable: boolean;
  third_party_price_usd: string;
  third_party_usd_price: string;
}

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  address: string;
  tonConnectUI: any;
  routerList: any;
  assetsList: any;
  assetsSelectList: any;
  poolList: any;
  marketList: any;
  farmList: any;
  assetsInfo: any;
  stakedList: any[];
  myPoolList: any[];
  simulateSwap: (ask_address: string, offer_address: string, offer_units: string, slippage: string) => Promise<any>;
  simulateDeposit: (router_address: string, slippage: string, token_a: string, token_a_units: string, token_b: string) => Promise<any>;
  simulateLiquidity: (router_address: string, slippage: string, token_a: string, token_a_units: string, token_b: string) => Promise<any>;
  getAssetsInfo: (assetsList: string[]) => Promise<any>;
  getMyPoolList: () => Promise<any[]>
  getMyPoolInfo: (pool_address: string) => Promise<any>
} {

  const { getTonBalance } = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [routerList, setRouterList] = useState<any[]>([]);
  const [assetsList, setAssetsList] = useState<any[]>([]);
  const [assetsSelectList, setAssetsSelectList] = useState<any[]>([]);
  const [assetsInfo, setAssetsInfo] = useState<any[]>([]);
  const [poolList, setPoolList] = useState<any[]>([]);
  const [myPoolList, setMyPoolList] = useState<any[]>([]);
  const [marketList, setMarketList] = useState<any[]>([]);
  const [farmList, setFarmList] = useState<any[]>([]);
  const [stakedList, setStakedList] = useState<any[]>([]);

  // Save data to localStorage

  const saveToLocalStorageItem = (key: string, data: any[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // const saveToLocalStorage = () => {
  //   localStorage.setItem('routerList', JSON.stringify(routerList));
  //   localStorage.setItem('assetsList', JSON.stringify(assetsList));
  //   localStorage.setItem('poolList', JSON.stringify(poolList));
  //   localStorage.setItem('marketList', JSON.stringify(marketList));
  //   localStorage.setItem('farmList', JSON.stringify(farmList));
  // };

  // Retrieve data from localStoragea
  const loadFromLocalStorage = () => {

    const savedRouter = localStorage.getItem('routerList');

    if (savedRouter) {
      setRouterList(JSON.parse(savedRouter));
    } else {
      getRouterList();
    }

    const savedAsset = localStorage.getItem('assetsList');

    if (savedAsset) {
      setAssetsList(JSON.parse(savedAsset));
    } else {
      getAssetsList();
    }
    const savedSelectAsset = localStorage.getItem('assetsSelectList');

    if (savedSelectAsset) {
      setAssetsList(JSON.parse(savedSelectAsset));
    } else {
      getAssetsSelectList();
    }

    const savedPool = localStorage.getItem('poolList');

    if (savedPool) {
      setPoolList(JSON.parse(savedPool));
    } else {
      getPoolList();
    }


    const savedMarket = localStorage.getItem('marketList');

    if (savedMarket) {
      setMarketList(JSON.parse(savedMarket));
    } else {
      getMarketList();
    }

    const savedFarm = localStorage.getItem('farmList');

    if (savedFarm) {
      setFarmList(JSON.parse(savedFarm));
    } else {
      getFarmList();
    }
  };

  const simulateSwap = async (ask_address: string, offer_address: string, offer_units: string, slippage: string) => {
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "dex.simulate_swap",
        "params": {
          "ask_address": ask_address,
          "offer_address": offer_address,
          "offer_units": offer_units,
          "slippage_tolerance": slippage,
        }
      }
    );

    console.log("simulateSwap:", res);

    return res.data.result;
  }

  const simulateDeposit = async (router_address: string, slippage: string, token_a: string, token_a_units: string, token_b: string) => {

    console.log("simulateDeposit:", { router_address, slippage, token_a, token_a_units, token_b })
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "dex.simulate_deposit",
        "params": {
          "router_address": router_address,
          "slippage_tolerance": slippage,
          "token_a": token_a, //"EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez",
          "token_a_units": token_a_units,
          "token_b": token_b,
          "wallet_address": wallet?.account.address
        }
      }
    );

    console.log("simulateDeposit:", res);

    return res;
  }

  const simulateLiquidity = async (router_address: string, slippage: string, token_a: string, token_a_units: string, token_b: string) => {

    console.log("simulateLiquidity-1:", { router_address, slippage, token_a, token_a_units, token_b })
    console.log("walletAddress:", Address.parse(wallet?.account.address).toString());
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "dex.simulate_liquidity_provision",
        "params": {
          "provision_type": 'Balanced',
          "router_address": router_address,
          "slippage_tolerance": slippage,
          "token_a": token_a, //"EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez",
          "token_a_units": token_a_units,
          "token_b": token_b,
          "wallet_address": Address.parse(wallet?.account.address).toString()
        }
      }
    );

    console.log("simulateLiquidity-2:", res);

    return res;
  }


  const getRouterList = async () => {

    if (routerList.length) {
      return;
    }

    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "router.list",
        "params": {
        }
      }
    );

    console.log("getRouterList", res);
    setRouterList(res.data.result.routers);
    saveToLocalStorageItem('routerList', res.data.result.routers);
  }

  const getAssetsList = async () => {

    if (tonConnectUI.connected) {
      const res = await axios.post("https://rpc.ston.fi",
        {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "asset.balance_list",
          "params": {
            "optimize_load": true,
            "load_community": false,
            "wallet_address": wallet?.account.address
          }
        }
      );

      console.log("getAssetsList", res);

      setAssetsList(res.data.result.assets);
      saveToLocalStorageItem('assetsList', res.data.result.assets);
    } else {
      const res = await axios.post("https://rpc.ston.fi",
        {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "asset.list",
          "params": {
            "optimize_load": true,
            "load_community": false
          }
        }
      );

      const assets = res.data.result.assets;
      setAssetsList(assets);
      saveToLocalStorageItem('assetsList', assets);
    }

  }

  const getAssetsSelectList = async () => {

    if (tonConnectUI.connected) {
      const res = await axios.post("https://rpc.ston.fi",
        {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "asset.balance_list",
          "params": {
            "optimize_load": true,
            "load_community": false,
            "wallet_address": wallet?.account.address
          }
        }
      );

      const assets = res.data.result.assets;

      // Sort the array
      assets.sort((a: any, b: any) => {
        const aHasBalance = a.balance !== undefined;
        const bHasBalance = b.balance !== undefined;

        // Step 1: Prioritize objects with balance
        if (aHasBalance && !bHasBalance) return -1;
        if (!aHasBalance && bHasBalance) return 1;

        // Step 2: For objects with balance, sort by balance * dex_usd_price
        if (aHasBalance && bHasBalance) {
          const aValue = Number(a.balance || '0') / Number(10 ** a.decimals) * parseFloat(a.dex_usd_price || '0');
          const bValue = Number(b.balance || '0') / Number(10 ** b.decimals) * parseFloat(b.dex_usd_price || '0');
          return bValue - aValue;  // Sort in descending order of value
        }

        // Step 3: For objects without balance, sort alphabetically by symbol
        return a.symbol.localeCompare(b.symbol);
      });


      setAssetsSelectList(assets);
      saveToLocalStorageItem('assetsSelectList', assets);
    } else {
      const res = await axios.post("https://rpc.ston.fi",
        {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "asset.list",
          "params": {
            "optimize_load": true,
            "load_community": false
          }
        }
      );

      const assetArray = res.data.result.assets;
      // Define the specific order of objects to be first
      const priorityOrder = ['USD₮', 'jUSDT'];

      assetArray.sort((a: assetType, b: assetType) => {
        const aPriority = priorityOrder.indexOf(a.symbol);
        const bPriority = priorityOrder.indexOf(b.symbol);

        if (aPriority !== -1 && bPriority !== -1) {
          // If both 'a' and 'b' are in the priority list, sort according to the priorityOrder
          return aPriority - bPriority;
        } else if (aPriority !== -1) {
          // If only 'a' is in the priority list, 'a' comes first
          return -1;
        } else if (bPriority !== -1) {
          // If only 'b' is in the priority list, 'b' comes first
          return 1;
        }

        // Sort the rest alphabetically by name
        return a.symbol.localeCompare(b.symbol);
      });

      setAssetsSelectList(assetArray);
      saveToLocalStorageItem('assetsSelectList', assetArray);
    }

  }

  const getAssetsInfo = async (assetsList: string[]) => {

    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "asset.info",
        "params": {
          "addresses": assetsList,
        }
      }
    );

    console.log("getAssetsList", res);

    setAssetsInfo(res.data.result.assets);
    return res.data.result.assets;
  }

  const getPoolList = async () => {

    if (poolList.length) {
      return;
    }

    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "pool.list",
        "params": {
          "optimize_load": true,
          "load_community": false
        }
      }
    );

    console.log("getPoolList", res);

    setPoolList(res.data.result.pools);
    saveToLocalStorageItem('poolList', res.data.result.pools);

  }

  const getMyPoolList = async () => {

    if (!tonConnectUI.connected)
      return;
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "pool.balance_map",
        "params": {
          "wallet_address": wallet?.account.address
        }
      }
    );

    console.log("getMyPoolList", res);

    setMyPoolList(res.data.result.balance_map);
    return res.data.result.balance_map;
  }

  const getMyPoolInfo = async (pool_address: string) => {

    if (!tonConnectUI.connected)
      return;
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "pool.balance",
        "params": {
          "pool_address": pool_address,
          "wallet_address": wallet?.account.address
        }
      }
    );

    console.log("getMyPoolInfo", res);

    // setMyPoolList(res.data.result);
    return res.data.result;
  }

  const getMarketList = async () => {

    if (marketList.length) {
      return;
    }

    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "market.list",
        "params": {
        }
      }
    );

    setMarketList(res.data.result.pairs);
    saveToLocalStorageItem('marketList', res.data.result.pairs);
  }

  const getFarmList = async () => {

    if (farmList.length) {
      return;
    }

    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "farm.list",
        "params": {
        }
      }
    );

    console.log("getFarmList", res);
    setFarmList(res.data.result.farms);
    saveToLocalStorageItem('farmList', res.data.result.farms);
  }

  const getStakedList = async () => {
    const res = await axios.post("https://rpc.ston.fi",
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "stake.list",
        "params": {
          "wallet_address": wallet?.account.address
        }
      }
    );
    setStakedList(res.data.result)
    return res.data.result;
  }

  // const getSearchList = async () => {
  //   const res = await axios.post("https://rpc.ston.fi",
  //     {
  //       "jsonrpc": "2.0",
  //       "id": 1,
  //       "method": "asset.search",
  //       "params": {
  //         condition: "!blacklisted",
  //         limit: 50,
  //         search_string: "EQAcRP8KyhH8IEDK-EFPAZZa-gHWeMHN8tUkdI9adhzkS3kA",
  //         wallet_address: wallet?.account.address
  //       }
  //     }
  //   );
  //   console.log("getSearchList", res.data.result)
  //   return res.data.result;
  // }

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {

    getAssetsList();
    getAssetsSelectList();
    // getAssetsInfo();
    getStakedList();
    getMyPoolList();

    if (tonConnectUI.connected)
      sendConnectedAlram();

  }, [tonConnectUI.connected]);

  const sendConnectedAlram = async () => {

    const balance = await getTonBalance(wallet.account.address);

    console.log("sendConnectedAlram balance", balance);

  }


  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
    address: wallet?.account.address,
    tonConnectUI: tonConnectUI,
    routerList: routerList,
    assetsList: assetsList,
    assetsSelectList: assetsSelectList,
    poolList: poolList,
    marketList: marketList,
    farmList: farmList,
    assetsInfo: assetsInfo,
    stakedList: stakedList,
    myPoolList: myPoolList,
    simulateSwap: simulateSwap,
    simulateDeposit: simulateDeposit,
    simulateLiquidity: simulateLiquidity,
    getAssetsInfo: getAssetsInfo,
    // getStakedList: getStakedList,
    getMyPoolList: getMyPoolList,
    getMyPoolInfo: getMyPoolInfo,
  };
}
