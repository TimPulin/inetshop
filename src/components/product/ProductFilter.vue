<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilterForm">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" placeholder="0" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" placeholder="0" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block"> <!--  фильтр категорий-->
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="categories" >

          <BaseSelect
            :list="categories"
            :select-name="'categories'"
            :category-id.sync="currentCategoryId"
          />

        </label>
      </fieldset>

      <fieldset class="form__block"> <!-- фильтр цветов -->
        <legend class="form__legend">Цвет</legend>
          <ProductFilterColors
            :uniq-colors="uniqColors"
            :color-favorite-id.sync="currentColor"
            />
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="resetFilterForm">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
  import BaseSelect from '../base/BaseSelect.vue';
  import ProductFilterColors from './ProductFilterColors.vue'

  export default {
    props: ['categories', 'uniqColors', 'priceFrom', 'priceTo', 'categoryId', 'colorFavoriteId'],
    components: {
      BaseSelect,
      ProductFilterColors,
    },
    watch: {
      priceFrom(value) {
        this.currentPriceFrom = value;
      },
      priceTo(value) {
        this.currentPriceTo = value;
      },
      categoryId(value) {
        this.currentCategoryId = value;
      },
      colorFavoriteId(value) {
        this.currentColor = value;
      },
    },
    data() {
      return {
        currentPriceFrom: 0,
        currentPriceTo: 0,
        currentCategoryId: 0,
        currentColor: null,
      }
    },
    methods: {
      submitFilterForm() {
        this.$emit('update:priceFrom', this.currentPriceFrom);
        this.$emit('update:priceTo', this.currentPriceTo);
        this.$emit('update:categoryId', this.currentCategoryId);
        this.$emit('update:colorFavoriteId', this.currentColor);
      },
      resetFilterForm() {
        this.$emit('update:priceFrom', 0);
        this.$emit('update:priceTo', 0);
        this.$emit('update:categoryId', 0);
        this.$emit('update:colorFavoriteId', null);
      },
    },
  };

</script>
