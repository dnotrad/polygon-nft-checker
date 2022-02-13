import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';

import { Subscription } from 'rxjs';

import { eth_provider, polyContract } from 'config';
import { ERC721_ABI } from 'config/ERC721';

import WalletConnect from '../services/wallet-connect';

import { notify } from '../utils/notify';

type IProviders = 'MetaMask';

declare const window: any;
interface IContextValue {
  connect: (provider: IProviders) => Promise<void>;
  disconnect: () => void;
  account: any;
  VerifyNft: (address: string) => Promise<number | string>;
}

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC = ({ children }) => {
  const [account, setAccount] = useState<any>();
  const [currentSubsriber, setCurrentSubscription] = useState<Subscription>();

  const subscriberSuccess = useCallback((data: any) => {
    if (data.name === 'accountsChanged') {
      setAccount(data);
      notify(`Wallet changed: ${data.address.slice(0, 5)}...${data.address.slice(-5)}`);
    }
  }, []);

  const subscriberError = useCallback((err: any) => {
    console.error(err);
    if (err.code === 4) {
      WalletConnect.resetConnect();
      notify(
        `You changed to wrong network. Please choose ${eth_provider.network.chainName}`,
        'error',
      );
      setAccount({});
    }
  }, []);

  const connect = useCallback(
    async (provider: IProviders) => {
      if (provider === 'MetaMask' && !window.ethereum) {
        notify('Please install MetaMask!', 'error');
      }
      const connected = await WalletConnect.initWalletConnect(provider);
      if (connected) {
        try {
          const accountInfo: any = await WalletConnect.getAccount();
          notify(
            `Wallet connected: ${accountInfo.address.slice(0, 5)}...${accountInfo.address.slice(
              -5,
            )}`,
            'success',
          );
          if (accountInfo.address) {
            setAccount(accountInfo);
            localStorage.setItem('providerType', accountInfo.type);
          }

          const sub = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
          setCurrentSubscription(sub);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [subscriberError, subscriberSuccess],
  );

  const disconnect = useCallback(() => {
    setAccount({});
    localStorage.removeItem('providerType');
    currentSubsriber?.unsubscribe();
    WalletConnect.resetConnect();
  }, [currentSubsriber]);

  const VerifyNft = useCallback(async (ownerAddress: string): Promise<number | string> => {
    const Web3 = WalletConnect.Web3();
    const contract = new Web3.eth.Contract(ERC721_ABI as any[], polyContract);

    const nftAmount = await contract.methods.balanceOf(ownerAddress).call();
    notify(`Your nfts amount: ${nftAmount}`);

    return nftAmount;
  }, []);

  useEffect(() => {
    // connect user if he connected previously
    const providerType = localStorage.getItem('providerType') as IProviders;
    if (providerType) {
      connect(providerType);
    }
  }, [connect]);

  return (
    <Web3Context.Provider value={{ connect, account, disconnect, VerifyNft }}>
      {children}
    </Web3Context.Provider>
  );
};

const useWcContext = () => {
  return useContext(Web3Context);
};

export { WalletConnectContext, useWcContext };
