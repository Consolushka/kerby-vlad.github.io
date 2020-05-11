let link = document.querySelector(".region__info-link");

window.onload = function() {
  fetch('../source/scripts/with-regions.json').then(function(response) {
    response.json().then(function(data) {
      new RussianMap({
        viewPort: data.viewPort,
        mapId: 'russian-map',
        width: 862,
        height: 497,
        // дефолтовые атрибуты для контуров регионов
        defaultAttr: {
          fill: '#333333', // цвет которым закрашивать
          stroke: '#e7e7e7', // цвет границы
          'stroke-width': 1, // ширина границы
          'stroke-linejoin': 'round' // скруглять углы
        },
        mouseMoveAttr: {
          fill: '#123123'
        },
        onMouseMove: function(event) {
          document.querySelector(".region__name").classList.remove("none");
          var name = this.region.name;
          showName(name);
        },
        onMouseOut: function(event){
          document.querySelector(".region__name").classList.add("none");
          console.log("erwer");
        },
        onMouseClick: function(event) {
          var name = this.region.name;
          getLink(name);
        }
      }, data.regions);
    });
  });
};

function showName(name){
  document.querySelector(".region__name").style.left =String(window.event.clientX)+"px";
  document.querySelector(".region__name").style.top = String(window.event.clientY)+'px';
  document.querySelector(".region__name").textContent = name;
}

function getLink(name) {
  link.href = RegionLinks[name];
  console.log(RegionLinks[name]);

}

function hideName() {
  document.querySelector(".region__name").style.display = "none;"
}
