window.addEventListener("load", function(){
    setCities();
});

class WeatherForecast {
    constructor(main, temperature, feelsLike, windSpeed, humidity, icon) {
      this.Main = main;
      this.Temperature = temperature;
      this.FeelsLike = feelsLike;
      this.WindSpeed = windSpeed;
      this.Humidity = humidity;
      this.Icon = icon;
    }
}

let citiesSelectElement = document.getElementById("cities");

let container = document.getElementById("mainInputContainer");

let apiKey = "";

let cities = [ "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "K.maraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce" ];

let date = new Date();

let weatherDictionary = { 
    "Thunderstorm" : "Fırtınalı",
    "Drizzle" : "Çiseleme",
    "Rain" : "Yağmurlu",
    "Snow" : "Karlı",
    "Atmosphere" : "Atmosfer",
    "Clear" : "Açık",
    "Clouds" : "Bulutlu",
  };

function setCities(){
    cities.forEach(function(item, index, array){
    var optionElementToCreate = document.createElement("option");
        optionElementToCreate.setAttribute("value", item);
        optionElementToCreate.innerText = item;
        citiesSelectElement.appendChild(optionElementToCreate);
    });
}


function getWeatherForecastByCity(city){
    $.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q=${ city }&appid=${ apiKey }`, function(data, status){
        console.log(data);    
        
        console.log(data.weather[0].main);

        var weatherForecast = new WeatherForecast(data.weather[0].main, data.main.temp, data.main.feels_like, data.wind.speed, data.main.humidity, data.weather[0].icon);
        
        makeCard(weatherForecast);
    });
}

function deleteCards(){
    if(container.childNodes.length>0){
        container.childNodes.forEach(p=>p.remove());
    }
}

function makeCard(weatherForecast){

    deleteCards();

    var htmlCard = `
    <div class="row">
        <div class="col-8 row">
            <div class="col-12"><h3 class="fw-light">${ citiesSelectElement.value }</h1></div>
                <div class="col-12"><h3 class="fw-light">${ date.getHours() }:${ date.getMinutes() }</h1></div>
                <div class="col-12"><h3 class="fw-light">${ weatherDictionary[weatherForecast.Main] }</h1></div>
                <div class="col-6">
                    <img src="images/WeatherMapIcons/${ weatherForecast.Icon }.png" class="align-top"/>
                    <h1 class="d-inline align-top" style="font-size: 4rem;">${ weatherForecast.Temperature }</h1>ºC
                </div>
            </div>
            <div class="col-4 row">
                <div class="col-12">
                <h5 class="fw-light">Nem: %${ weatherForecast.Humidity }</h5>
                </div><div class="col-12">
                <h5 class="fw-light">Rüzgar Hızı: ${ weatherForecast.WindSpeed }</h5>
            </div>
        </div>
    </div>
    `;


    container.innerHTML = htmlCard;
}