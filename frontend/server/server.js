import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../src/redux/store/index';
import AppRouter from '../src/routers/AppRouter';
import { StaticRouter } from 'react-router-dom';

const app = express();
const store = configureStore();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/*', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.send(500).send('Error happened!');
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter location={req.originalUrl} context={{}}>
              <AppRouter />
            </StaticRouter>
          </Provider>,
        )}</div>`,
      ),
    );
  });
});

app.listen(3000, () => {
  console.log('Listening...');
});
