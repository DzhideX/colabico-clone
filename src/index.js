import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
// eslint-disable-next-line
import firebase from './firebase/firebase';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

serviceWorker.unregister();
