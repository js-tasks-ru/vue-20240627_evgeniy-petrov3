import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const min = 1;
    const max = 5;
    const current = ref(1);
    const disabledUp = computed(() => {
      return current.value === max;
    })
    const disabledDown = computed(() => {
      return current.value === min;
    });
    const meetUp = ref('');
    const setMeetUp = async () => {
        if (current.value >= min && current.value <= max) {
          meetUp.value = await getMeetup(current.value);
        }
    };
    watch(current, ()=> {
      setMeetUp();
    });
    onMounted(() => {
      setMeetUp();
    });

    return {
      meetUp,
      current,
      disabledUp,
      disabledDown,
      max
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="disabledDown" @click="current--">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="itemId in max">
            <input
              :id="'meetup-id-'+ itemId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="itemId"
              v-model="current"
              :checked="itemId === current"
            />
            <label :for="'meetup-id-'+ itemId" class="radio-group__label">{{ itemId }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="disabledUp" @click="current++">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetUp.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
