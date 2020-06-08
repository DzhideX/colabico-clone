import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/index';

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('*', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.send(500).send('Error happened!');
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(
          <App location={req.url} context={{}} />,
        )}</div>`,
      ),
    );
  });
});

app.listen(3000, () => {
  console.log('Listening...');
});
