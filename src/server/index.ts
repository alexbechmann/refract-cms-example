import express from 'express';
import path from 'path';
import { refractCmsHandler } from '@refract-cms/server';
import { basicExampleConfig } from '../examples/basic-example/refract.config';
import { Config, configure } from '@refract-cms/core';

const app = express();

const buildOptions = ({ name, config }: { name: string; config: Config }) => ({
  rootPath: `/cms/${name}`,
  config,
  serverConfig: {
    mongoConnectionString: `mongodb://localhost:27021/refract-cms-${name}`,
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
});

app.use(...refractCmsHandler(buildOptions({ name: 'basic-example', config: basicExampleConfig })));

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(5001, () => {
  console.log('Server listening');
});
