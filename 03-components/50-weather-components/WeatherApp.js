import {defineComponent} from 'vue/dist/vue.esm-bundler.js'
import WeatherList from "./WeatherList";

export default defineComponent({
  name: 'WeatherApp',
  components: {
    WeatherList,
  },
  template: `
    <div>
    <WeatherList/>
    </div>
  `,
})
