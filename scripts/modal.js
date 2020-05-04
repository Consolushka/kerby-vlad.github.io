var btnwrapper = document.querySelector('.btn-wrapper');
console.log(btnwrapper);

var btn = document.querySelector(".btn--open");
var modal = document.querySelector(".modal");

btnwrapper.addEventListener('click',function () {
    if(modal.classList.contains('modal--open')){
        modal.classList.remove('modal--open');
        btn.classList.remove('btn--close');
    }
    else{
        modal.classList.add('modal--open');
        btn.classList.add('btn--close');
    }
})