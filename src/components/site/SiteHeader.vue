<template>
  <header class="header">
      <div class="header__wrapper container">
        <router-link to="/">
          <span class="header__info">Каталог</span>
        </router-link>

        <a class="header__logo" href="#">
          <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
        </a>

        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>

        <BasePreloaderSmall v-if="productsLoading"
          :products-loading="productsLoading"
          :products-loading-failed="productsLoadingFailed"
        />
        <CartIndicator v-else/>

      </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';
import CartIndicator from '../cart/CartIndicator.vue';
import BasePreloaderSmall from '../base/BasePreloaderSmall.vue';

  export default {
    components: {
      CartIndicator,
      BasePreloaderSmall,
    },
    computed: {
      ...mapState({
        productsLoading: 'productsLoading',
        productsLoadingFailed: 'productsLoadingFailed',
      }),
    },
  }
</script>
