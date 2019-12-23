# Whale Extension Boilerplate

> **보고 계신 브랜치는 보일러플레이트 관리용 브랜치입니다.**
>
> 보일러플레이트 설명, 사용 방법 안내 등을 원하시는 분은
> `master` 브랜치의 `README` 를 읽어주세요.

**`React` + `TypeScript` 버전**입니다.

## 설치

```sh
# clone
원하는 브랜치를 선택 후 Download ZIP 혹은 git Clone

# dependencies 설치
`$ npm install`
```

## 개발 및 빌드

### 개발

[개발중인 익스텐션을 브라우저로 테스트하는 방법 (테스트와 디버깅 - 웨일 개발자센터)](https://developers.whale.naver.com/tutorials/debugging/)

```sh
# 빌드
`$ npm run build-dev`(개발용 빌드)

# Reloader 사용
`$ npm run start`
```

Reloader 사용 시 페이지 코드를 변경하면 자동으로 확장앱이 리로드됩니다.

다만 `manifest` 나 `static` 디렉토리 변경 등 Reloader가 감지하지 못하거나,
작동해야 하는 상황에서 제대로 동작하지 않는 경우도 많으므로
자주 끄고 켜 주시기 바랍니다.

### 배포

```sh
# 빌드(배포용)
`$ npm run build`(배포용 빌드)
```

[스토어 등록 - 웨일 개발자센터](https://developers.whale.naver.com/distribution/)

## 파일 구조

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n 폴더
|
|- background/ - 백그라운드 스크립트 폴더
|- contentScript/ - Content Script 소스 폴더
|- optionPage/ - 옵션 페이지 소스 폴더 (`browser_action`)
|- popupPage/ - 확장앱 팝업 페이지 소스 폴더 (`browser_action`)
|- sidebarPage/ - 사이드바앱 페이지 소스 폴더 (`sidebar_action`)
|
|- manifest-browser_action.json - `browser_action`용 manifest 프로필
|- manifest-sidebar_action.json - `sidebar_action`용 manifest 프로필
|- manifest.json - 확장앱 manifest (위 두 프로필 중 하나로 설정)

static/ - 정적 폴더
|- icon/ - 아이콘 폴더
|- img/ - 이미지 폴더
|
|- optionPage.html - 옵션 페이지 코드 참조용 html 파일 (`browser_action`)
|- popupPage.html - 확장앱 페이지 코드를 참조하는 데 필요한 html 파일 (`browser_action`)
|- sidebarPage.html - 사이드바앱 페이지 코드를 참조하는 데 필요한 html 파일 (`sidebar_action`)
```

몇몇 항목 뒤에 붙은 `browser_action` 이나 `sidebar_action` 은
해당 보일러플레이트 버전에만 기본 설정돼있는 항목이라는 의미입니다.

- `manifest.json` 에서 사용할 파일은 빌드 결과를 기준으로 작성하셔야 합니다.
- `manifest.json` 의 `version` 값은 웹팩 빌드 시 `package.json` 의 버전 정보로
  채워넣게 돼있으니 따로 작성하실 필요가 없습니다.

> `webpack.config.js`의 코드 중 `CopyWebpackPlugin` 플러그인을 다루는 부분을 참고해주세요.

- i18n(다국어 지원)은 [chrome.i18n API 설명(영문)](https://developer.chrome.com/extensions/i18n)을 참고해주세요.

## 개발에 도움 될 만한 내용

[**whale-extension-boilerplate/master/#개발에 도움 될 만한 내용**](https://github.com/mate131909/whale-extension-boilerplate/tree/master#%EA%B0%9C%EB%B0%9C%EC%97%90-%EB%8F%84%EC%9B%80-%EB%90%A0-%EB%A7%8C%ED%95%9C-%EB%82%B4%EC%9A%A9)

## 그 외

기본 예시로 들어간 이미지 출처 :

- 아이콘: [Document icon](https://www.iconfinder.com/icons/211657/document_icon) (Ionicons)
- Sample Image: [Image icon](https://www.iconfinder.com/icons/211677/image_icon) (Ionicons)
