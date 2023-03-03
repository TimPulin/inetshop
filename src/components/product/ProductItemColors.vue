<template>
  <ul class="colors colors--black">
    <li class="colors__item"
      v-for="(color, index) in product.itemColors"
      :key="index"
      :color="color"
      :name="name"
    >
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
          :name="name"
          :value="color"
          v-model="picked"
        >
        <span class="colors__value" :style="{'background-color': color}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['product', 'name'],
  data() {
    return {
      picked: this.product.itemColors[0],
    };
  },

};

</script>
