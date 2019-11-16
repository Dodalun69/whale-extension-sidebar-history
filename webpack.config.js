
const webpack = require("webpack");

const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackExtensionReloader = require('webpack-extension-reloader');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const __rootDir = path.join(__dirname, "./");

module.exports = (env, options) => {
  const config = {
    entry: {
      // if you modify the entry name, you must also modify the WebpackExtensionReloader's entry value.
      // 혹여나 entry 이름을 수정할 경우, WebpackExtensionReloader 의 entry 값도 수정해야 reloader 가 정상적으로 작동합니다.
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
        // static files path is `dist/[filename]`. NOT `dist/static/[filename]`.
        // static 파일들의 경로는 `dist/static/[filename]` 이 아닌, `dist/[filename]` 입니다.
        {
          from: path.join(__rootDir, "static"),
          to: './', // if you modify here to './static', file path will be `dist/static/[filename]`.
                    // `dist/static/[filename]` 방식을 선호하신다면 './' 부분을 './static' 으로 변경하시면 됩니다.
        },
        {
          from: path.join(__rootDir, "src", "_locales"),
          to: './_locales/',
        },
        {
          from: path.join(__rootDir, "src/manifest.json"),
          transform: function (content, path) {
            // create manifest file with package.json's version information
            // package.json 의 version 정보를 manifest 에 추가해서 manifest 파일 생성

            let space = 0;
            if (options.mode === 'development') {
              space = 2;
            }
            return Buffer.from(
              JSON.stringify(
                {
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString())
                },
                null,
                space
              )
            );
          },
          to: './manifest.json',
        },
      ]),
    ]
  };


  if (options.mode === 'development') {
    if (!env) {
      return config;
    }

    if (env['hotreload']) {
      config.plugins.push(
        new WebpackExtensionReloader({
          port: 9090,
          reloadPage: true,
          entries: {
            extensionPage: 'extensionPage',
            background: 'background',
          },
        })
      );
    }
  }


  if (options.mode === 'production') {
    config.plugins.push(
      new CleanWebpackPlugin(["dist"], {
        root: __rootDir,
      }),
    );
  }

  return config;
}