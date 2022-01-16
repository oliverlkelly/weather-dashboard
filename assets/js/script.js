var searchBox = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn");
var city;
var cityHistory;
var appID = "6bf490b8fe0c71916ca8e76e4a98d42c";
var apiURLCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appID;
var apiURLOneCall;
var cityAPICall;
var oneCallAPICall;

function getStorage(){
    if(localStorage.getItem("cityHistory") === null){
        cityHistory = [];

    }
    else{
        cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    }
}

function setCity(){
    city = searchBox.value;
    apiURLCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appID;
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
        })
        .catch(function(error){
            console.log(error);
        })
}

function clickButton(){
    console.log("clicked");
    setCity();
    callCityAPI();
    if(cityAPICall !== undefined){
        callOneCall(cityAPICall.coord.lon, cityAPICall.coord.lat);
    }
}

getStorage();
searchBtn.addEventListener("click", function(){
    clickButton();
});