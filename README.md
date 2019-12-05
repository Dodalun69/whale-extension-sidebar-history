# Whale Extension Boilerplate

> 보고 계신 브랜치는 보일러플레이트 관리용 브랜치입니다.
>
> 보일러플레이트 설명, 사용 방법 안내 등을 원하시는 분은
> `master` 브랜치의 `README` 를 읽어주세요.

**`React` + `TypeScript` 버전**

기본 예시로 들어간 이미지 출처 :

- 아이콘: [Document icon](https://www.iconfinder.com/icons/211657/document_icon) (Ionicons)
- Sample Image: [Image icon](https://www.iconfinder.com/icons/211677/image_icon) (Ionicons)

## 파일 구조

```md
dist/ - 빌드 결과 디렉터리

src/ - 소스파일 디렉터리
|- `_locales/` - i18n 폴더
|
|- background/ - 백그라운드 스크립트 폴더
|
|- popupPage/ - 확장앱 팝업 페이지 소스 폴더 (일반 확장앱 전용)
|- sidebarPage/ - 사이드바앱 페이지 소스 폴더 (사이드바앱 전용)
|
|- optionPage/ - 별도 페이지 소스 폴더
|
|- contentScript/ - Content Script 소스 폴더
|
|- manifest-sidebar_action.json - 사이드바앱용 manifest 프로필
|- manifest-browser_action.json - 일반 확장앱 manifest
|- manifest.json - 확장앱 manifest (편의상 사이드바앱용 프로필로 기본 설정)

static/ - 정적 폴더
|- icon/ - 아이콘 폴더
|
|- img/ - 이미지 폴더
|
|- popupPage.html - 확장앱 페이지 코드를 참조하는 데 필요한 html 파일
|- sidebarPage.html - 사이드바앱 페이지 코드를 참조하는 데 필요한 html 파일
|
|- optionPage.html - 별도 페이지 코드 참조용 html 파일
```
