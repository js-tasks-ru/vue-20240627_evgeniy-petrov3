import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherCard',
  setup() {
    function getTemperature(temp) {
      return (Math.round((temp - 273.15) * 10) / 10).toFixed(1);
    }

    function isTooLate(sunset, sunrise, time) {
      let timeMidnight = '00:00';
      if (time > timeMidnight && time < sunrise) {
        return true;
      }
      return time < timeMidnight && time > sunset;

    }

    return {
      icons: WeatherConditionIcons,
      getTemperature,
      isTooLate,
    }
  },
  props: {
    item: {}
  },

  template: `
    <li class="weather-card"
        :class="{ 'weather-card--night':  isTooLate(item.current.sunset, item.current.sunrise, item.current.dt) }">
    <div v-if="item.alert" class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span><br/>
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
      <div class="weather-conditions__icon" :title="item.current.weather.description">
        {{ icons[item.current.weather.id] }}️
      </div>
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
  `
})
