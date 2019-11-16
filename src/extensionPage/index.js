

// just example for locale support in vanilla javascript. feel free to modify
// 단순 locale 지원 예시입니다. 자유롭게 수정하세요.

window.onload = () => {
  const localeTitle = document.getElementById('locale-title')

  localeTitle.innerText = whale.i18n.getMessage('title');
};
