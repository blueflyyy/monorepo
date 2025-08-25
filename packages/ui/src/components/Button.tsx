import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  setup(props, { slots }) {
    return () => (
      <button class="button">
        {slots.default ? slots.default() : 'Button'}
      </button>
    );
  }
});
