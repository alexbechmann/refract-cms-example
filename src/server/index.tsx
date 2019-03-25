import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import contactRouter from './contact/contact.router';
import App from '../client/App';
import config from '../refract-cms/refract.config';
import { refractCmsHandler } from '@refract-cms/server';
import 'babel-polyfill';
import { store } from '../client/state/root.store';
import { Provider } from 'react-redux';
import { theme } from '../client/styles/theme';

import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import jss from 'jss';
import { JssProvider, SheetsRegistry } from 'react-jss';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(
    ...refractCmsHandler({
      rootPath: '/cms',
      config,
      serverConfig: {
        mongoConnectionString: process.env.MONGO_URL || 'mongodb://localhost:27059/refract-cms-example',
        filesPath: process.env.FILES_DIR || 'files/',
        auth: {
          adminCredentials: {
            username: 'ryomtand',
            password: 'Sc4JIlX0p5DM'
          },
          jwt: {
            issuer: 'ryomtand',
            secret: 'TjFggx2`dCjvH$/6'
          }
        }
      }
    })
  )
  .use('/api/contact', contactRouter)
  .get('/*', (req: express.Request, res: express.Response) => {
    const context = {};

    // const sheetsRegistry = new SheetsRegistry();
    // const generateClassName = createGenerateClassName();
    // const sheetsManager = new Map();
    // const markup = renderToString(
    //   <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
    //     <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
    //       <StaticRouter context={context} location={req.url}>
    //         <Provider store={store}>
    //           <App />
    //         </Provider>
    //       </StaticRouter>
    //     </MuiThemeProvider>
    //   </JssProvider>
    // );
    // const css = sheetsRegistry.toString();
    // console.log({ css });
    const markup = '';
    const css = '';
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Ryomtand</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
        <style id="jss-server-side">${css}</style>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  });

export default server;
