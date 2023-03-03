import BaseFormField from '@/components/base/BaseFormField.vue';

  export default {
    props: ['title', 'error', 'placeholder', 'value'],
    components: { BaseFormField },
    computed: {
      localValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
  }
