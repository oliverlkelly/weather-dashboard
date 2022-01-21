var searchBox = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn");
var locationDate = document.querySelector("#locationDate");
var tTemp = document.querySelector("#tTemp");
var tWind = document.querySelector("#tWind");
var tHumid = document.querySelector("#tHumid");
var tuv = document.querySelector("#tuv");
var fiveDays = document.querySelector(".fiveDays");

var city;
var cityHistory;
var appID = "6bf490b8fe0c71916ca8e76e4a98d42c";
var apiURLCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appID;
var apiURLOneCall;
var cityAPICall;
var oneCallAPICall;
var fiveDay;

function getStorage(){
    if(localStorage.getItem("cityHistory") === null){
        cityHistory = [];

    }
    else{
        cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    }
}

function setCity(){
    city = searchBox.value.toLowerCase();
    apiURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}`;
}

function callCityAPI(){
    fetch(apiURLCity, {
        method: 'GET',
        redirect: 'follow',
    })
        .then(function(response){
            if(response.status >= 200 && response.status <= 299){
                return response.json();
            }
            else{
                throw Error(response.statusText);
            }
        })
        .then(function(data){
            cityAPICall = data;
            callOneCall(cityAPICall.coord.lon, cityAPICall.coord.lat);
            console.log(cityAPICall);

        })
        .catch(function(error){
            window.confirm(`${error}\nPlease enter a valid city.`);
        })
}
function callOneCall(lon, lat){
    if(!(cityHistory.includes(city))){
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }
    else{
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }
    apiURLOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=`+appID;
    fetch(apiURLOneCall, {
        method: 'GET',
        redirect: 'follow',
    })
        .then(function(response){
            if(response.status >= 200 && response.status <= 299){
                return response.json();
            }
            else{
                throw Error(response.statusText);
            }
        })
        .then(function(data){
            oneCallAPICall = data;
            populateData();
        })
        .catch(function(error){
            console.log(error);
        })
}

function populateData(){
    var apiCity = oneCallAPICall.timezone.split("/").pop();
    var date = new Date(oneCallAPICall.current.dt * 1000);
    var 
    fiveDay = oneCallAPICall.daily;
    locationDate.innerHTML = `${apiCity} (${moment(date).format("M/D/YYYY")})`;
    tTemp.innerHTML = `Temp: ${oneCallAPICall.current.temp}°F`;
    tWind.innerHTML = `Wind: ${oneCallAPICall.current.wind_speed} MPH`;
    tHumid.innerHTML = `Humidity: ${oneCallAPICall.current.humidity}%`;
    tuv.innerHTML = `UV Index: `;
    $(`<div class="uvIndex">${oneCallAPICall.current.uvi}</div>`).appendTo(tuv);
    for(i = 1; i<6; i++){
        var dayDate = new Date(fiveDay[i].dt * 1000);
        $(`<div class="dayCard">
        <h4>(${moment(dayDate).format("M/D/YYYY")})</h4>
        <img src="https://openweathermap.org/img/wn/${fiveDay[i].weather[0].icon}.png">
        <p>Temp: ${fiveDay[i].temp.day}°F</p>
        <p>Wind: ${fiveDay[i].wind_speed} MPH</p>
        <p>Humidity: ${fiveDay[i].humidity}%</p>
        </div>`).appendTo(fiveDays);
    }

}

function clickButton(){
    setCity();
    callCityAPI();
}

getStorage();
searchBtn.addEventListener("click", function(){
    clickButton();
});