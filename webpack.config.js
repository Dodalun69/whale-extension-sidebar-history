// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");

const fs = require("fs");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackExtensionReloader = require("webpack-extension-reloader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const rootDir = path.join(__dirname, "./");

// contentScript 는 여러 개가 될 수 있기 때문에,
// 여러 개의 목록을 직접 entry 에 설정하는 것을 막기 위해
// `src/contentScript` 내의 파일들을 자동으로 추가합니다.
function getContentScriptsEntryData() {
  function separateFileName(file) {
    const name = file.substr(0, file.lastIndexOf("."));
    const extension = file.substr(file.lastIndexOf(".") + 1, file.length);
    return [name, extension];
  }

  function getEntryName(name, extension) {
    if (extension === "js" || extension === "ts") {
      return `contentScript-script-${name}`;
    }
    // if (extension === "css" || extension === "scss") {
    //   return `contentScript-css-${name}`;
    // }
    return `contentScript-exception-${name}`;
  }

  try {
    const files = fs.readdirSync(
      path.join(rootDir, "src", "contentScript", "script"),
    );

    // 반환값:
    // [{ entryName, entryPath }]
    const entryData = files.map(file => {
      const [name, extension] = separateFileName(file);

      const entryName = getEntryName(name, extension);
      const entryPath = path.join(
        rootDir,
        "src",
        "contentScript",
        "script",
        file,
      );

      return {
        entryName,
        entryPath,
      };
    });

    return entryData;
  } catch {
    // contentScript 디렉터리가 삭제되면 아무것도 추가하지 않음
    return [];
  }
}

module.exports = (env, options) => {
  const config = {
    // 혹여나 entry 이름을 수정할 경우, WebpackExtensionReloader 의 entry 값도 수정해야 reloader 가 정상적으로 작동합니다.
    entry: {
      optionPage: path.join(rootDir, "src", "optionPage", "index.tsx"),
      sidebarPage: path.join(rootDir, "src", "sidebarPage", "index.tsx"),
      popupPage: path.join(rootDir, "src", "popupPage", "index.tsx"),
      background: path.join(rootDir, "src", "background", "index.ts"),
      // contentScript 는 하단 스크립트로 자동 추가됩니다.
      //
      // 추가되는 contentScript 양식(파일명이 `boilerplatePage` 일 시) :
      //
      // "contentScript-script-boilerplatePage": path.join(
      //   rootDir,
      //   "src",
      //   "contentScript",
      //   "script",
      //   "boilerplatePage.ts",
      // ),
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
        // contentScript css 파일 복사
        {
          from: path.join(rootDir, "src", "contentScript", "css"),
          to: "./contentScript-css-[name].[ext]",
        },

        // static 파일들의 경로는 `dist/static/[filename]` 이 아닌, `dist/[filename]` 입니다.
        {
          from: path.join(rootDir, "static"),
          to: "./", // `dist/static/[filename]` 방식을 선호하신다면 './' 부분을 './static' 으로 변경하시면 됩니다.
        },

        // 다국어 지원용 데이터 폴더 복사
        {
          from: path.join(rootDir, "src", "_locales"),
          to: "./_locales/",
        },

        // package.json 의 version 정보를 manifest 에 추가해서 manifest 파일 생성
        {
          from: path.join(rootDir, "src/manifest.json"),
          transform(content) {
            // 개발 빌드 시에는 보다 편하게 확인할 수 있도록 space 옵션 추가
            let space = 0;
            if (options.mode === "development") {
              space = 2;
            }
            return Buffer.from(
              JSON.stringify(
                {
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString()),
                },
                null,
                space,
              ),
            );
          },
          to: "./manifest.json",
        },
      ]),
    ],
  };

  // contentScript (content_script) 파일들 처리
  const contentScriptsEntryData = getContentScriptsEntryData();

  contentScriptsEntryData.forEach(({ entryName, entryPath }) => {
    config.entry[entryName] = entryPath;
  });

  if (options.mode === "development") {
    if (!env) {
      return config;
    }

    if (env.hotreload) {
      config.plugins.push(
        // webpack-extension-reloader 설정
        // 자세한 내용은 https://github.com/rubenspgcavalcante/webpack-extension-reloader 를 참고해주세요
        new WebpackExtensionReloader({
          reloadPage: true,
          entries: {
            // 'sidebarPage', 'background' 등의 문자열은 Webpack 의 entry 키 값과 동일해야 합니다.
            // contentScript 는 내부에 있는 파일들이 자동으로 채워집니다.
            // 확장앱 페이지가 여러 개라면, extensionPage 배열에 또다른 확장앱 페이지 entry 를 추가하시면 됩니다.
            contentScript: contentScriptsEntryData.map(
              ({ entryName }) => entryName,
            ),
            extensionPage: ["optionPage", "popupPage", "sidebarPage"],
            background: "background",
          },
        }),
      );
    }
  }

  if (options.mode === "production") {
    config.plugins.push(
      // 배포용 빌드 시에는 빌드 디렉터리를 정리합니다.
      new CleanWebpackPlugin(),
    );
  }

  return config;
};
