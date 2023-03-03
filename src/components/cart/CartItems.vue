<template>
  <ul class="cart__list">
    <li class="cart__item product" v-for="item in products" :key="item.productId">
      <div class="product__pic">
        <img :src="item.img.src" width="120" height="120" :alt="item.product.title">
      </div>
      <h3 class="product__title">
        {{ item.product.title }}
      </h3>
      <span class="product__code">
        {{ item.productId }}
      </span>

      <BaseInputAmount
        :item-amount="item.amount"
        @changeItemAmount="updateItemAmount($event, item.productId)"
      />

      <b class="product__price">
        {{ calcProductCost(item.amount, item.product.price) | numberFormat }}
      </b>

      <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
        @click.prevent="deleteItem(item.productId)"
      >
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';
  import BaseInputAmount from '@/components/base/BaseInputAmount.vue';
  import { mapActions } from 'vuex';

  export default {
    props: ['products'],
    components: {
      BaseInputAmount,
    },
    methods: {
      ...mapActions({
        updateCartProductAmount: 'updateCartProductAmount',
        deleteProductFromCart: 'deleteProductFromCart',
      }),
      updateItemAmount(amount, productId) {
        this.updateCartProductAmount(
          {
            productId,
            amount,
          },
        )
      },
      deleteItem(productId) {
        this.deleteProductFromCart(productId);
      },
      calcProductCost(amount, price) {
        return amount * price;
      },
    }, // methods
    filters: {
      numberFormat,
    }, // filters
  }

</script>

<style>
  .button-del {
    cursor: pointer;
  }
</style>
