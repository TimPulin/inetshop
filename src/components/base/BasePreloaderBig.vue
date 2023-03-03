<template>
  <div class="loader">
    <img v-if="productsLoading" class="loader__message" src="@/../public/img/gif/Moving blocks.gif" alt="изображение загрузчика страницы">
    <span v-if="productsLoadingFailed" class="loader__message">Ошибка при загрузке</span>
  </div>
</template>

<script>
  export default {
    props: ['productsLoading', 'productsLoadingFailed'],
  }
</script>

<style>
  .loader {
    position: relative;
  }

  .loader__message {
    position: relative;
    left: 50%;
    display: inline-block;
    transform: translateX(-50%);
  }
</style>
