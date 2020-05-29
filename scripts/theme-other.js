var themeToggle = document.querySelectorAll('.btn--theme');
var body = document.querySelector('body');
themeToggle.forEach(function(toggle, i, themeToggle){
  toggle.addEventListener('click', function () {
    console.log("lcick");
    if (body.classList.contains('reverse')) {
      meta.content="#333333";
      primarycolor = '#333333';
      secondarycolor = '#e7e7e7';
      Cookies.set('theme', 'regular');
      body.classList.remove('reverse');
    } else {
      meta.content="#e7e7e7";
      primarycolor = '#e7e7e7';
      secondarycolor = '#333333';
      body.classList.add('reverse');
      Cookies.set('theme', 'reverse');
    }
  });
});

