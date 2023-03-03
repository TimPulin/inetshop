<template>
  <section class="cart">
    <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
      <div class="cart__field">
        <div class="cart__data">

          <BaseFormText
            title="ФИО"
            placeholder="Введите ваше полное имя"
            :error="formErrorFields.name"
            v-model="formData.name"
          />

          <BaseFormText
            title="Адрес"
            placeholder="Введите ваш адрес"
            :error="formErrorFields.address"
            v-model="formData.address"
          />

          <BaseFormText
            title="Телефон"
            placeholder="Введите ваш телефон"
            type="tel"
            :error="formErrorFields.phone"
            v-model="formData.phone"
          />

          <BaseFormText
            title="Email"
            placeholder="Введи ваш Email"
            type="email"
            :error="formErrorFields.email"
            v-model="formData.email"
          />

          <BaseFormTextArea
            title="Комментарий"
            placeholder="Введи ваш комментарий"
            :error="formErrorFields.comment"
            v-model="formData.comment"
          />
        </div>

        <div class="cart__options">
          <h3 class="cart__title">Доставка</h3>
          <ul class="cart__options options">
            <li class="options__item">
              <label class="options__label">
                <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked
                  v-model.number="setDeliveryPrice"
                >
                <span class="options__value">
                  Самовывоз <b>бесплатно</b>
                </span>
              </label>
            </li>
            <li class="options__item">
              <label class="options__label">
                <input class="options__radio sr-only" type="radio" name="delivery" value="500"
                  v-model.number="setDeliveryPrice"
                >
                <span class="options__value">
                  Курьером <b>500 ₽</b>
                </span>
              </label>
            </li>
          </ul>

          <h3 class="cart__title">Оплата</h3>
          <ul class="cart__options options">
            <li class="options__item">
              <label class="options__label">
                <input class="options__radio sr-only" type="radio" name="pay" value="card">
                <span class="options__value">
                  Картой при получении
                </span>
              </label>
            </li>
            <li class="options__item">
              <label class="options__label">
                <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                <span class="options__value">
                  Наличными при получении
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="cart__block">
        <CartListOrders :items="cartProducts"/>

        <button class="cart__button button button--primery" type="submit">
          Оформить заказ
        </button>
      </div>
      <div class="cart__error form__error-block" v-if="formErrorGlobal">
        <h4>Заявка не отправлена!</h4>
        <p>
          {{ formErrorGlobal }}
        </p>
      </div>
    </form>
  </section>
</template>

<script>
  import CartListOrders from '@/components/cart/CartListOrders.vue';
  import BaseFormText from '@/components/base/BaseFormText.vue';
  import BaseFormTextArea from '@/components/base/BaseFormTextArea.vue';
  import { mapMutations, mapState } from 'vuex';
  import numberFormat from '@/helpers/numberFormat';
  import axios from 'axios';
  import API_BASE_URL from '@/config';

  export default {
    data() {
      return {
        formData: {},
        formErrorFields: {},
        formErrorGlobal: '',
      }
    },
    components: {
      BaseFormText,
      BaseFormTextArea,
      CartListOrders,
    },
    computed: {
      ...mapState({
        cartProducts: 'cartProducts',
        stateDeliveryPrice: 'deliveryPrice',
      }),
      setDeliveryPrice: {
        get() {
          return this.stateDeliveryPrice;
        },
        set(value) {
          this.updateDeliveryPrice(value);
        },
      },
    },
    methods: {
      ...mapMutations({
        updateDeliveryPrice: 'updateDeliveryPrice',
      }),
      order() {
        this.formErrorFields = {};
        this.formErrorGlobal = {};
        axios
          .post(
            `${API_BASE_URL}/api/orders`,
            this.formData,
            {
              params: {
                userAccessKey: this.$store.state.userAccessKey,
              },
            },
          )
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({ name: 'order-info', params: { id: response.data.id } })
          })
          .catch((error) => {
            this.formErrorFields = error.response.data.error.request || {};
            this.formErrorGlobal = error.response.data.error.message;
          })
      },
    }, // methods
    filters: {
      numberFormat,
    }, // filters

  }
</script>
