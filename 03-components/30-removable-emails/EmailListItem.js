import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
      index: Number,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['removeEmail:index'],

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click="$emit('removeEmail')">❌</button>
    </li>
  `,
})
