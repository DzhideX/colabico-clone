import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';
// import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/store/index';

const store = configureStore();

require('dotenv').config();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>
);

// ReactDOM.hydrate(<App />, document.getElementById('root'));

if (typeof window !== 'undefined') {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
}

export default App;

// serviceWorker.unregister();
