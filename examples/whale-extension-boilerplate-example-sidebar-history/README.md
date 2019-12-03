# 사이드바 방문기록 (웨일 확장프로그램 보일러플레이트 예제)

`Whale-Extension-Boilerplate` 로 만들어진 예제입니다.(`boilerplate/react-typescript:sidebar_action` 브랜치 사용)

> [`Whale-Extension-Boilerplate` GitHub Repository 링크](https://github.com/mate131909/whale-extension-boilerplate)

`Whale-Extension-Boilerplate` 를 사용한 예제가 필요하신 분이나, 웨일 확장프로그램을 개발하는 분 등 누구든지 마음껏 사용해주세요.

## 적용된 기능

- 다국어 지원 - 한국어, 영어
- 다크모드 지원 - 웨일 다크모드 설정을 따라갑니다

## 설치

직접 설치해보고 싶으신 분은 다음 과정을 따라주세요.

> 다음 내용은 기본적인 내용만 적혀있으며, 상세 설정은 `Whale-Extension-Boilerplate` 에서 제공되는
> `React + TypeScript` 버전과 동일하니 참고 바랍니다.

```sh
# clone
Download ZIP 혹은 git Clone

# dependencies 설치
`$ yarn install`

# 빌드
`$ yarn build-dev`(개발용 빌드)
```

브라우저로 로드하는 방법 참고 :
[테스트와 디버깅 - 웨일 개발자센터](https://developers.whale.naver.com/tutorials/debugging/)
(`dist/` 폴더를 로드하시면 됩니다)

## 파일 구조

간단한 설명만 적어두었으니, 자세한 내용은 소스 폴더에서 직접 확인해주세요.

> 마찬가지로, 프로젝트 설정 상세 설명은 `Whale-Extension-Boilerplate` 의 README 를 참고해주세요.

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n(다국어 지원)용 - 한국어, 영어를 지원합니다
|
|- sidebarPage/ - 사이드바 페이지 소스 폴더
| |- common/ - 공용으로 사용되는 React Component 를 담아둔 폴더
| |
| |- pages/ - 커다란 컴포넌트를 담아둔 폴더
| |
| |- global.scss - 페이지 전체에서 사용되는 CSS 커스텀 속성 정의 (:root)
|
|- manifest.json - 확장앱 manifest

static/ - 정적 폴더
|- icon/ - 아이콘 폴더
|
|- img/ - 이미지 폴더
|
|- sidebarPage.html - 사이드바 페이지 코드를 참조하는 데 필요한 html 파일
```

[아이콘 출처](https://www.flaticon.com/free-icon/history_93652?term=history&page=1&position=17),
[`img/arrow-down.svg` 출처](https://www.flaticon.com/free-icon/arrow-down-sign-to-navigate_32195?term=arrow&page=1&position=20)

> [크롬 확장앱 manifest 문서](https://developer.chrome.com/extensions/manifest/icons)
> 에서 의무로 규정한 `16`, `48`, `128` 아이콘 크기를 맞추려 했으나,
> 아이콘 사이트에서 `48` 크기를 제공하지 않아 부득이하게
> `64` 크기 이미지를 `48` 크기로 사용했습니다.
> 따라서 살짝 잘려서 나타날 수 있습니다.
