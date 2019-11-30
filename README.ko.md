# Whale Extension Boilerplate

> Read this in [English](README.md)

React, TypeScript, [webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader) 가 적용된
웨일 확장 프로그램 보일러플레이트입니다.

Eslint + Prettier 또한 airbnb 스타일을 기준으로 타입스크립트에 맞춰 적용돼있습니다.

## 각 브랜치

| 브랜치                    | 설명                                    | 기본 설정                               |
| ------------------------- | --------------------------------------- | --------------------------------------- |
| master                    | 기본 버전 (일반적인 html, css, js 방식) | Webpack + Reloader                      |
| react (준비중)            | React 버전 (준비중)                     | Webpack + Reloader + React              |
| react-typescript (준비중) | React + 타입스크립트 버전 (준비중)      | Webpack + Reloader + React + TypeScript |

## 적용된 기능

- React
- TypeScript
- [webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader)
- EsLint, Prettier (airbnb 스타일)

> - React 는 Redux 등을 제외한 기본 구성으로 제공됩니다.
> - webpack-extension-reloader 는 [웹팩 핫 리로드 미들웨어와 유사하게 동작합니다. 다만 Hot Module Replacement 는 아직 지원하지 않습니다.](https://github.com/rubenspgcavalcante/webpack-extension-reloader#solution-for-)

## 설치

```sh
# clone
Download ZIP 혹은 git Clone

# dependencies 설치
`$ yarn install`
```

### 개발 및 빌드

```sh
# 빌드
`$ yarn build`(배포용 빌드) or `$ yarn build-dev`(개발용 빌드)

# Reloader 사용
`$ yarn start`
```

> Reloader 사용시 페이지 코드 변경은 자동으로 반영되나, `manifest` 파일 변경시에는 reloader 를 재시작해야 합니다.

### 파일 구조

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n(다국어 지원)
| |- en/ - 영어
| | |- messages.json - 영어 지원용
| |
| |- ko - 한국어
| | |- messages.json - 한국어 지원용
|
|- background/ - 백그라운드 스크립트 폴더
|
|- popupPage/ - 팝업 페이지 소스 폴더(하단 `확장프로그램 종류 선택` 참고)
|- sidebarPage/ - 사이드바 페이지 소스 폴더(하단 `확장프로그램 종류 선택` 참고)
|
|- manifest.json - 확장앱 manifest

static/ - 정적 폴더
|- icon/ - 아이콘 폴더 (예시용)
|
|- img/ - 이미지 폴더 (예시용)
|
|- popupPage.html(하단 `확장프로그램 종류 선택` 참고)
|- sidebarPage.html(하단 `확장프로그램 종류 선택` 참고)
```

> - `manifest.json` 에서 사용할 파일은 빌드 결과를 기준으로 작성하셔야 합니다.
> - `manifest.json` 의 `version` 값은 웹팩 빌드 시 `package.json` 의 버전 정보로 > 채워넣게 돼있으니 따로 작성하실 필요가 없습니다.
> - i18n(다국어 지원)은 [chrome.i18n API 설명(영문)](https://developer.chrome.com/extensions/i18n)을 참고해주세요.

## **확장프로그램 종류 선택**

기존 크롬 확장프로그램의 종류인 `browser_action`, `page_action`에 더해,
**웨일에는 사이드바 확장프로그램이(`sidebar_action`) 존재합니다.**

이 보일러플레이트는 `browser_action`, `sidebar_action` 내용을 기본 제공하며,`browser_action` 으로 기본 제공되나,
`sidebar_action` 으로 간단하게 변경 가능합니다.

## 참고해주세요

먼저 [웨일 개발자센터](https://developers.whale.naver.com/)가 굉장히 잘 만들어져있으니 꼭 읽어보시길 바랍니다.

다음은 제가 이 보일러플레이트를 만들기에 앞서,
개인적으로 웨일 확장 프로그램을 개발해보면서 알게 된 점들입니다.

### Whale API

#### sessions

[웨일 브라우저 API](https://developers.whale.naver.com/api/)에 따르면
`whale.sessions` 는 지원되지 않는 기능입니다.

하지만 `sessions.getDevices()` 함수는 정상 작동하는 것을 확인했으며, 따라서 타 sessions api 도 작동할 가능성이 높습니다.

다만 웨일측에서 '지원되지 않음' 이라 적어둔 만큼
무언가 오류 등이 존재할 가능성이 있습니다.

### TypeScript

#### `@types/naver-whale`

[웨일은 `chrome.` 네임스페이스를 지원합니다.](https://developers.whale.naver.com/api/#%ED%98%B8%ED%99%98%EC%84%B1)

`@types/chrome`, [`@types/naver-whale`](https://www.npmjs.com/package/@types/naver-whale)(`@types/chrome` 을 재정의한 방식입니다) 둘다 탑재해두었으므로 코드에서 `chrome.`, `whale.` 중 어떤 것을 사용하셔도 무방하며,

`@types/naver-whale`은 `@types/chrome` 을 재정의한 방식이므로 섞어서 사용할 수도 있으며, `whale.` 로 작성할 경우엔 일부 타입 도움말을 한글로 확인하실 수 있습니다.
