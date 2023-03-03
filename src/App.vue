<template>
  <div>
    <SiteHeader/>

    <main class="content container">
      <router-view/>
    </main>

    <SiteFooter/>
  </div>
</template>

<script>
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import SiteFooter from '@/components/site/SiteFooter.vue';
  import { mapActions, mapMutations } from 'vuex';

  export default {
    name: 'App',
    components: {
      SiteHeader,
      SiteFooter,
    }, // components
    created() {
      const userAccessKey = localStorage.getItem('userAccessKey');
      if (userAccessKey) {
        this.updateUserAccessKey(userAccessKey);
      }
      this.loadCart();
    },
    methods: {
      ...mapActions(['loadCart']),
      ...mapMutations(['updateUserAccessKey']),
    },
  };
</script>
