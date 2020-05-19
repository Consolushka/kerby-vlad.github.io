var selectFirst = document.querySelector(".comparison-form__select.comparison-form__select--first");
var selectSecond = document.querySelector(".comparison-form__select.comparison-form__select--second");

var CountriesCount = Object.keys(CountriesList).length;


var utc = new Date();
utc = utc.toJSON().substr(0, 11) + '00:00:00Z';

var d = new Date();
d.setDate(d.getDate() - 10);
d = d.toJSON().substr(0, 11) + '00:00:00Z';

var FirstCountryOption;
var SecondCountryOption;
let FirstCData={};
let SecondCData={};
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
    Compare(FirstCData, SecondCData);
  });
});

if (Cookies.get('theme') === 'reverse') {
  primarycolor = '#e7e7e7';
  secondarycolor = '#333333';
  body.classList.add('reverse');
}

//Загрузка странн

for (var i = 1,j=1; i <= CountriesCount; i++, j++) {
  var option = document.createElement("option");
  var CountryCode = Object.keys(CountriesList)[i];
  option.setAttribute("value", CountryCode);
  option.setAttribute("class", "comparison-form__select-option");
  option.innerHTML = CountriesList[CountryCode];
  var option2 = document.createElement("option");
  option2.setAttribute("value", CountryCode);
  option2.setAttribute("class", "comparison-form__select-option");
  option2.innerHTML = CountriesList[CountryCode];
  selectFirst.appendChild(option);
  selectSecond.appendChild(option2);
}

selectFirst.removeChild(selectFirst.lastElementChild);
selectSecond.removeChild(selectSecond.lastElementChild);

//Получение первоначальной информации (РФ и США)

fetch('https://api.covid19api.com/country/' + "RU" + '?from=' + d + '&to=' + utc)
  .then((response) => {
    response.json()
      .then(function(response){
        for (var t = response.length - 1; t >= 0; t = t - 1) {
          var currentDate = response[t].Date[8] + response[t].Date[9] + '.' + response[t].Date[5] + response[t].Date[6];
          if (FirstCData[currentDate]) {
            FirstCData[currentDate] += response[t].Confirmed;
          } else {
            FirstCData[currentDate] = response[t].Confirmed;
          }

          if (Object.keys(FirstCData).length > 11) {
            delete FirstCData[currentDate];
            break;
          }
        }
      })
  })
  .catch((response) => {
    console.log(response);
  });
console.log(FirstCData);
fetch('https://api.covid19api.com/country/' + "US" + '?from=' + d + '&to=' + utc)
  .then((response) => {
    response.json()
      .then(function(response){
        for (var t = response.length - 1; t >= 0; t = t - 1) {
          var currentDate = response[t].Date[8] + response[t].Date[9] + '.' + response[t].Date[5] + response[t].Date[6];
          if (SecondCData[currentDate]) {
            SecondCData[currentDate] += response[t].Confirmed;
          } else {
            SecondCData[currentDate] = response[t].Confirmed;
          }

          if (Object.keys(SecondCData).length > 11) {
            delete SecondCData[currentDate];
            break;
          }
        }
      })
  })
  .catch((response) => {
    console.log(response);
  });
console.log(SecondCData);

//Слушатель изменений полей

selectFirst.addEventListener("change", function () {
  var selectedOptionFirst = selectFirst.options[selectFirst.selectedIndex];
  FirstCountryOption = selectedOptionFirst;
  var selectedContryCodeFirst = selectedOptionFirst.value;
  console.log(selectedContryCodeFirst, FirstCountryOption);
  fetch('https://api.covid19api.com/country/' + selectedContryCodeFirst + '?from=' + d + '&to=' + utc)
    .then((response) => {
      response.json()
        .then(FirstCountryData)
    })
    .catch((response) => {
      console.log(response);
    });
});

selectSecond.addEventListener("change", function () {
  var selectedOptionSecond = selectSecond.options[selectSecond.selectedIndex];
  SecondCountryOption = selectedOptionSecond;
  var selectedContryCodeSecond = selectedOptionSecond.value;
  console.log(selectedContryCodeSecond);
  fetch('https://api.covid19api.com/country/' + selectedContryCodeSecond + '?from=' + d + '&to=' + utc)
    .then((response) => {
      response.json()
        .then(SecondCountryData)
    })
    .catch((response) => {
      console.log(response);
    });
});

//Получение информации для выбранных странн

function FirstCountryData(response){
  console.log(response);
  FirstCData={};
  for (var t = response.length - 1; t >= 0; t = t - 1) {
    var currentDate = response[t].Date[8] + response[t].Date[9] + '.' + response[t].Date[5] + response[t].Date[6];
    if (FirstCData[currentDate]) {
      FirstCData[currentDate] += response[t].Confirmed;
    } else {
      FirstCData[currentDate] = response[t].Confirmed;
    }

    if (Object.keys(FirstCData).length > 11) {
      delete FirstCData[currentDate];
      break;
    }
  }
  console.log(FirstCData);
  if(Object.keys(FirstCData).length===0 || Object.keys(SecondCData).length===0){
    alert("Не располагаем информацией по данной стране");
  }
  else {
    Compare(FirstCData,SecondCData);
  }
}

function SecondCountryData(response){
  console.log(response);
  SecondCData={};
  for (var t = response.length - 1; t >= 0; t = t - 1) {
    var currentDate = response[t].Date[8] + response[t].Date[9] + '.' + response[t].Date[5] + response[t].Date[6];
    if (SecondCData[currentDate]) {
      SecondCData[currentDate] += response[t].Confirmed;
    } else {
      SecondCData[currentDate] = response[t].Confirmed;
    }

    if (Object.keys(SecondCData).length > 11) {
      delete SecondCData[currentDate];
      break;
    }
  }
  console.log(SecondCData);
  if(Object.keys(FirstCData).length===0 || Object.keys(SecondCData).length===0){
    alert("Не располагаем информацией по данной стране");
  }
  else {
    Compare(FirstCData,SecondCData);
  }
}

//Рисовка графика

function Compare(FirstCData,SecondCData) {
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawStuff);

  function drawStuff() {
    var data = google.visualization.arrayToDataTable([
      ["Год", FirstCountryOption.text, SecondCountryOption.text],
      [Object.keys(FirstCData)[9], FirstCData[Object.keys(FirstCData)[9]], SecondCData[Object.keys(FirstCData)[9]]],
      [Object.keys(FirstCData)[8], FirstCData[Object.keys(FirstCData)[8]], SecondCData[Object.keys(FirstCData)[8]]],
      [Object.keys(FirstCData)[7], FirstCData[Object.keys(FirstCData)[7]], SecondCData[Object.keys(FirstCData)[7]]],
      [Object.keys(FirstCData)[6], FirstCData[Object.keys(FirstCData)[6]], SecondCData[Object.keys(FirstCData)[6]]],
      [Object.keys(FirstCData)[5], FirstCData[Object.keys(FirstCData)[5]], SecondCData[Object.keys(FirstCData)[5]]],
      [Object.keys(FirstCData)[4], FirstCData[Object.keys(FirstCData)[4]], SecondCData[Object.keys(FirstCData)[4]]],
      [Object.keys(FirstCData)[3], FirstCData[Object.keys(FirstCData)[3]], SecondCData[Object.keys(FirstCData)[3]]],
      [Object.keys(FirstCData)[2], FirstCData[Object.keys(FirstCData)[2]], SecondCData[Object.keys(FirstCData)[2]]],
      [Object.keys(FirstCData)[1], FirstCData[Object.keys(FirstCData)[1]], SecondCData[Object.keys(FirstCData)[1]]],
      [Object.keys(FirstCData)[0], FirstCData[Object.keys(FirstCData)[0]], SecondCData[Object.keys(FirstCData)[0]]]
    ]);

    var viewport = "320";
    var fontsize = "10";

    if(document.documentElement.clientWidth>900){
      if(document.documentElement.clientWidth>1200){
        fontsize = "20";
        viewport="1200";
      }
      else{
        viewport="900";
        fontsize = "18";
      }
    }
    var options = {
      width: viewport,
      lineWidth: 7,
      title: 'Сравнение стран',
      backgroundColor: primarycolor,
      titleTextStyle: {
        color: secondarycolor //Подпись Главная
      },
      colors: ["#d94158","#419cd9"],//Цвет линий графика
      vAxis: {
        minValue: 0,
        textStyle: {
          color: secondarycolor,
          fontSize: fontsize// Подпись цифр
        },
        gridlines: {
          color: secondarycolor //Линии
        }
      },
      hAxis: {
        textStyle: {
          color: secondarycolor,//Подпись года
          fontSize: fontsize
        }
      },
      legend: {
        textStyle: {
          color: secondarycolor,// Подпись к линиям
          fontSize: fontsize
        }
      }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('myCanvas'));
    chart.draw(data, options);
  }
}

Compare(FirstCData,SecondCData);
