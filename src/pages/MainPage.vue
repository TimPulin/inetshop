<template>
  <div class="main-page">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter
        :categories="productsCategories"
        :uniq-colors="productsColors"
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-favorite-id.sync="filterColorFavoriteId"
      />

      <section class="catalog">

        <div class="loader">
          <img v-if="productsLoading" class="loader__message" src="../../public/img/gif/Moving blocks.gif" alt="изображение загрузчика страницы">
          <span v-if="productsLoadingFailed" class="loader__message">Ошибка при загрузке</span>
        </div>

        <ProductList
          :products="products"
        />

        <BasePagination v-model="pageCurrent"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </div>
</template>

<script>
  import ProductFilter from '@/components/product/ProductFilter.vue';
  import ProductList from '@/components/product/ProductList.vue';
  import BasePagination from '@/components/base/BasePagination.vue';
  import axios from 'axios';
  import API_BASE_URL from '@/config';
  import formatItemColors from '@/helpers/formatItemColors';

  export default {
    components: {
      ProductFilter,
      ProductList,
      BasePagination,
    },
    data() {
      return {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorFavoriteId: null,

        productsData: null,
        colorsData: null,
        categoriesData: null,

        pageCurrent: 1,
        productsPerPage: 3,

        productsLoading: false,
        productsLoadingFailed: false,
      };
    }, // data
    watch: {
      pageCurrent() {
        this.loadProducts();
      },
      filterPriceFrom() {
        this.loadProducts();
      },
      filterPriceTo() {
        this.loadProducts();
      },
      filterCategoryId() {
        this.loadProducts();
      },
      filterColorFavoriteId() {
        this.loadProducts();
      },
    },
    computed: {
      filtredProducts() {
        const filtredProducts = [];

        return filtredProducts;
      },
      products() {
        return this.productsData
        ? this.productsData.items.map((product) => (
          {
            ...product,
            img: {
              src: product.image.file.url,
            },
            itemColors: this.formatItemColors(product),
          }))
        : [];
      },
      productsColors() {
        return this.colorsData
          ? this.colorsData.items
          : [];
      },
      productsCategories() {
        return this.categoriesData
          ? this.categoriesData.items
          : [];
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0;
      },
    }, // computed
    methods: {
      formatItemColors,
      loadProducts() {
        this.productsLoading = true;
        this.productsLoadingFailed = false;
        clearTimeout(this.loadProductsTimer);

        this.loadProductsTimer = setTimeout(() => {
          axios.get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.pageCurrent,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorFavoriteId,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          })
        }, 0)
      },
      loadProductsColors() {
        axios.get(`${API_BASE_URL}/api/colors`)
          .then((response) => {
            this.colorsData = response.data;
          })
      },
      loadProductsCategories() {
        axios.get(`${API_BASE_URL}/api/productCategories`)
          .then((response) => {
            this.categoriesData = response.data;
          })
      },
    }, // methods
    created() {
      this.loadProducts();
      this.loadProductsColors();
      this.loadProductsCategories();
    },
  };
</script>

<style>
  .loader {
    position: relative;
  }

  .loader__message {
    position: relative;
    left: 50%;
    display: inline-block;
    transform: translateX(-50%);
  }
</style>
