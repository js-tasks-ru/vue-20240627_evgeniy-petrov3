import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const result = ref(0);
    const action = ref('');

    watch([() => action.value, () => firstOperand.value, () => secondOperand.value],  (val) => {
      if (val[0] === 'sum') {
        result.value = val[1] + val[2];
      }
      if (val[0] === 'subtract') {
        result.value = val[1] - val[2];
      }
      if (val[0] === 'multiply') {
        result.value = val[1] * val[2];
      }
      if (val[0] === 'divide') {
        result.value = val[1] / val[2];
      }
    })

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
