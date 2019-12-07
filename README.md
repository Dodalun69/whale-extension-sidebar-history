# Whale Extension Boilerplate

React, TypeScript 가 적용된
웨일 사이드바앱(`sidebar_action`)
보일러플레이트입니다.

[보일러플레이트 다른 버전 목록](https://github.com/mate131909/whale-extension-boilerplate)

## 개발에 도움 될 만한 내용

[**whale-extension-boilerplate/master/#개발에 도움 될 만한 내용**](https://github.com/mate131909/whale-extension-boilerplate/tree/master#%EA%B0%9C%EB%B0%9C%EC%97%90-%EB%8F%84%EC%9B%80-%EB%90%A0-%EB%A7%8C%ED%95%9C-%EB%82%B4%EC%9A%A9)

## 파일 구조

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n 폴더
|
|- background/ - 백그라운드 스크립트 폴더
|
|- contentScript/ - Content Script 소스 폴더
|- sidebarPage/ - 사이드바앱 페이지 소스 폴더
|
|- manifest.json - 확장앱 manifest (`sidebar_action` 설정)

static/ - 정적 폴더
|- icon/ - 아이콘 폴더
|
|- img/ - 이미지 폴더
|
|- sidebarPage.html - 사이드바앱 페이지 코드를 참조하는 데 필요한 html 파일
```

기본 예시로 들어간 이미지 출처 :

- 아이콘: [Document icon](https://www.iconfinder.com/icons/211657/document_icon) (Ionicons)
- Sample Image: [Image icon](https://www.iconfinder.com/icons/211677/image_icon) (Ionicons)
