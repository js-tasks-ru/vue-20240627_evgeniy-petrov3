import {computed, defineComponent} from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const min = 0;
    const max = 5;
    const count = ref(min);
    const disabledUp = computed(() => {
      return count.value === max;
    })
    const disabledDown = computed(() => {
      return count.value === min;
    })
    function increment() {
      if (count.value < max) {
        count.value++;
      }
    }
    function decrement() {
      if (count.value > min) {
        count.value--;
      }
    }

    return {
      count,
      increment,
      decrement,
      disabledUp,
      disabledDown
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="disabledDown"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="increment"
        :disabled="disabledUp"
      >➕</button>
    </div>
  `,
})
