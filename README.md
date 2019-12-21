# Whale Extension Boilerplate

> **보고 계신 브랜치는 보일러플레이트 관리용 브랜치입니다.**
>
> 보일러플레이트 설명, 사용 방법 안내 등을 원하시는 분은
> `master` 브랜치의 `README` 를 읽어주세요.

**`React` + `TypeScript` 버전**입니다.

## 설치

먼저, 자신이 개발할 확장프로그램이 확장앱과 사이드바앱 중
어느 방식에 적합할지 충분히 고민한 후 결정해주세요.

- [**어떻게 생겼나요? - 확장앱** (들어가기 전에 - 웨일 개발자센터)](https://developers.whale.naver.com/getting_started/#%ED%99%95%EC%9E%A5%EC%95%B1)
- [**어떻게 생겼나요? - 사이드바앱** (들어가기 전에 - 웨일 개발자센터)](https://developers.whale.naver.com/getting_started/#%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%94%EC%95%B1)

이후 다음 표를 참고하여 알맞은 보일러플레이트를 다운로드 하시면 됩니다.

### 각 브랜치별 설명

| 브랜치                                        | 설명                                |
| --------------------------------------------- | ----------------------------------- |
| master                                        | (설치용이 아닙니다) README 용       |
| [boilerplate/react_typescript-browser_action] | React, TypeScript 기반 확장앱       |
| [boilerplate/react_typescript-sidebar_action] | React, TypeScript 기반 사이드바앱   |
| 그 외 (`management/*` 등)                     | (설치용이 아닙니다) 프로젝트 관리용 |

[boilerplate/react_typescript-browser_action]: https://github.com/mate131909/whale-extension-boilerplate/tree/boilerplate/react_typescript-browser_action
[boilerplate/react_typescript-sidebar_action]: https://github.com/mate131909/whale-extension-boilerplate/tree/boilerplate/react_typescript-sidebar_action

> 혼란을 최소화하기 위해 보일러플레이트가 아닌 브랜치도 간단히 설명을 적어두었으나,
> **`boilerplate/` 로 시작하는 브랜치만 보시면 됩니다.**

선택하신 후에는 다음과 같이 설치하시면 됩니다.

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

Reloader 사용시 페이지 코드 변경은 대부분 자동으로 반영됩니다.

하지만 `manifest` 파일 변경 등 Reloader 가 감지하지 못하는 상황에선 Reloader 를 끄고 다시 켜줘야하며,
소스 파일 경로 변경등으로 인해 빌드가 망가지면 자동으로 확장앱이 중지돼
웨일 브라우저 확장앱 관리자에서 '압축해제된 확장앱 추가' 단계부터 다시 진행해야하는 문제가 있습니다.

그러니 빌드가 망가질 우려가 있다면 Reloader 를 잠시 끄고 작업을 완료해주세요.

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
