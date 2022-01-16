var searchBox = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn");
var city;
var cityHistory = [];
var appID = "6bf490b8fe0c71916ca8e76e4a98d42c";
var apiURLCity = `api.openweathermap.org/data/2.5/weather?q="${city}"&appid="${appID}"`;

function setCity(){
    city = searchBox.value;
    apiURL = `api.openweathermap.org/data/2.5/weather?q="${city}"&appid="${appID}"`;
}

searchBtn.addEventListener("click", function(){
    setCity();
});