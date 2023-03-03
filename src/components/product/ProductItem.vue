<template>
  <li class="catalog__item">
    <div>
      <router-link class="catalog__pic"
        :to="{name: 'product', params: {id: product.id}}"
      >
      <img :src="product.img.src" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>
  </div>
  <ul class="colors colors--black">
      <ProductItemColors
        :product="product"
        :name="name"
      />
  </ul>
</li>
</template>

<script>
  import gotoPage from '@/helpers/gotoPage';
  import numberFormat from '@/helpers/numberFormat';
  import ProductItemColors from './ProductItemColors.vue';

  export default {
    props: ['product', 'name'],
    components: { ProductItemColors },
    data() {
      return {
        firstColor: this.product.itemColors[0],
      };
    }, // data
    methods: {
      gotoPage,
    }, // methods
    filters: {
      numberFormat,
    }, // filters
  };
</script>
