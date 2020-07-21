import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store/index';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

require('dotenv').config();

const isServer = typeof window !== 'undefined';

if (isServer) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}
