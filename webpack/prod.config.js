
// const webpack = require("webpack");

// const path = require("path");
// // const fileSystem = require("fs");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ExtensionReloader = require('webpack-extension-reloader');

// const CleanWebpackPlugin = require("clean-webpack-plugin");


// const __rootDir = path.join(__dirname, "../");

// module.exports = env => {
//   const config = {
//     mode: "production",
//     entry: {
//       extensionPage: path.join(__rootDir, "src", "extensionPage", "index.js"),
//       background: path.join(__rootDir, "src", "background", "index.js")
//     },
//     output: {
//       path: path.join(__rootDir, "dist"),
//       filename: "[name].bundle.js"
//     },
//     resolve: {
//       extensions: ['.js']
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           loader: "babel-loader",
//           options: {
//             presets: [
//               '@babel/preset-env',
//             ],
//           },
//         },
//         {
//           test: /\.scss$/,
//           loader: "style-loader!css-loader!sass-loader",
//           exclude: /node_modules/
//         },
//         {
//           test: /\.css$/,
//           loader: "style-loader!css-loader",
//           exclude: /node_modules/
//         },
//         {
//           test: /\.html$/,
//           loader: "html-loader",
//           exclude: /node_modules/
//         },
//       ]
//     },
//     plugins: [
//       new CopyWebpackPlugin([
//         {
//           from: path.join(__rootDir, "static"),
//           to: './',
//         },
//         {
//           from: path.join(__rootDir, "_locales"),
//           to: './_locales/',
//         },
//         {
//           from: path.join(__rootDir, "src/manifest.json"),
//           transform: function (content, path) {
//             // package.json 의 version 정보를 manifest 에 추가해서 manifest 파일 생성
//             return Buffer.from(JSON.stringify({
//               version: process.env.npm_package_version,
//               ...JSON.parse(content.toString())
//             }));
//           },
//           to: './manifest.json',
//         },
//       ]),
//       new CleanWebpackPlugin(["dist"], {
//         root: __rootDir,
//       }),
//     ]
//   };

//   if (!env) {
//     return config;
//   }

//   return config;
// }