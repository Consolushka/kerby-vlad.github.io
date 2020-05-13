let DateObject = {};

fetch('https://api.covid19api.com/summary')
  .then((response) => {
    response.json()
      .then(buildMap);
  })
  .catch((response) => {
    console.log(response);
  });
//function (element, code, region) {
//                 var message = 'You clicked "'
//                     + region
//                     + ': ' + countryData[code].TotalConfirmed;
//
//                 alert(message);
//             }


var primarycolor = '#333333';
var secondarycolor = '#e7e7e7';
var body = document.querySelector('body');

if (Cookies.get('theme') === 'reverse') {
  primarycolor = '#e7e7e7';
  secondarycolor = '#333333';
  body.classList.add('reverse');
}

//Переключение темы

var themeToggle = document.querySelectorAll('.btn--theme');

themeToggle.forEach(function(toggle, i, themeToggle) {
  toggle.addEventListener('click', function () {
    var WM = document.querySelector('.window__map');
    var JWM = $(".window__map");
    var Jbody = $("body");
    console.log(Jbody);
    if (body.classList.contains('reverse')) {
      primarycolor = '#333333';
      secondarycolor = '#e7e7e7';
      Cookies.set('theme', 'regular');
      body.classList.remove('reverse');
      WM.style.backgroundColor = primarycolor;
    } else {
      primarycolor = '#e7e7e7';
      secondarycolor = '#333333';
      body.classList.add('reverse');
      Cookies.set('theme', 'reverse');
      WM.style.backgroundColor = primarycolor;
    }
    Histogramm();
  });
});


//


var btnwrapper = document.querySelector('.btn-wrapper');
var btn = document.querySelector(".btn--open");
var modal = document.querySelector(".modal");

function MenuOpen() {
  btnwrapper.addEventListener('click', function () {
    if (modal.classList.contains('modal--open')) {
      modal.classList.remove('modal--open');
      btn.classList.remove('btn--close');
    } else {
      modal.classList.add('modal--open');
      btn.classList.add('btn--close');
    }
  })
}

MenuOpen();

//Информация по миру
function GlobalData(data) {
  let CasesField, RecoveredField, DeathField;

  CasesField = $(document.querySelector("#Cases"));
  RecoveredField = $(document.querySelector("#Recovered"));
  DeathField = $(document.querySelector("#Deaths"));

  CasesField.text(data.Global.TotalConfirmed);
  RecoveredField.text(data.Global.TotalRecovered);
  DeathField.text(data.Global.TotalDeaths);
}

//Общая информация по стране
function CountryData(country) {
  let CountryName, CasesField, RecoveredField, DeathField;

  console.log(country);

  CountryName = $(document.querySelector("#countryName"));
  CasesField = $(document.querySelector("#Cases"));
  RecoveredField = $(document.querySelector("#Recovered"));
  DeathField = $(document.querySelector("#Deaths"));

  CountryName.text(CountriesList[country.CountryCode]);
  CasesField.text(country.TotalConfirmed);
  RecoveredField.text(country.TotalRecovered);
  DeathField.text(country.TotalDeaths);
}


var utc = new Date();
utc = utc.toJSON().substr(0, 11) + '00:00:00Z';

var d = new Date();
d.setDate(d.getDate() - 10);
d = d.toJSON().substr(0, 11) + '00:00:00Z';

//Название страны

function GetCountry(code) {
  fetch('https://api.covid19api.com/country/' + code + '?from=' + d + '&to=' + utc)
    .then((response) => {
      response.json()
        .then(GetCountryData)
    })
    .catch((response) => {
      console.log(response);
    });
}


//

//Получение Информации страны по датам
function GetCountryData(response) {
  DateObject={};

  for (var t = response.length - 1; t >= 0; t = t - 1) {
    var currentDate = response[t].Date[8] + response[t].Date[9] + '.' + response[t].Date[5] + response[t].Date[6];
    if (DateObject[currentDate]) {
      DateObject[currentDate] += response[t].Confirmed;
    } else {
      DateObject[currentDate] = response[t].Confirmed;
    }

    if (Object.keys(DateObject).length > 11) {
      delete DateObject[currentDate];
      break;
    }
  }
  Histogramm();
  return DateObject;
}

//

//РИСОВАНИЕ
function Histogramm() {
  google.charts.load('current', {'packages': ['bar']});
  google.charts.setOnLoadCallback(drawStuff);

  var color = "#e7e7e7";

  function drawStuff() {
    var DatesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var count = 0;
    for (var i in DateObject) {
      DatesArray[count] = i;
      count++;
    }

    var data = new google.visualization.arrayToDataTable([
      ['', 'Зарегестрировано случаев заболевания'],
      [DatesArray[9], DateObject[DatesArray[9]]],
      [DatesArray[8], DateObject[DatesArray[8]]],
      [DatesArray[7], DateObject[DatesArray[7]]],
      [DatesArray[6], DateObject[DatesArray[6]]],
      [DatesArray[5], DateObject[DatesArray[5]]],
      [DatesArray[4], DateObject[DatesArray[4]]],
      [DatesArray[3], DateObject[DatesArray[3]]],
      [DatesArray[2], DateObject[DatesArray[2]]],
      [DatesArray[1], DateObject[DatesArray[1]]],
      [DatesArray[0], DateObject[DatesArray[0]]]
    ]);

    var options = {
      width: 350,
      legend: {position: 'none'},
      chart: {
        title: 'График заражаемости',
        subtitle: 'По последним 10 календарным дням'
      },
      bar: {groupWidth: "90%"},
      backgroundColor: secondarycolor,
      animation: {
        duration: 1
      },
      chartArea:{
        backgroundColor: secondarycolor
      },
      colors: [primarycolor],
      axes: {
        x: {
          side: 'bottom',
          label: 'Кол-во зараженных на определенный день'
        }
      }
    };

    var chart = new google.charts.Bar(document.getElementById('myCanvas'));
    // Convert the Classic options to Material options.
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

//

//Работа карты
function buildMap(data) {
  let sampleData = {}, countryData = {};

  data.Countries.forEach((item) => {
    let cc = item.CountryCode.toLowerCase();
    countryData[cc] = item;
    sampleData[cc] = item.TotalConfirmed;
  });

  GlobalData(data);


  jQuery(document).ready(function () {
    jQuery('#vmap').vectorMap({
      map: 'world_en',
      backgroundColor: primarycolor,
      hoverOpacity: 0.5,
      enableZoom: true,
      showTooltip: true,
      selectedColor: '#1A1A1A',
      scaleColors: ['#FF8F8C', '#93010A'],
      values: sampleData,
      normalizeFunction: 'polynomial',
      onRegionClick: function (event, code, region) {
        modal.classList.add('modal--open');
        btn.classList.add('btn--close');
        CountryData(countryData[code]);
        GetCountry(code);
      },
      onLabelShow: function (event, label, code) {
        label.text(countryData[code].Country + ' (' + countryData[code].TotalConfirmed + ')');
      }
    });

  });
}
