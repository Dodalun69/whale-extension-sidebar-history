
const webpack = require("webpack");

const path = require("path");
// const fileSystem = require("fs");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WriteFilePlugin = require("write-file-webpack-plugin");
const ExtensionReloader = require('webpack-extension-reloader');


const __rootDir = path.join(__dirname, "../");

module.exports = env => {
  const config = {
    mode: "development",
    entry: {
      extensionPage: path.join(__rootDir, "src", "extensionPage", "index.js"),
      background: path.join(__rootDir, "src", "background", "index.js")
    },
    output: {
      path: path.join(__rootDir, "dist"),
      filename: "[name].bundle.js"
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: "html-loader",
          exclude: /node_modules/
        },
      ]
    },
    plugins: [

      // generate `dist/extensionPage.html` from `src/extensionPage/index.html` (inject `src/extensionPage/index.js` as <script> tag)
      // `src/extensionPage/index.html` 에 `src/extensionPage/index.js` 를 <script> 태그로 추가하여 `dist/extensionPage.html` 을 생성
      new HtmlWebpackPlugin({
        filename: 'extensionPage.html',
        template: 'src/extensionPage/index.html',
        excludeChunks: ['background'],
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(__rootDir, "static"),
          to: './', // dist/static/[file] X, dist/[file] O
        },
        {
          from: path.join(__rootDir, "src", "_locales"),
          to: './_locales/',
        },
        {
          from: path.join(__rootDir, "src/manifest.json"),
          transform: function (content, path) {
            // package.json 의 version 정보를 manifest 에 추가해서 manifest 파일 생성
            return Buffer.from(JSON.stringify({
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            }));
          },
          to: './manifest.json',
        },
      ]),
    ]
  };

  if (!env) {
    return config;
  }

  if (env['hotreload']) {
    console.log('asd');
    config.plugins.push(
      new ExtensionReloader({
        port: 9090,
        reloadPage: true,
        entries: {
          extensionPage: 'extensionPage',
          background: 'background',
        },
      })
    );
  }

  return config;
}