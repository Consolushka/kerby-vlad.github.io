let link = document.querySelector(".region__info-link");
var body = document.querySelector("body");

//Тема

var primarycolor = "#333333";
var secondarycolor = "#e7e7e7";

if(body.classList.contains("reverse")){
  primarycolor = '#e7e7e7';
  secondarycolor = '#333333';
}

var themeToggle = document.querySelectorAll('.btn--theme');

themeToggle.forEach(function(toggle, i, themeToggle) {
  toggle.addEventListener('click', function () {
    if (body.classList.contains('reverse')) {
      meta.content="#333333";
      primarycolor = '#e7e7e7';
      secondarycolor = '#333333';
      Cookies.set('theme', 'regular');
      body.classList.remove('reverse');
    } else {
      meta.content="#e7e7e7";
      primarycolor = '#333333';
      secondarycolor = '#e7e7e7';
      body.classList.add('reverse');
      Cookies.set('theme', 'reverse');
    }
    drawRussia();
  });
});

if (Cookies.get('theme') === 'reverse') {
  primarycolor = '#e7e7e7';
  secondarycolor = '#333333';
  body.classList.add('reverse');
}

//

window.onload = function() {
  fetch('scripts/with-regions.json').then(function(response) {
    response.json().then(drawRussia);
  });
};

function drawRussia(data) {
  var viewport = "320";

  if(document.documentElement.clientWidth>900){
    if(document.documentElement.clientWidth>1200){
      viewport="1200";
    }
    else{
      viewport="900";
    }
  }

  new RussianMap({
    viewPort: data.viewPort,
    mapId: 'russian-map',
    width: viewport,
    height: 497,
    // дефолтовые атрибуты для контуров регионов
    defaultAttr: {
      fill: secondarycolor, // цвет которым закрашивать
      stroke: primarycolor, // цвет границы
      'stroke-width': 1, // ширина границы
      'stroke-linejoin': 'round' // скруглять углы
    },
    mouseMoveAttr: {
      fill: '#ed4040'
    },
    onMouseMove: function(event) {
      if (document.documentElement.clientWidth>900){
        document.querySelector(".region__name").classList.remove("none");
      }
      var name = this.region.name;
      showName(name);
    },
    onMouseOut: function(event){
      document.querySelector(".region__name").classList.add("none");
    },
    onMouseClick: function(event) {
      var name = this.region.name;
      getLink(name);
    }
  }, data.regions);
}

function showName(name){
  link.classList.remove("animation");
  document.querySelector(".region__name").style.left =String(window.event.clientX)+"px";
  document.querySelector(".region__name").style.top = String(window.event.clientY)+'px';
  document.querySelector(".region__name").textContent = name;
}

function getLink(name) {
  link.textContent = name;
  link.href = RegionLinks[name];
  link.classList.add("animation");


}

function hideName() {
  document.querySelector(".region__name").style.display = "none;"
}
