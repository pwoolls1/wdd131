// Normal JS — no export / import
console.log("script.js loaded"); // Debug line to make sure it's running

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