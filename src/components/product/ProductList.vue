<template>
  <ul class="catalog__list">
      <ProductItem v-for="product in products"
        :key="product.id"
        :product="product"
        :name="makeName(product)"
      />
  </ul>
</template>

<script>
  import ProductItem from './ProductItem.vue';

  export default {
    props: ['products'],
    components: { ProductItem },
    methods: {
      makeName(product) {
        return `color-${product.id}`;
      },
    },
  };
</script>
