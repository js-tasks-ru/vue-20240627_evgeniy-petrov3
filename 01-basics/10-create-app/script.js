import {defineComponent, createApp} from 'vue/dist/vue.esm-bundler.js';

const App = defineComponent({
  name: 'Today',
  setup() {
    const today = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });
    return {
      today
    }
  },
  template: '<div>Сегодня {{ today }}</div>'
});

createApp(App).mount('#app');
