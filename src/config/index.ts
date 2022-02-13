export const is_production = true;
export const polyContract = '0xA20c3F980086AC900650B02d2f8DCc59009b1156';

export const eth_provider = {
  name: 'Polygon',
  network: {
    chainName: 'Polygon',
    chainID: is_production ? 137 : 80001,
  },
  explorer: is_production ? 'https://explorer.matic.network/' : 'https://mumbai.polygonscan.com/',
  provider: {
    MetaMask: { name: 'MetaMask' },
  },
};
