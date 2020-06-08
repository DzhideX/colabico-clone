import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/store/index';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

const store = configureStore();

require('dotenv').config();

const App = ({ location, context }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>
);

if (typeof window !== 'undefined') {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
}
//location={location} context={context}

export default App;
