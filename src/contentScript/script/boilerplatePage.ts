// Inject JavaScript
// manifest - content_script 항목의 matches 에 해당하는 사이트에 접속했을 때,
// 페이지에 삽입할 스크립트 내용입니다.
//
// 이 파일의 파일명 및 내용은 예시용이니,
// 필요하시다면 이를 참고해 자유롭게 원하는 기능을 구현해주세요.
//
// contentScript 를 변경할때 염두해두어야하는 부분은 다음과 같습니다.
// - `src/contentScript/` 디렉터리(현위치) 내 파일명
// - (페이지 스크립트의 경우) `src/manifest.json`의 `content_scripts`
// - webpack.config.js 의 entry 및 WebpackExtensionReloader

console.log("whale-extension-boilerplate contentScript test");
alert("whale-extension-boilerplate contentScript test");
