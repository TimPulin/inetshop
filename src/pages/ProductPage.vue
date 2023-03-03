<template>
  <div class="product-page" v-if="!productData">Товар невозможн загрузить</div>
  <div class="product-page" v-else>
    <div>
      <BaseBreadcrumbs :category-title="category.title" :product-title="product.title"/>
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.img.src" alt="">
        </div>
      </div> <!-- pics -->

      <div class="item__info">
        <span class="item__code">
          Артикул {{ product.id }}
        </span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="post" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} <span>&#8381;</span>
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет</legend>
              <ProductItemColors
                :product="product"
                :name="'item-colors'"
              />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <BaseInputAmount :item-amount="productAmount" @changeItemAmount="changeProductAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляем товар в корзину</div>
            <div v-show="productAddingFailed">Не получилось добавить товар в корзину</div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
  import ProductItemColors from '@/components/product/ProductItemColors.vue';
  import BaseInputAmount from '@/components/base/BaseInputAmount.vue';
  import numberFormat from '@/helpers/numberFormat';
  import axios from 'axios';
  import API_BASE_URL from '@/config';
  import formatItemColors from '@/helpers/formatItemColors';
  import { mapState, mapActions } from 'vuex';

  export default {
    components: {
      BaseBreadcrumbs,
      ProductItemColors,
      BaseInputAmount,
    },
    data() {
      return {
        productData: null,
        productAmount: 1,

        productLoading: false,
        productLoadingFailed: false,
      }
    }, // data
    watch: {
      '$route.params.id': function () {
        this.loadProduct();
      },
    },
    computed: {
      ...mapState({
          productAddSending: 'productAddSending',
          productAdded: 'productAdded',
          productAddingFailed: 'productAddingFailed',
        }),
      product() {
        if (this.productData) {
          this.formatProduct();
          return this.productData;
        } else {
          return [];
        }
      },
      category() {
        return this.productData.category;
      },
    }, // computed
    methods: {
      ...mapActions({
        addProductToCart: 'addProductToCart',
      }),
      formatItemColors,

      formatProduct() {
        const obj = {
          img: {
            src: this.productData.image.file.url,
          },
          itemColors: this.formatItemColors(this.productData),
        }
        Object.assign(this.productData, obj)
      },
      loadProduct() {
        this.productsLoading = true;
        this.productsLoadingFailed = false;

        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => {
            this.productData = response.data;
          })
      },
      addToCart() {
        this.addProductToCart(
          {
            productId: this.product.id,
            amount: this.productAmount,
          },
        )
      },
      changeProductAmount(amount) {
        this.productAmount = amount;
      },
    }, // methods
    filters: {
      numberFormat,
    }, // filters
    created() {
      this.loadProduct();
    },
  };
</script>

<style>
  .form__block--add-to-cart {
    display: flex;
    align-items: stretch;
  }

  .product-page .colors__radio:checked~.colors__value::before {
    border-color: #fff;
  }

  .product-page .btn {
    font-size: 18px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0;
  }

  .block-change-amount {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    width: 80px;
    background-color: #fff;
  }

  .block-change-amount__btn {
    background-color: #fff;
  }

  .block-change-amount__btn {
    font-weight: bold;
  }

  .block-change-amount__btn:first-child {
    width: 22px;
  }

  .block-change-amount__span {
    align-self: center;
    color: #000;
  }

  .product-page .btn--add-to-cart {
    padding: 10px 15px;
    background-color: lime;
  }
</style>
