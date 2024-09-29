import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData } from './weather.service.ts'
import WeatherCard from "./WeatherCard";
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherList',
  components: {
    WeatherCard
  },
  setup() {
    const weatherData = getWeatherData();
    return {
      data: weatherData,
    }
  },

  template: `
    <h1 class="title">Погода в Средиземье</h1>
    <ul class="weather-list unstyled-list">
    <WeatherCard v-for="item in data"
                 :item="item">
    </WeatherCard>
    </ul>
  `
})
