var body = document.querySelector('body');
var meta;
var metas = document.getElementsByTagName('meta');
for(var i=0;i<metas.length;i++){
  if(metas[i].name==="theme-color"){
    meta=metas[i];
    console.log(meta);
  }
}
if (Cookies.get('theme')==='reverse'){
  meta.content="#e7e7e7";
  console.log(meta);
  body.classList.add(Cookies.get('theme'));
  body.classList.remove('regular');
}
else{
  console.log(meta);
  body.classList.add(Cookies.get('theme'));
  body.classList.remove('reverse');
}
