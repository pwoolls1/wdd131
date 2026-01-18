let selectElem = document.querySelector('#themeSelect');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
  let current = selectElem.value;

  if (current === 'dark') {
    document.body.classList.add('dark');
  } else if (current === 'light') {
    document.body.classList.remove('dark');
  }
}