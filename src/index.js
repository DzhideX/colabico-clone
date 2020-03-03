import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
// eslint-disable-next-line
import firebase, {db} from './firebase/firebase';
require('dotenv').config();

ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));

serviceWorker.unregister();