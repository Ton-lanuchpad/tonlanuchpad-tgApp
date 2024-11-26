import { getHttpEndpoint } from '@orbs-network/ton-access';
import { Address, fromNano, TonClient } from "@ton/ton";
import { HttpClient, Api } from 'tonapi-sdk-js';
import { useEffect, useState } from 'react';
import { NETWORK, TONAPI_KEY } from '../Config/index';


const tonApi = {
  url: NETWORK === 'mainnet' ? "https://tonapi.io" : "https://testnet.tonapi.io",
  key: TONAPI_KEY
}

export function useTonClient() {

  const [tonApiClient, setTonApiClient] = useState<any>(null);
  const [tonClient, setTonClient] = useState<any>(null);

  useEffect(() => {
    getTonApiClient();
    getTonClient();
  }, []);

  function tonAddrStr(addr: Address | string): string {
    if (addr instanceof Address)
      return addr.toString()

    return addr
  }

  async function getTokenBalance(wallet: string, token: Address | string): Promise<number> {
    try {
      // const apiClient = await tonApiClient()
      const jBalance = await tonApiClient?.accounts.getAccountJettonBalance(
        tonAddrStr(wallet),
        tonAddrStr(token)
      )
      return Number(jBalance.balance)
      // const tonClient = await tonGetClient()
      // const jettonRoot: OpenedContract<JettonRoot> = tonClient.open(JettonRoot.createFromAddress(tonAddr(token)));
      // const jettonWallet: OpenedContract<JettonWallet> = tonClient.open(await jettonRoot.getWallet(tonAddr(wallet)));
      // const balance = await jettonWallet.getBalance()
      // return balance
    } catch (error) {
      console.log("getTokenBalance-error:", error);
      return Number(0);
    }
  }

  const getTonApiClient = async () => {

    if (tonApiClient) {
      return tonApiClient;
    }

    const headers = {
      'Content-type': 'application/json',
      'Authorization': '',
    }

    if (tonApi.key) {
      headers.Authorization = `Bearer ${tonApi.key}`;
    }

    const httpClient = new HttpClient({
      baseUrl: tonApi.url,
      baseApiParams: {
        headers,
      }
    });

    // Initialize the API client
    const client = new Api(httpClient);

    setTonApiClient(client);

    return client;
  }

  const getTonClient = async () => {

    if (tonClient) {
      return tonClient;
    }

    const client = new TonClient({
      endpoint: await getHttpEndpoint({ network: NETWORK === 'testnet' ? 'testnet' : 'mainnet' }),
    })

    setTonClient(client);

    return client;
  }


  const getTonBalance = async (address: Address | string) => {

    try {
      let addr: Address;
      if (!(address instanceof Address)) {
        addr = Address.parse(address)
      } else {
        addr = address;
      }

      const client = await getTonClient();
      const balance = await client.getBalance(addr);

      return Number(fromNano(balance));
    } catch (e) {
      return 0;
    }

  }

  return {
    tonApiClient,
    tonClient,
    getTonBalance,
    getTokenBalance
  }
}
