import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'components';

import { useWcContext } from './context/WalletProvider';

import './styles/index.scss';
import s from './app.module.scss';

export const App: FC = () => {
  const { connect, VerifyNft, account } = useWcContext();
  const [nftsAmount, setNftsAmount] = useState<string | number>('');

  const handleCheckNftAmount = useCallback(async () => {
    if (!account.address) {
      await connect('MetaMask');
    }

    const nfts = await VerifyNft(account.address);
    if (+nfts === 0) {
      setNftsAmount('None held');
    } else {
      setNftsAmount(nfts);
    }
  }, [account, VerifyNft, connect]);

  useEffect(() => {
    if (account?.address) {
      handleCheckNftAmount();
    }
  }, [account, handleCheckNftAmount]);

  return (
    <>
      <main className={s.main}>
        <Button onClick={handleCheckNftAmount}>Verify nft</Button>
        <div className={s.amount}>
          Nfts amount: {account?.address ? nftsAmount : 'Connect to check'}
        </div>
      </main>
    </>
  );
};
