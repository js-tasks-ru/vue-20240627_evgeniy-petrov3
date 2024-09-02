import {computed, defineComponent, ref, watch} from 'vue'
import { getMeetup } from './meetupsService.ts'
import {set} from "@vueuse/core";

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const min = 1;
    const max = 5;
    const current = ref(1);
    const input = ref('');
    const disabledUp = computed(() => {
      return current.value === max;
    })
    const disabledDown = computed(() => {
      return current.value === min;
    });
    const meetUp = ref(getMeetup(min).then(function (res) {
      meetUp.value = res;
    }));
    function setMeetUp(id) {
      if (current.value >= min && current.value <= max) {
        getMeetup(id).then(function (result) {
          meetUp.value = result;
        })
        current.value = id;
      }
    }
    function checked(itemId) {
      return itemId === current.value;
    }
    function setCount(id) {
      current.value = id;
    }
    watch(current, (id)=> {
      setMeetUp(id);
    })

    return {
      meetUp,
      current,
      disabledUp,
      disabledDown,
      input,
      max,
      checked,
      setCount
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="disabledDown" @click="setCount(current-1)">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="itemId in max">
            <input
              :id="'meetup-id-'+ itemId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="{{ itemId }}"
              :checked="checked(itemId)"
              @change="setCount(itemId)"
            />
            <label :for="'meetup-id-'+ itemId" class="radio-group__label">{{ itemId }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="disabledUp" @click="setCount(current+1)">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetUp.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
