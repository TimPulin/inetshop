<template>
    <div class="form__counter product__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decreaseAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input name="count" class="input-amount" type="number"
      v-model.number="amount"
    >

    <button type="button" aria-label="Добавить один товар" @click.prevent="increaseAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
  export default {
    props: ['itemAmount'],
    emits: ['changeItemAmount'],
    data() {
      return {
        currentAmount: this.itemAmount,
      }
    },
    computed: {
      amount: {
        get() {
          return this.currentAmount;
        },
        set(value) {
          this.currentAmount = value;
          this.updateAmount();
        },
      },
    },
    methods: {
      increaseAmount() {
        this.currentAmount += 1;
        this.updateAmount();
      },
      decreaseAmount() {
        if (this.currentAmount > 1) {
          this.currentAmount -= 1;
          this.updateAmount();
        }
      },
      updateAmount() {
        this.$emit('changeItemAmount', this.currentAmount)
      },
    }, // methods
  }
</script>

<style>
  .form__counter .input-amount {
    -moz-appearance: none;
    appearance: none;
  }

  .form__counter .input-amount:hover,
  .form__counter .input-amount:focus {
    -moz-appearance: number-input;
    appearance: number-input;
  }

  .form__counter .input-amount::-webkit-outer-spin-button,
  .form__counter .input-amount::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .product-page .form__counter {
    height:70px;
    border: none;
  }

  .product-page input,
  .product-page button {
    height: 70px;
  }

</style>
