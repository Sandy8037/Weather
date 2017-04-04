(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('WeatherAppController', WeatherAppController)
.service('WeatherAppService', WeatherAppService);

WeatherAppController.$inject = ['WeatherAppService'];
function WeatherAppController(WeatherAppService) {
  var setPin = this;

  setPin.zipCode = "";
  setPin.apiKey = "8aac5eca7b6f8108";
  setPin.getPin = function () {
    var promise = WeatherAppService.getPin(setPin.zipCode, setPin.apiKey);

    promise.then(function (response) {
      setPin.city = response.data.location.city;
      setPin.state = response.data.location.state;
      setPin.city = setPin.city.split(' ').join('_');
      setPin.getTemp();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setPin.getTemp = function () {
    var promise = WeatherAppService.getTemp(setPin.apiKey, setPin.city, setPin.state);

    promise.then(function (response) {
      setPin.city = response.data.current_observation.display_location.city;
      setPin.state = response.data.current_observation.display_location.state;
      setPin.temperature = response.data.current_observation.temp_f;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

WeatherAppService.$inject = ['$http'];
function WeatherAppService($http) {
  var service = this;

  service.getPin = function (zipCode, apiKey) {
    var response = $http({
      method: "GET",
      url: "http://api.wunderground.com/api/" + apiKey + "/geolookup/q/" + zipCode + ".json"
    });

    return response;
  };

  service.getTemp = function (apiKey, city, state) {
    var response = $http({
      method: "GET",
      url: "http://api.wunderground.com/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json"
    });

    return response;
  };
}

})();
