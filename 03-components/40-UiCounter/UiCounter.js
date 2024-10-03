import { computed, defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },
  props: {
    min: Number,
    max: Number,
    count: Number
  },
  emits:['update:count']
  ,

  setup(props) {
    const propCount = computed(() => {
      return props.count;
    })
    const propMin = props.min ? props.min : 0;
    const propMax = props.max;
    function disabledUp() {
      return propCount.value === propMax;
    }
    function disabledDown() {
      return propCount.value === propMin;
    }
    function increment(count) {
      return count+1;
    }
    function decrement(count) {
      return count-1;
    }

    return {
      increment,
      decrement,
      disabledUp,
      disabledDown,
      propCount
    }
  },

  template: `
    <div class="counter">
    <UiButton aria-label="Decrement" :disabled="disabledDown()" @click="$emit('update:count', decrement(count))">➖</UiButton>
    <span class="count" data-testid="count">{{ propCount }}</span>
    <UiButton aria-label="Increment" :disabled="disabledUp()" @click="$emit('update:count', increment(count))">➕</UiButton>
    </div>
  `,
})
