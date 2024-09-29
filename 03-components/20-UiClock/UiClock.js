import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const date = ref(getDate());
    let interval;
    onMounted(() => {
      interval = setInterval(function () {
        date.value = getDate();
      }, 1000);
    });
    onUnmounted(() => clearInterval(interval))

    function getDate() {
      return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    }

    return {
      date
    }
  },

  template: `<div class="clock" ref="interval">{{ date }}</div>`,
})
