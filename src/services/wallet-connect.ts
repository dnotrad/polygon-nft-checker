import { ConnectWallet } from '@amfi/connect-wallet';
import Web3 from 'web3';

import { eth_provider } from 'config';

interface ISendTxProps {
  from: string;
  to: string;
  value: string;
}

const MATIC_DECIMALS = 10 ** 18;
class WalletConnect {
  public walletConnect: ConnectWallet;

  constructor() {
    this.walletConnect = new ConnectWallet();
  }

  public async initWalletConnect(provider: 'MetaMask') {
    const connected = await this.walletConnect.connect(
      eth_provider.provider[provider],
      eth_provider.network,
      { providerType: true },
    );
    return connected;
  }

  public async getAccount() {
    return this.walletConnect.getAccounts();
  }

  public Web3(): Web3 {
    return this.walletConnect.currentWeb3();
  }

  public eventSubscribe() {
    return this.walletConnect.eventSubscriber();
  }

  public async getMaticBalance(address: string) {
    const balance = await this.Web3().eth.getBalance(address);
    return +balance / MATIC_DECIMALS;
  }

  public resetConnect() {
    this.walletConnect.resetConect();
  }

  public async sendTx(data: ISendTxProps) {
    return this.Web3().eth.sendTransaction(data);
  }
}

export default new WalletConnect();
