import express from 'express';
import path from 'path';
import { refractCmsHandler } from '@refract-cms/server';
import { config } from '../refract-cms/refract.config';
import { Config, configure } from '@refract-cms/core';

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: `/cms`,
    config,
    serverConfig: {
      mongoConnectionString: `mongodb://localhost:27021/refract-cms-basic-example`,
      filesPath: 'files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret'
        }
      }
    }
  })
);

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(5001, () => {
  console.log('Server listening');
});
