"use strict";

const path = require("path");
const babelEnvDeps = require("webpack-babel-env-deps");

module.exports = {
  plugins: [],
  modify(config, { target, dev }, webpack) {
    const appConfig = config;

    if (target === "web") {
      appConfig.module.rules = [
        ...appConfig.module.rules,
        {
          test: /\.(js|jsx)$/,
          loader: "ts-loader",
          exclude: [babelEnvDeps.exclude()],
          options: {
            transpileOnly: true
          }
        }
      ];
      appConfig = typescript(config, args, webpack, {
        useBabel: false,
        useEslint: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve(__dirname, "tsconfig.json")
        },
        forkTsChecker: {
          tsconfig: path.resolve(__dirname, "tsconfig.json"),
          tslint: "./tslint.json",
          watch: "./src/client",
          typeCheck: true,
          tslintAutoFix: dev
        }
      });
    } else {
      appConfig = typescript(config, args, webpack, {
        useBabel: false,
        useEslint: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve(__dirname, "tsconfig.server.json")
        },
        forkTsChecker: {
          tsconfig: path.resolve(__dirname, "tsconfig.server.json"),
          tslint: "./tslint.json",
          watch: ["./src/client", "./src/shared"],
          typeCheck: true,
          tslintAutoFix: dev
        }
      });
    }
    appConfig.module.rules = [
      ...appConfig.module.rules,
      {
        test: /\.(js|jsx|ts|tsx|css|scss)$/,
        loader: "prettier-loader",
        exclude: /node_modules/
      }
    ];
    return appConfig;
  }
};
