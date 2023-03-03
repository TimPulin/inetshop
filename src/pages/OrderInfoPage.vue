<template>
  <div class="order-info-page" v-if="isLoaded">
    <div class="content__top">
      <BaseBreadcrumbs :category-title="'Корзина'" :product-title="'Оформление заказа'"/>
      <h1 class="content__title">
        Заказ оформлен
        </h1>
        <span class="content__info">
          &#x2116; {{ $store.state.orderInfo.id }}
        </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <CartListOrders :items="orderProducts"/>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
import CartListOrders from '@/components/cart/CartListOrders.vue';

export default {
  components: {
    CartListOrders,
    BaseBreadcrumbs,
  },
  data() {
    return {
      isLoaded: false,
      orderInfo: null,
      orderProducts: null,
    }
  },
  methods: {
    setOrderProducts() {
      this.orderInfo = this.$store.state.orderInfo;
      this.orderProducts = this.$store.state.orderInfo.basket.items;
    },
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      this.setOrderProducts();
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
    .then(() => {
      this.setOrderProducts();
      this.isLoaded = true;
    });
  },
}
</script>
