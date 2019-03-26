import express from 'express';
import config from '../refract-cms/refract.config';
import { refractCmsHandler, createPublicSchema, resolveImageProperty } from '@refract-cms/server';
import 'babel-polyfill';
import { NewsArticleSchema, NewsArticleEntity, NewsArticleModel } from '../refract-cms';
import { RefractTypes } from '@refract-cms/core';

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
        },
        publicGraphql: [
          createPublicSchema<NewsArticleEntity, NewsArticleModel>(NewsArticleSchema, {
            imageModel: resolveImageProperty(NewsArticleSchema.properties.image, ({ image }) => image),
            title: {
              type: RefractTypes.string,
              resolve: ({ title, extraText }) => `${title} - ${extraText}`
            },
            articleText: {
              type: RefractTypes.string,
              resolve: ({ articleText }) => articleText
            }
          })
        ]
      }
    })
  )
  .get('/*', (req: express.Request, res: express.Response) => {
    res.send(
      `
<!doctype html>
  <html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <title>Ryomtand</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    );
  });

export default server;
