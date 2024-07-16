import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup () {
    const weatherData = getWeatherData();
    const icons = WeatherConditionIcons;
    function getTemperature(temp) {
      return (Math.round((temp - 273.15) * 10) / 10).toFixed(1);
    }
    function existAlert(name) {
        for (let i = 0; i< getWeatherData().length; i++) {
          if (getWeatherData()[i].alert && name === getWeatherData()[i].geographic_name)
            return true;
        }
        return false;
    }
    function isTooLate(sunset, sunrise, time) {
        let timeSunset = Date.parse('Thu, 01 Jan 1970 ' + sunset + ':00');
        let timeSunrise = Date.parse('Thu, 01 Jan 1970 ' + sunrise + ':00');
        let timeNow = Date.parse('Thu, 01 Jan 1970 ' + time + ':00');
        let timeMidnight = Date.parse('Thu, 01 Jan 1970 00:00:00');
        if (timeNow > timeMidnight && timeNow < timeSunrise) {
          return 'weather-card--night';
        }
        if (timeNow < timeMidnight && timeNow > timeSunset) {
          return 'weather-card--night';
        }
        return '';
    }
    return {
      data: weatherData,
      icons: icons,
      getTemperature,
      existAlert,
      isTooLate,
    }

  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in data" class="weather-card" :class ="isTooLate(item.current.sunset, item.current.sunrise, item.current.dt)">
          <div v-if="existAlert(item.geographic_name)" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span  class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span><br/>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description" >{{ icons[item.current.weather.id] }}️</div>
            <div class="weather-conditions__temp">{{ getTemperature(item.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(item.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
