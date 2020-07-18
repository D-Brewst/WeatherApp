var cityName = localStorage.getItem("city");
refresh();
var currentCities = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(currentCities);
// if(JSON.parse(localStorage.getItem("cities"))){
//   currentCities = JSON.parse(localStorage.getItem("cities")); 
  for(var i = 0; i < currentCities.length; i++){
    var btn = $("<button>");
    btn.text(currentCities[i]);
    btn.addClass("cities");
    $("#btns").append(btn);
  }
// }

$("#search").on("click", (event) => getWeather(event));

function getWeather(event) {
  console.log("hi");
  event.preventDefault();
  $(".green").removeClass("green");
  var cityName = $("#city").val();      
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=03db9957cc3df2d4c78bce1e3642f5ab` + `&units=imperial`
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var iconurl=`https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
    var iconurl1=`https://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
    var iconurl2=`https://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
    var iconurl3=`https://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
    var iconurl4=`https://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
    var iconurl5=`https://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
    console.log(response);
    if(currentCities === []){
      currentCities.push(response.city.name);
      localStorage.setItem("cities", JSON.stringify(currentCities));
      var button = $("<button>");
      button.text(response.city.name);
      button.addClass("cities");
      $("#btns").append(button);
      currentCities = JSON.parse(localStorage.getItem("cities"));
      $(".cities").each(function(index){
        $(this).on("click", btnClick);
      })
    }
    if(!currentCities.includes(response.city.name)){
      currentCities.push(response.city.name);
      localStorage.setItem("cities", JSON.stringify(currentCities));
      var button = $("<button>");
      button.text(response.city.name);
      button.addClass("cities");
      $("#btns").append(button);
      $(".cities").each(function(index){
        $(this).on("click", btnClick);
      })
    }
    $("#cityName").text(response.city.name);
    $('#img').attr('src', iconurl);
    $("#temp").text("Temperature: " + response.list[0].main.temp + " °F");
    $("#humidity").text("Humidity: " + response.list[0].main.humidity);
    $("#wind").text("Wind Speed: " + response.list[0].wind.speed + " m/s");
    $("#date").text(response.list[0].dt_txt);
    $("#date1").text(response.list[7].dt_txt);
    $("#date2").text(response.list[15].dt_txt);
    $("#date3").text(response.list[23].dt_txt);
    $("#date4").text(response.list[31].dt_txt);
    $("#date5").text(response.list[39].dt_txt);
    $("#img1").attr('src', iconurl1);
    $("#img2").attr('src', iconurl2);
    $("#img3").attr('src', iconurl3);
    $("#img4").attr('src', iconurl4);
    $("#img5").attr('src', iconurl5);
    $("#temp1").text("Temperature: " + response.list[7].main.temp + " °F");
    $("#temp2").text("Temperature: " + response.list[15].main.temp + " °F");
    $("#temp3").text("Temperature: " + response.list[23].main.temp + " °F");
    $("#temp4").text("Temperature: " + response.list[31].main.temp + " °F");
    $("#temp5").text("Temperature: " + response.list[39].main.temp + " °F");
    $("#humidity1").text("Humidity: " + response.list[7].main.humidity);
    $("#humidity2").text("Humidity: " + response.list[15].main.humidity);
    $("#humidity3").text("Humidity: " + response.list[23].main.humidity);
    $("#humidity4").text("Humidity: " + response.list[31].main.humidity);
    $("#humidity5").text("Humidity: " + response.list[39].main.humidity);
    localStorage.setItem("city", cityName);
    
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    console.log(lon);
    console.log(lat);
    var query=`https://api.openweathermap.org/data/2.5/uvi?appid=03db9957cc3df2d4c78bce1e3642f5ab&lat=${lat}&lon=${lon}`
    $.ajax({
      url: query,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#UV").text(response.value); 
      var numUV = parseFloat(response.value);
      console.log(numUV);
      if(numUV < 3){
        $("#UV").css("background-color", "lawngreen");
      }
      if(numUV>3 && numUV<5){
        $("#UV").css("background-color", "yellow");
      }
      if(numUV>5 && numUV<8){
        $("#UV").css("background-color", "red");
      }
      if(numUV>8){
        $("#UV").css("background-color", "darkred");
        $("#UV").css("color", "white");
      }
    })

  });
        
}

function refresh(){
  $(".green").removeClass("green");
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=03db9957cc3df2d4c78bce1e3642f5ab` + `&units=imperial`
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var iconurl=`https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
    var iconurl1=`https://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
    var iconurl2=`https://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
    var iconurl3=`https://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
    var iconurl4=`https://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
    var iconurl5=`https://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
    console.log(response);
    $("#cityName").text(response.city.name);
    $('#img').attr('src', iconurl);
    $("#temp").text("Temperature: " + response.list[0].main.temp + " °F");
    $("#humidity").text("Humidity: " + response.list[0].main.humidity);
    $("#wind").text("Wind Speed: " + response.list[0].wind.speed + " m/s");
    $("#date").text(response.list[0].dt_txt);
    $("#date1").text(response.list[7].dt_txt);
    $("#date2").text(response.list[15].dt_txt);
    $("#date3").text(response.list[23].dt_txt);
    $("#date4").text(response.list[31].dt_txt);
    $("#date5").text(response.list[39].dt_txt);
    $("#img1").attr('src', iconurl1);
    $("#img2").attr('src', iconurl2);
    $("#img3").attr('src', iconurl3);
    $("#img4").attr('src', iconurl4);
    $("#img5").attr('src', iconurl5);
    $("#temp1").text("Temperature: " + response.list[7].main.temp + " °F");
    $("#temp2").text("Temperature: " + response.list[15].main.temp + " °F");
    $("#temp3").text("Temperature: " + response.list[23].main.temp + " °F");
    $("#temp4").text("Temperature: " + response.list[31].main.temp + " °F");
    $("#temp5").text("Temperature: " + response.list[39].main.temp + " °F");
    $("#humidity1").text("Humidity: " + response.list[7].main.humidity);
    $("#humidity2").text("Humidity: " + response.list[15].main.humidity);
    $("#humidity3").text("Humidity: " + response.list[23].main.humidity);
    $("#humidity4").text("Humidity: " + response.list[31].main.humidity);
    $("#humidity5").text("Humidity: " + response.list[39].main.humidity);
    localStorage.setItem("city", $("#cityName").text());

    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    console.log(lon);
    console.log(lat);
    var query=`https://api.openweathermap.org/data/2.5/uvi?appid=03db9957cc3df2d4c78bce1e3642f5ab&lat=${lat}&lon=${lon}`
    $.ajax({
      url: query,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#UV").text(response.value);
      var numUV = parseFloat(response.value);
      if(numUV < 3){
        $("#UV").css("background-color", "lawngreen");
      }
      if(numUV>3 && numUV<5){
        $("#UV").css("background-color", "yellow");
      }
      if(numUV>5 && numUV<8){
        $("#UV").css("background-color", "red");
      }
      if(numUV>8){
        $("#UV").css("background-color", "darkred");
        $("#UV").css("color", "white");
      }
    })
  });
}



$(".cities").each(function(index){
  $(this).on("click", btnClick);
})

function btnClick(event){
  $(".green").removeClass("green");
  var cityName = $(this).html();
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=03db9957cc3df2d4c78bce1e3642f5ab` + `&units=imperial`
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var iconurl=`https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
    var iconurl1=`https://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
    var iconurl2=`https://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
    var iconurl3=`https://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
    var iconurl4=`https://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
    var iconurl5=`https://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
    console.log(response);
    $("#cityName").text(response.city.name);
    $('#img').attr('src', iconurl);
    $("#temp").text("Temperature: " + response.list[0].main.temp + " °F");
    $("#humidity").text("Humidity: " + response.list[0].main.humidity);
    $("#wind").text("Wind Speed: " + response.list[0].wind.speed + " m/s");
    $("#date").text(response.list[0].dt_txt);
    $("#date1").text(response.list[7].dt_txt);
    $("#date2").text(response.list[15].dt_txt);
    $("#date3").text(response.list[23].dt_txt);
    $("#date4").text(response.list[31].dt_txt);
    $("#date5").text(response.list[39].dt_txt);
    $("#img1").attr('src', iconurl1);
    $("#img2").attr('src', iconurl2);
    $("#img3").attr('src', iconurl3);
    $("#img4").attr('src', iconurl4);
    $("#img5").attr('src', iconurl5);
    $("#temp1").text("Temperature: " + response.list[7].main.temp + " °F");
    $("#temp2").text("Temperature: " + response.list[15].main.temp + " °F");
    $("#temp3").text("Temperature: " + response.list[23].main.temp + " °F");
    $("#temp4").text("Temperature: " + response.list[31].main.temp + " °F");
    $("#temp5").text("Temperature: " + response.list[39].main.temp + " °F");
    $("#humidity1").text("Humidity: " + response.list[7].main.humidity);
    $("#humidity2").text("Humidity: " + response.list[15].main.humidity);
    $("#humidity3").text("Humidity: " + response.list[23].main.humidity);
    $("#humidity4").text("Humidity: " + response.list[31].main.humidity);
    $("#humidity5").text("Humidity: " + response.list[39].main.humidity);
    localStorage.setItem("city", $("#cityName").text());

    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    console.log(lon);
    console.log(lat);
    var query=`https://api.openweathermap.org/data/2.5/uvi?appid=03db9957cc3df2d4c78bce1e3642f5ab&lat=${lat}&lon=${lon}`
    $.ajax({
      url: query,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#UV").text(response.value); 
      var numUV = parseFloat(response.value);
      if(numUV < 3){
        $("#UV").css("background-color", "lawngreen");
      }
      if(numUV>3 && numUV<5){
        $("#UV").css("background-color", "yellow");
      }
      if(numUV>5 && numUV<8){
        $("#UV").css("background-color", "red");
      }
      if(numUV>8){
        $("#UV").css("background-color", "darkred");
        $("#UV").css("color", "white");
      }
    })
  });
}
      