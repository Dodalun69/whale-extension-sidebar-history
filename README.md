# Whale Extension Boilerplate

> 여러 보일러플레이트 코드가 섞이는 것을 방지하기 위해,
> 보고 계신 `master` 브랜치는 안내용으로만 이용하고 있습니다.
> 실제 보일러플레이트는 각 브랜치로 나뉘어지니, [#설치](#설치) 부분을 읽어주세요.

[웨일 브라우저(크로미움 기반)](https://whale.naver.com/ko/) 확장 프로그램 보일러플레이트입니다.

확장앱, \*사이드바앱 버전 모두 제공합니다.

_웨일 브라우저는 아직 만들어진 지 얼마 지나지 않았고 사용자 수도 많지 않아_
_확장앱의 수가 너무 부족합니다._

그러므로 보다 더 많은 확장앱이 올라올 수 있도록,
복잡한대신 더 많은 기능이 담긴 보일러플레이트보단
**간단해서 쉽게 쓸 수 있는 보일러플레이트**를 목표로 제작해보았습니다.

**하단에 [#개발에 도움 될 만한 내용](#개발에-도움-될-만한-내용)도 적어두었으니 참고해주세요.**

> 웨일 브라우저는 기존 크롬에 존재하던 확장앱(`browser_action`, `page_action`)에 더해,
> 웨일 전용 기능인 사이드바에 설치할 수 있는 \*사이드바 확장프로그램(`sidebar_action`)이 존재합니다.
>
> [사이드바 설명 - 웨일 헬프 센터](https://help.whale.naver.com/desktop/sidebar/))

## 제공하는 기능

확장앱 종류: 확장앱(`browser_action`), 사이드바앱(`sidebar_action`)

> `page_action` 은 `browser_action` 과 차이가 작아서 분리하지 않았습니다.
> `browser_action` 버전 보일러플레이트를 다운받고,
> `README` 의 `page_action 으로 변경` 부분을 참고해주세요.

라이브러리 : 현재 React 버전만 제공합니다.

> create-react-app 은 사용 시 보일러플레이트가 지나치게 복잡해질 우려가 있어 사용하지 않았습니다.

그 외 :

- [webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader) - 브라우저 확장앱 개발용으로 만들어진 웹팩 핫 리로드 미들웨어
- TypeScript (선택식)
- Eslint, Prettier - airbnb 스타일 기본 설정 (TypeScript에도 적용됩니다)

> TypeScript 에서 사용할 타입 패키지에 관한 내용은 하단의 [#TypeScript](#typescript)를 읽어주세요.

## 설치

먼저, 자신이 개발할 확장프로그램이 확장앱과 사이드바앱 중
어느 방식에 적합할지 충분히 고민한 후 결정해주세요.

- [**어떻게 생겼나요? - 확장앱** (들어가기 전에 - 웨일 개발자센터)](https://developers.whale.naver.com/getting_started/#%ED%99%95%EC%9E%A5%EC%95%B1)
- [**어떻게 생겼나요? - 사이드바앱** (들어가기 전에 - 웨일 개발자센터)](https://developers.whale.naver.com/getting_started/#%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%94%EC%95%B1)

이후 다음 표를 참고하여 알맞은 보일러플레이트를 다운로드 하시면 됩니다.

### 각 브랜치별 설명

| 브랜치                                      | 설명                                |
| ------------------------------------------- | ----------------------------------- |
| master                                      | (설치용이 아닙니다) README 용       |
| boilerplate/react:browser_action            | React 기반 확장앱                   |
| boilerplate/react:sidebar_action            | React 기반 사이드바앱               |
| boilerplate/react-typescript:browser_action | React, TypeScript 기반 확장앱       |
| boilerplate/react-typescript:sidebar_action | React, TypeScript 기반 사이드바앱   |
| 그 외                                       | (설치용이 아닙니다) 프로젝트 관리용 |

> 혼란을 최소화하기 위해 보일러플레이트가 아닌 브랜치도 간단히 설명을 적어두었으나,
> **`boilerplate/` 로 시작하는 브랜치만 보시면 됩니다.**

선택하신 후에는 다음과 같이 설치하시면 됩니다.

```sh
# clone
원하는 브랜치를 선택 후 Download ZIP 혹은 git Clone

# dependencies 설치
`$ yarn install`
```

## 개발 및 빌드

### 개발

[개발중인 익스텐션을 브라우저로 테스트하는 방법 (테스트와 디버깅 - 웨일 개발자센터)](https://developers.whale.naver.com/tutorials/debugging/)

```sh
# 빌드
`$ yarn build-dev`(개발용 빌드)

# Reloader 사용
`$ yarn start`
```

Reloader 사용시 페이지 코드 변경은 대부분 자동으로 반영됩니다.

하지만 `manifest` 파일 변경 등 Reloader 가 감지하지 못하는 상황에선 Reloader 를 끄고 다시 켜줘야하며,
소스 파일 경로 변경등으로 인해 빌드가 망가지면 자동으로 확장앱이 중지돼
웨일 브라우저 확장앱 관리자에서 '압축해제된 확장앱 추가' 단계부터 다시 진행해야하는 문제가 있습니다.

그러니 빌드가 망가질 우려가 있다면 Reloader 를 잠시 끄고 작업을 완료해주세요.

### 배포

```sh
# 빌드(배포용)
`$ yarn build`(배포용 빌드)
```

[스토어 등록 - 웨일 개발자센터](https://developers.whale.naver.com/distribution/)

## 파일 구조

각 보일러플레이트 브랜치에는 해당 보일러플레이트의 종류에 맞춰 서술돼있으니,
**각 보일러플레이트 브랜치의 README 파일을 보심을 권장드립니다.**

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
|- `popupPage/` or `sidebarPage/` - `확장앱 팝업/사이드바앱` 페이지 소스 폴더
|
|- `optionPage/` - 팝업 페이지에선 불가능한 작업을 위한 별도 페이지 소스 폴더 (`browser_action` 보일러플레이트에만 기본제공)
|
|- `contentScript/` - Content Script 소스 폴더 (`browser_action` 보일러플레이트에만 기본제공)
|
|- manifest.json - 확장앱 manifest

static/ - 정적 폴더
|- icon/ - 아이콘 폴더 (예시용)
|
|- img/ - 이미지 폴더 (예시용)
|
|- `popupPage.html` or `sidebarPage.html` - `확장앱 팝업/사이드바앱` 페이지 코드를 참조하는 데 필요한 html 파일
|- `optionPage.html` - 별도 페이지 코드 참조용 html 파일 (`browser_action` 보일러플레이트에만 기본제공)
```

- `manifest.json` 에서 사용할 파일은 빌드 결과를 기준으로 작성하셔야 합니다.
- `manifest.json` 의 `version` 값은 웹팩 빌드 시 `package.json` 의 버전 정보로
  채워넣게 돼있으니 따로 작성하실 필요가 없습니다.

> `webpack.config.js`의 코드 중 `CopyWebpackPlugin` 플러그인을 다루는 부분을 참고해주세요.

- i18n(다국어 지원)은 [chrome.i18n API 설명(영문)](https://developer.chrome.com/extensions/i18n)을 참고해주세요.
- 사이드바앱 버전에선 `optionPage` 와 `contentScript` 를 기본 제공하지 않는 이유는,
  해당 기능은 툴바 확장앱에선 대부분 이용하는 기능이지만 웨일 스토어에 등록된 사이드바앱들을 봤을때
  사이드바앱에선 그다지 이용하지 않는 기능으로 보여졌기 때문입니다. 원하시면 어렵지 않게 추가하실 수 있습니다.

## 개발에 도움 될 만한 내용

먼저, [웨일 개발자센터](https://developers.whale.naver.com/)에서
구현 예제에 더해 여러 팁 및 권장 사항 등 굉장히 유용한 정보가 많으니 꼭 참고하시길 바랍니다.

### 예제

#### 웨일 개발자센터 - 구현 예제

[웨일 개발자센터 - 구현 예제 페이지 링크](https://developers.whale.naver.com/tutorials/)

- 툴바에 버튼 추가하기
- 메시지 교환
- 사이드바앱 만들기
- 사이드바앱 심화학습
- 다운로드 다루기
- 북마크 다루기
- 확장앱에 단축키 설정하기
- 방문기록 다루기
- 콘텍스트 메뉴 사용하기

#### 웨일 스토어 내 오픈소스 확장 프로그램

_작성 필요_

### Whale API

#### sessions

[웨일 브라우저 API](https://developers.whale.naver.com/api/)에 따르면
`whale.sessions` 는 지원되지 않는 기능입니다.

하지만 `sessions.getDevices()` 함수는 정상 작동하는 것을 확인했으며, 따라서 타 sessions api 도 작동할 가능성이 높습니다.

다만 웨일측에서 '지원되지 않음' 이라 적어둔 만큼
무언가 오류 등이 존재할 가능성이 있습니다.

#### 스페이스 탭을 알아내는 방법

_작성 필요 (예제로 대신하는 것이 좋을듯)_

### TypeScript

[`@types/chrome`](https://www.npmjs.com/package/@types/chrome),
[`@types/naver-whale`](https://www.npmjs.com/package/@types/naver-whale)(공식 지원은 아닙니다)
모두 적용해두었으므로, 크롬과 웨일 양측에서 동일한 API라면
코드에서 `chrome.`, `whale.` 중 어떤 것을 사용하셔도 무방합니다.

또한 `@types/naver-whale`은 `@types/chrome`을 그대로 재정의한 방식이니,
두 타입을 섞어서 사용하시는 것도 문제 없습니다.

물론, 사이드바 등 웨일 전용 기능 API 는 `whale.` 에서만 제공됩니다.

추가로, `whale.` 로 작성할 경우엔 일부 도움말을 한글로 확인하실 수 있습니다.
