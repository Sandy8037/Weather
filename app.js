(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('WeatherAppController', WeatherAppController)
// .controller('WeatherDataController', WeatherDataController)
.service('WeatherAppService', WeatherAppService);

WeatherAppController.$inject = ['WeatherAppService'];
function WeatherAppController(WeatherAppService) {
  var setPin = this;

  setPin.zipCode = "";
  setPin.apiKey = "b1b15e88fa797225412429c1c50c122a1";
  setPin.getPin = function () {
    var promise = WeatherAppService.getPin(setPin.zipCode, setPin.apiKey);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
}

// WeatherDataController.$inject = ['WeatherAppService'];
// function WeatherDataController(WeatherAppService) {
//   var getWeather = this;
//
//   getWeather.temperature = WeatherAppService.getWeatherInfo();
// }

// function WeatherAppService() {
//   var service = this;
//   var response = "";
//   service.getPin = function (zipCode, apiKey) {
//     console.log("1");
//     httpRequest = new XMLHttpRequest();
//     console.log(httpRequest);
//     if (!httpRequest) {
//       console.log("can't create XMLHttpRequest");
//     }
//     httpRequest.onreadystatechange = function () {
//       try {
//         if (httpRequest.readyState === XMLHttpRequest.DONE) {
//           if (httpRequest.status === 200) {
//             response = JSON.parse(httpRequest.responseText);
//             console.log("JSON converted to javascript object");
//           }
//           else {
//             console.log("problem with the request");
//           }
//         }
//       } catch (e) {
//         console.log("caught exception:" + e);
//       }
//     };
//
//     httpRequest.open('GET', "http://samples.openweathermap.org/data/2.5/weather?zip=" + zipCode +",us&appid=" + apiKey);
//     httpRequest.send();
//   }
//
//   service.getWeatherInfo = function () {
//     return response;
//   };
//
// }

WeatherAppService.$inject = ['$http'];
function WeatherAppService($http) {
  var service = this;

  service.getPin = function (zipCode, apiKey) {
    var response = $http({
      method: "GET",
      url: ("http://samples.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" +apiKey)
    });

    return response;
  };
}

})();
