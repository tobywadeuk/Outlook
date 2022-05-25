let regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });
let olLocation = document.getElementById("olLocation");
let olTime = document.getElementById("olTime");
let olWind = document.getElementById("olWind");
let olCloud = document.getElementById("olCloud");
let olRain = document.getElementById("olRain");
let OlSunrise = document.getElementById("OlSunrise");
let OlSunset = document.getElementById("OlSunset");
let OlHumidity = document.getElementById("OlHumidity");
let forecastOneTime = document.getElementById("forecastOneTime");
let forecastOneIcon = document.getElementById("forecastOneIcon");
let forecastOneTemp = document.getElementById("forecastOneTemp");
let forecastTwoTime = document.getElementById("forecastTwoTime");
let forecastTwoIcon = document.getElementById("forecastTwoIcon");
let forecastTwoTemp = document.getElementById("forecastTwoTemp");
let forecastThreeTime = document.getElementById("forecastThreeTime");
let forecastThreeIcon = document.getElementById("forecastThreeIcon");
let forecastThreeTemp = document.getElementById("forecastThreeTemp");
let forecastFourTime = document.getElementById("forecastFourTime");
let forecastFourIcon = document.getElementById("forecastFourIcon");
let forecastFourTemp = document.getElementById("forecastFourTemp");
let forecastFiveTime = document.getElementById("forecastFiveTime");
let forecastFiveIcon = document.getElementById("forecastFiveIcon");
let forecastFiveTemp = document.getElementById("forecastFiveTemp");
let maindesc = document.getElementById("maindesc");
let maintemp = document.getElementById("maintemp");
let mainfeelslike = document.getElementById("mainfeelslike");
let mainicon = document.getElementById("mainicon");
let searchbutton = document.getElementById("searchbutton");
let searchinput = document.getElementById("searchinput");
let cloudEmojis = ["🌤", "⛅", "🌥", "☁"];
let d = new Date();
// localStorage.chosenLocation = "Madrid";
let chosenLocation = localStorage.chosenLocation;

let arrEmojis = ["⚡", "🌧", "🌧", "🌨", "💨", "🌞", "🌥"];

let arrNames = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Atmosphere",
  "Clear",
  "Clouds",
];

let cloudNames = [
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "overcast clouds",
];

let daysArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function fetchCurentWeather() {
  try {
    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        chosenLocation +
        "&appid=12324ae286065bd66e63f9bb7ecbe1fa&units=metric"
    );
    return await response.json();
  } catch {
    console.log("error");
  }
}

fetchCurentWeather().then((weather) => {
  let cwDay = d.getDay();
  let cwDate = d.getDate();
  let cwMonth = d.getMonth();
  let cwHours = d.getHours();
  let cwMinutes = d.getMinutes();
  let cwYear = d.getFullYear();
  let cwMainDesc = weather.weather[0].main;
  let cwSubDesc = weather.weather[0].description;
  let cwDesc = weather.weather[0].description;
  let cwTemp = weather.main.temp;
  let cwFeels = weather.main.feels_like;
  let cwWind = weather.wind.speed;
  let cwClouds = weather.clouds.all;
  let cwRise = weather.sys.sunrise;
  let cwSet = weather.sys.sunset;
  let cwHumidity = weather.main.humidity;
  let cwName = weather.name;
  let cwCode = weather.sys.country;

  //

  olLocation.textContent = cwName + ", " + regionNamesInEnglish.of(cwCode);
  olTime.textContent =
    daysArr[cwDay] +
    " " +
    cwDate +
    " " +
    monthsArr[cwMonth] +
    " " +
    cwYear +
    " | " +
    cwHours +
    ":" +
    addZero(cwMinutes);

  olWind.textContent = Math.round(cwWind) + " m/s";
  olCloud.textContent = cwClouds + "%";
  OlSunrise.textContent = format_time(cwRise + 7200).slice(0, 5);
  OlSunset.textContent = format_time(cwSet + 7200).slice(0, 5);
  OlHumidity.textContent = cwHumidity + "%";
  maindesc.textContent = Capitalize(cwDesc);
  maintemp.textContent = Math.round(cwTemp) + "°C";
  mainfeelslike.textContent = "feels like " + Math.round(cwFeels) + "°C";
  iconToWords(cwMainDesc, cwSubDesc, mainicon);
});

async function fetchForecast() {
  try {
    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        chosenLocation +
        "&appid=12324ae286065bd66e63f9bb7ecbe1fa&units=metric"
    );
    return await response.json();
  } catch {
    console.log("error");
  }
}

fetchForecast().then((forecast) => {
  let fPop = forecast.list[0].pop;
  let fDT0 = forecast.list[0].dt_txt;
  let fDT1 = forecast.list[1].dt_txt;
  let fDT2 = forecast.list[2].dt_txt;
  let fDT3 = forecast.list[3].dt_txt;
  let fDT4 = forecast.list[4].dt_txt;
  let fTemp0 = forecast.list[0].main.temp;
  let fTemp1 = forecast.list[1].main.temp;
  let fTemp2 = forecast.list[2].main.temp;
  let fTemp3 = forecast.list[3].main.temp;
  let fTemp4 = forecast.list[4].main.temp;
  let fMainDesc0 = forecast.list[0].weather[0].main;
  let fMainDesc1 = forecast.list[1].weather[0].main;
  let fMainDesc2 = forecast.list[2].weather[0].main;
  let fMainDesc3 = forecast.list[3].weather[0].main;
  let fMainDesc4 = forecast.list[4].weather[0].main;
  let fSubDesc0 = forecast.list[0].weather[0].description;
  let fSubDesc1 = forecast.list[1].weather[0].description;
  let fSubDesc2 = forecast.list[2].weather[0].description;
  let fSubDesc3 = forecast.list[3].weather[0].description;
  let fSubDesc4 = forecast.list[4].weather[0].description;

  //

  forecastOneTime.textContent = fDT0.slice(11, 16);
  forecastTwoTime.textContent = fDT1.slice(11, 16);
  forecastThreeTime.textContent = fDT2.slice(11, 16);
  forecastFourTime.textContent = fDT3.slice(11, 16);
  forecastFiveTime.textContent = fDT4.slice(11, 16);

  forecastOneTemp.textContent = Math.round(fTemp0) + "°C";
  forecastTwoTemp.textContent = Math.round(fTemp1) + "°C";
  forecastThreeTemp.textContent = Math.round(fTemp2) + "°C";
  forecastFourTemp.textContent = Math.round(fTemp3) + "°C";
  forecastFiveTemp.textContent = Math.round(fTemp4) + "°C";

  let iconArray = [
    forecastOneIcon,
    forecastTwoIcon,
    forecastThreeIcon,
    forecastFourIcon,
    forecastFiveIcon,
  ];

  let mainDescArray = [
    fMainDesc0,
    fMainDesc1,
    fMainDesc2,
    fMainDesc3,
    fMainDesc4,
  ];

  let subDescArray = [fSubDesc0, fSubDesc1, fSubDesc2, fSubDesc3, fSubDesc4];

  for (let i = 0; i < iconArray.length; i++) {
    iconToWords(mainDescArray[i], subDescArray[i], iconArray[i]);
  }

  olRain.textContent = fPop + "%";
});

function iconToWords(mainD, subD, icon) {
  for (let i = 0; i < arrNames.length; i++) {
    if (mainD == "Clouds") {
      for (let i = 0; i < cloudNames.length; i++) {
        if (subD == cloudNames[i]) {
          icon.textContent = cloudEmojis[i];
        }
      }
    } else if (mainD == arrNames[i]) {
      icon.textContent = arrEmojis[i];
    } else console.log("good error");
  }
}

function Capitalize(input) {
  let answer = input.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  return answer;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function format_time(s) {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "UTC",
  });

  return dtFormat.format(new Date(s * 1e3));
}

searchbutton.addEventListener("click", function () {
  chosenLocation = searchinput.value;
  localStorage.chosenLocation = chosenLocation;
  location.reload();
});
