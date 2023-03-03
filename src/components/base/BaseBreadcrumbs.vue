<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs_link" :to="{name: 'main'}">
        Каталог
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs_link" :to="{name: 'main'}">
        {{ categoryTitle }}
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <a href="#" class="breadcrumbs_link">
        {{ productTitle }}
      </a>
    </li>
  </ul> <!-- breadcrumbs -->
</template>

<script>
    import gotoPage from '@/helpers/gotoPage';

    export default {
      props: {
        categoryTitle: String,
        productTitle: String,
      },
      methods: {
        gotoPage,
      },
    };
</script>
