var searchBox = document.getElementsByClassName("searchBox");
var searchBtn = document.getElementsByClassName("searchBtn");
var city;
var appID = "6bf490b8fe0c71916ca8e76e4a98d42c";
var apiURL = `api.openweathermap.org/data/2.5/weather?q="${city}"&appid="${appID}"`;

function(){
    city = searchBox.value;
    console.log(city);
}