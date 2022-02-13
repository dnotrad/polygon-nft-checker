import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import { App } from './App';
import { WalletConnectContext } from './context/WalletProvider';

const root = document.getElementById('root');
const app = (
  <WalletConnectContext>
    <ToastContainer limit={window.innerWidth <= 600 ? 2 : 3} />
    <App />
  </WalletConnectContext>
);

ReactDOM.render(app, root);
