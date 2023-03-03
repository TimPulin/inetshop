<template>
  <div class="cart-page">
    <div class="content__top">
      <BaseBreadcrumbs :category-title="'Корзина'" :product-title="''"/>
      <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ totalItems }} товара
        </span>
    </div>

    <section class="cart">
      <BasePreloaderBig
      :products-loading="productsLoading"
      :products-loading-failed="productsLoadingFailed"
      />
      <form class="cart__form form" action="#" method="POST" @submit.prevent="">
        <div class="cart__field">
          <CartItems :products="products"/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>
          <router-link to="/cart/order">
            <button class="cart__button button button--primery" type="submit" v-if="totalItems > 0">
              Оформить заказ
            </button>
        </router-link>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
  import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
  import BasePreloaderBig from '@/components/base/BasePreloaderBig.vue';
  import CartItems from '@/components/cart/CartItems.vue';
  import numberFormat from '@/helpers/numberFormat';
  import { mapGetters, mapState } from 'vuex';

  export default {
    components: {
    BaseBreadcrumbs,
    BasePreloaderBig,
    CartItems,
  },
    data() {
      return {

      }
    }, // data
    computed: {
      ...mapGetters({
        totalPrice: 'cartTotalPrice',
        totalItems: 'cartTotalItems',
      }),
      ...mapState({
        products: 'cartProducts',
        productsLoading: 'productsLoading',
        productsLoadingFailed: 'productsLoadingFailed',
      }),
    },
    filters: {
      numberFormat,
    }, // filters
  }
</script>
