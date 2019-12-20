# 사이드바 방문기록 (웨일 확장프로그램 보일러플레이트 예제)

웨일 확장프로그램 보일러플레이트
[`boilerplate/react_typescript-sidebar_action`](https://github.com/mate131909/whale-extension-boilerplate/tree/boilerplate/react_typescript-sidebar_action)
로 만들어진 '사이드바 방문기록' 예제입니다.

[`whale-extension-boilerplate` GitHub Repository 링크](https://github.com/mate131909/whale-extension-boilerplate)

## 미리보기

![한국어, 기본](https://user-images.githubusercontent.com/51040091/70382060-174f8700-1999-11ea-8dc6-42daad4d1a87.PNG)

![한국어, 다크모드](https://user-images.githubusercontent.com/51040091/70382052-fe46d600-1998-11ea-9a31-c70be74accd6.PNG)

![영어, 기본](https://user-images.githubusercontent.com/51040091/70382213-a067bd80-199b-11ea-89b6-486c2c10e703.PNG)

모양 및 색상 등은
웨일 내 방문 기록 페이지(`whale://history/`) 와
설정 페이지(`whale://settings/`)를 참고했습니다.

## 적용된 기능

- 다국어 지원 - 한국어, 영어
- 다크모드 지원 - 웨일 다크모드 설정을 따라갑니다

## 설치

직접 설치해보고 싶으신 분은 다음 과정을 따라주세요.

> 상세한 안내는 `whale-extension-boilerplate` 를 참고 바랍니다.

```sh
# clone
Download ZIP 혹은 git Clone

# dependencies 설치
`$ yarn install`

# 빌드
`$ yarn build-dev`(개발용 빌드) or `$ yarn start` (whale-extension-boilerplate Repository 참고)
```

브라우저로 로드하는 방법 참고 :
[테스트와 디버깅 - 웨일 개발자센터](https://developers.whale.naver.com/tutorials/debugging/)
(`dist/` 폴더를 로드하시면 됩니다)

## 파일 구조

간단한 설명만 적어두었으니,
자세한 내용은 `whale-extension-boilerplate` 및 소스 폴더에서 직접 확인해주세요.

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n(다국어 지원)용 - 한국어, 영어를 지원합니다
|
|- sidebarPage/ - 사이드바 페이지 소스 폴더
| |- common/ - 공용으로 사용되는 React Component 를 관리하는 폴더
| |
| |- pages/ - 사용자에게 보여질 큰 컴포넌트를 관리하는 폴더
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

- 사용된 이미지 출처
  - 아이콘 출처: [Clock Icon](https://www.iconfinder.com/icons/211606/clock_icon) (Ionicons)
  - `img/arrow-down.svg` 출처: [Chevron, down icon](https://www.iconfinder.com/icons/211645/chevron_down_icon) (Ionicons)
