'use strict';

const path = require('path');
const babelEnvDeps = require('webpack-babel-env-deps');
const typescript = require('razzle-plugin-typescript');

const dokku = (config, { target, dev }, webpack) => {
  if (target !== "node") return config

  const isDefinePlugin = plugin => plugin.constructor.name === "DefinePlugin"
  const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin)

  if (indexDefinePlugin < 0) {
    console.warn("Couldn't setup razzle-heroku, no DefinePlugin...")
    return config
  }

  const { definitions } = config.plugins[indexDefinePlugin]
  const newDefs = Object.assign({}, definitions);

  delete newDefs["process.env.PORT"]
  newDefs["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"'
  newDefs["process.env.FILES_DIR"] = '"/app/files/"'
  config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs)

  return config
}

module.exports = {
  plugins: [],
  modify(config, args, webpack) {
    const { target, dev } = args;
    let appConfig = dev ? { ...config } : dokku(config, args, webpack);
    if (target === 'web') {
      appConfig = typescript(config, args, webpack);
      appConfig.module.rules = [
        ...appConfig.module.rules,
        {
          test: /\.(js|jsx)$/,
          loader: 'ts-loader',
          exclude: [
            babelEnvDeps.exclude()
          ],
          options: {
            transpileOnly: true
          }
        }
      ]
    }
    else {
      appConfig = typescript(config, args, webpack, {
        useBabel: false,
        useEslint: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve(__dirname, 'tsconfig.server.json')
        },
        forkTsChecker: {
          tsconfig: path.resolve(__dirname, 'tsconfig.server.json'),
          tslint: './tslint.json',
          watch: './src',
          typeCheck: true,
        },
      });
      // appConfig.externals = [];
      // appConfig.module.rules.push({
      //   test: /\.(js|jsx)$/,
      //   loader: 'ts-loader',
      //   exclude: [
      //     babelEnvDeps.exclude(),
      //     path.resolve(__dirname, 'src')
      //   ],
      //   options: {
      //     transpileOnly: true
      //   }
      // })
      appConfig.optimization = {
        ...appConfig.optimization,
        minimize: false
      }
    }

    appConfig.module.rules = [
      ...appConfig.module.rules,
      {
        test: /\.(js|jsx|ts|tsx|css|scss)$/,
        loader: 'prettier-loader',
        exclude: /node_modules/,
      }
    ]
    return appConfig;
  },
};