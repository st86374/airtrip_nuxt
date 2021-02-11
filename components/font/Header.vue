<template lang="pug">
div
  header(:class="{ active: scroll }")
    .container.header
      h1
        nuxt-link.header_brand(to="/") AirTrip
      button.d-none 
        i.fas.fa-bars
      .header_links
        nuxt-link(to="/product") 商品列表
        nuxt-link(to="/news") 最新消息
        nuxt-link(to="/shop") 購物列表
    button.btn-top(:class="{ active: scroll }", @click.prevent="goTop()")
      i.fas.fa-caret-up
</template>
<script>
export default {
  data() {
    return {
      scroll: false,
    };
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
      this.scroll = false;
    },
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.querySelector("header");
      if (window.scrollY > navBar.offsetTop) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    };
  },
};
</script>