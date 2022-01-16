var searchBox = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn");
var city;
var cityHistory = [];
var appID = "6bf490b8fe0c71916ca8e76e4a98d42c";
var apiURLCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appID;
var apiURLOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=`+appID;
var cityAPICall;

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
            window.confirm("Please enter a valid city.");
        })
}
function callOneCall(lon, lat){

}

searchBtn.addEventListener("click", function(){
    setCity();
    cityAPICall = callCityAPI();
    if(cityAPICall !== undefined){

    }
});