/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
"use strict";

// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");

const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackExtensionReloader = require("webpack-extension-reloader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const rootDir = path.join(__dirname, "./");

module.exports = () => {
  const config = {
    mode: process.env.NODE_ENV,
    entry: {
      sidebarPage: path.join(rootDir, "src", "sidebarPage", "index.tsx"),
      background: path.join(rootDir, "src", "background", "index.ts"),
    },
    output: {
      path: path.join(rootDir, "dist"),
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(rootDir, "static"),
          to: "./",
        },
        {
          from: path.join(rootDir, "src", "_locales"),
          to: "./_locales/",
        },
        {
          from: path.join(
            rootDir,
            process.env.NODE_ENV === "development"
              ? "src/manifest.dev.json"
              : "src/manifest.prod.json",
          ),
          transform(content) {
            return Buffer.from(
              JSON.stringify(
                {
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString()),
                },
                null,
                process.env.NODE_ENV === "development" ? 2 : 0,
              ),
            );
          },
          to: "./manifest.json",
        },
      ]),
    ],
  };

  if (process.env.NODE_ENV === "development") {
    config.plugins.push(
      new WebpackExtensionReloader({
        // port: 9080,
        reloadPage: true,
        entries: {
          background: "background",
          extensionPage: ["sidebarPage"],
        },
      }),
    );
  }

  if (process.env.NODE_ENV === "production") {
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
};
