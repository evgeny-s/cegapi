const axios = require('axios');

const {serviceResponses} = require('../consts/serviceResponses');

class WeatherService {
  async current() {
    const result = axios.get('https://openweathermap.org/current');

    return serviceResponses.SUCCESS(result.data);
  }
}

module.exports = new WeatherService();
