import {computed, defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const action = ref('');
    const result = computed(() => {
      if (action.value === 'sum') {
        return firstOperand.value + secondOperand.value;
      }
      if (action.value === 'subtract') {
        return firstOperand.value - secondOperand.value;
      }
      if (action.value === 'multiply') {
        return firstOperand.value * secondOperand.value;
      }
      if (action.value === 'divide') {
        return firstOperand.value / secondOperand.value;
      }
    });

    return {
      result,
      action,
      firstOperand,
      secondOperand,
    }

  },

  template: `
    <div class="calculator">
    <input type="number" aria-label="First operand" v-model="firstOperand"/>

    <div class="calculator__operators">
      <label><input type="radio" name="operator" value="sum" v-model="action"/>➕</label>
      <label><input type="radio" name="operator" value="subtract" v-model="action"/>➖</label>
      <label><input type="radio" name="operator" value="multiply" v-model="action"/>✖</label>
      <label><input type="radio" name="operator" value="divide" v-model="action"/>➗</label>
    </div>

    <input type="number" aria-label="Second operand" v-model="secondOperand"/>

    <div>=</div>

    <output>{{ result }}</output>
    </div>
  `,
})
