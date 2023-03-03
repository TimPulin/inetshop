import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';
import adapterCartFromServerToApp from '@/helpers/adapterCartFromServerToApp';

const axiosInstans = axios.create({
  baseURL: API_BASE_URL,
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    cartProductsData: [],
    userAccessKey: null,

    productsLoading: false,
    productsLoadingFailed: false,

    productAddSending: false,
    productAdded: false,
    productAddingFailed: false,

    deliveryPrice: 0,
    orderInfo: null,
  }, // state
  mutations: {
    updateDeliveryPrice(state, price) {
      state.deliveryPrice = price;
    },

    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    adapterOrderInfo(state, orderProducts) {
      state.orderInfo.basket.items = adapterCartFromServerToApp(orderProducts);
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    adapterCart(state) {
      state.cartProducts = adapterCartFromServerToApp(state.cartProductsData);
    },

    updateProductsLoading(state, status) {
      state.productsLoading = status;
    },
    updateProductsLoadingFailed(state, status) {
      state.productsLoadingFailed = status;
    },

    updateProductAddSending(state, status) {
      state.productAddSending = status;
    },
    updateProductAdded(state, status) {
      state.productAdded = status;
    },
    updateProductAddingFailed(state, status) {
      state.productAddingFailed = status;
    },
  }, // mutations
  getters: {
    cartTotalPrice(state) {
      return state.cartProducts.reduce((acc, item) => item.amount * item.product.price + acc, 0)
    },
    cartTotalItems(state) {
      return state.cartProducts.length;
    },
    flagOrderInfoReady(state) {
      return state.orderInfo;
    },
  }, // getters
  actions: {
    loadCart(context) {
      context.commit('updateProductsLoading', true);
      return axiosInstans
        .get(
          '/api/baskets',
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
          context.commit('adapterCart');
        })
        .catch(() => {
          context.commit('updateProductsLoadingFailed', true);
        })
        .then(() => {
          context.commit('updateProductsLoading', false);
          context.commit('updateProductsLoadingFailed', false);
        })
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('updateProductAddSending', true);
      context.commit('updateProductAdded', false);
      context.commit('updateProductAddingFailed', false);
      return axiosInstans
        .post(
          '/api/baskets/products',
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('adapterCart');
        })
        .catch(() => {
          context.commit('updateProductAddingFailed', true)
        })
        .then(() => {
          context.commit('updateProductAddSending', false);
          context.commit('updateProductAdded', true);
          context.commit('updateProductAddingFailed', false);
        })
    },
    updateCartProductAmount(context, { productId, amount }) {
      return axiosInstans
        .put(
          '/api/baskets/products',
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('adapterCart');
        })
    },
    deleteProductFromCart(context, productId) {
      return axiosInstans
        .delete(
          '/api/baskets/products',
          {
            data: { productId: String(productId) },
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('adapterCart');
        })
    },
    loadOrderInfo(context, orderId) {
      return axiosInstans
        .get(
          `/api/orders/${orderId}`,
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
          context.commit('adapterOrderInfo', response.data.basket.items);
        })
    },
  }, // actions
});
