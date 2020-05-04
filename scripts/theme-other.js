var themeToggle = document.querySelector('.btn--theme');
var body = document.querySelector('body');
themeToggle.addEventListener('click', function () {
  if (body.classList.contains('reverse')) {
    primarycolor = '#333333';
    secondarycolor = '#e7e7e7';
    Cookies.set('theme', 'regular');
    body.classList.remove('reverse');
  } else {
    primarycolor = '#e7e7e7';
    secondarycolor = '#333333';
    body.classList.add('reverse');
    Cookies.set('theme', 'reverse');
  }
});
