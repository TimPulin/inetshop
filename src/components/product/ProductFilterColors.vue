<template>
  <ul class="colors">
    <li class="colors__item" v-for="obj in uniqColors" :key="obj.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color"
        :value="obj.code"
        :checked="obj.id === colorFavoriteId"
        @input="sendSelectedValue(obj.id)"
        >
        <span class="colors__value" :style="{ 'background-color': obj.code }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['uniqColors', 'colorFavoriteId'],
    emits: ['update:colorFavoriteId'],
    methods: {
      sendSelectedValue(value) {
        this.$emit('update:colorFavoriteId', value);
      },
    },
  };

</script>
