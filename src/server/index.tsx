import express from 'express';
import config from '../refract-cms/refract.config';
import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import 'babel-polyfill';
import { RefractTypes } from '@refract-cms/core';
import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';
import { NewsArticleTypeSchema } from '../refract-cms/news/news-article-type.schema';
import { SettingsSchema } from '../refract-cms/settings/settings.schema';
import { ProductSchema } from '../refract-cms/products/product.schema';
import { ProductCategorySchema } from '../refract-cms/products/product-category.schema';

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
      serverConfig: {
        rootPath: '/cms',
        config,
        mongoConnectionString: process.env.MONGO_URL || 'mongodb://localhost:27059/refract-cms-example',
        filesPath: process.env.FILES_DIR || 'files/',
        auth: {
          adminCredentials: {
            username: 'admin',
            password: 'password'
          },
          jwt: {
            issuer: 'refract-cms-example-dev',
            secret: 'I4jni8zuRyWC-dev'
          }
        },
        publicGraphQL: [
          createPublicSchema(NewsArticleSchema, ({ resolveImageProperty, schema, resolveReference }) => {
            return {
              ...schema.properties,
              imageModel: resolveImageProperty('image'),
              title: {
                type: RefractTypes.string,
                resolve: ({ title, _id }) => `${title} (${_id})`
              },
              articleType: resolveReference(NewsArticleTypeSchema, 'articleTypeId')
            };
          }),
          createPublicSchema(SettingsSchema, ({ schema, resolveReferences }) => {
            return {
              ...schema.properties,
              highlightedArticles: resolveReferences(NewsArticleSchema, 'highlightedArticleIds')
            };
          }),
          createPublicSchema(ProductSchema, ({ resolveReferences, schema }) => {
            return {
              ...schema.properties,
              productCategories: resolveReferences(ProductCategorySchema, 'productCategoryIds')
            };
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
    <title>Refract-Cms Example</title>
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
