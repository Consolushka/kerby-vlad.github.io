var body = document.querySelector('body');
if (Cookies.get('theme')==='reverse'){
  body.classList.add(Cookies.get('theme'));
  body.classList.remove('regular');
}
else{
  body.classList.add(Cookies.get('theme'));
  body.classList.remove('reverse');
}
