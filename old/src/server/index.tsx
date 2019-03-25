import express from 'express';
import { refractCmsHandler, createPublicSchema, resolveImageProperty, ImageModel } from '@refract-cms/server';
import { RefractTypes } from '@refract-cms/core';
import { config, NewsArticleSchema, NewsArticleEntity, NewsArticleModel } from '../refract-cms';

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
        mongoConnectionString: process.env.MONGO_URL! || 'mongodb://localhost:27059/refract-cms-example',
        filesPath: process.env.FILES_DIR || 'files/',
        auth: {
          adminCredentials: {
            username: 'admin',
            password: 'pw'
          },
          jwt: {
            issuer: 'my-app',
            secret: process.env.JWT_SECRET!
          }
        },
        publicGraphql: [
          createPublicSchema<NewsArticleEntity, NewsArticleModel>(NewsArticleSchema, {
            ...(NewsArticleSchema.properties as any),
            imageModel: resolveImageProperty(NewsArticleSchema.properties.image, ({ image }) => image),
            title: {
              type: RefractTypes.string,
              resolve: ({ title, extraText }) => `${title} - ${extraText}`
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
    <title>Razzle TypeScript</title>
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
