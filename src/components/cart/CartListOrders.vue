<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in items" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ itemCosts(item.price, item.amount)  | numberFormat }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>{{ deliveryPrice }} ₽</b></p>
      <p>Итого: <b>{{ totalItems }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapState } from 'vuex';

  export default {
    props: ['items'],
    computed: {
      ...mapState({
        deliveryPrice: 'deliveryPrice',
      }),
      totalPrice() {
        return this.items.reduce((acc, item) => item.amount * item.product.price + acc, 0);
      },
      totalItems() {
        return this.items.length;
      },
    },
    methods: {
      itemCosts(price, amount) {
        return price * amount;
      },
    },
    filters: { numberFormat },

  }
</script>
