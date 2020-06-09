import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore, { history } from './redux/store/index';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

const store = configureStore();

require('dotenv').config();

const isServer = typeof window !== 'undefined';

if (isServer) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
}
