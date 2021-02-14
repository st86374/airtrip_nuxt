<template lang="pug">
div
  header(:class="{ active: scroll }")
    .container.header
      h1
        nuxt-link.header_brand(to="/") AirTrip
      .header_toggle.d-lg-none(:class="{ active: toggle }" @click="toggle=!toggle")
        .bar1
        .bar2
        .bar3
      ol.header_links(:class="{ active: toggle }")
        li
          nuxt-link(to="/product") 商品列表
        li
          nuxt-link(to="/news") 最新消息
        li.cartdrop
          span.cartleng(v-if="cart.length>0") {{cart.length}}
          nuxt-link(to="/shop/step1") 購物列表
          .cartdrop_body
            div(v-if="cart.length>0")
              table.table
                thead
                  tr
                    th 移除
                    th 品名
                    th 人數
                    th 價格
                tbody
                  tr(v-for="item in cart", :key="item.id")
                    td
                      i.fas.fa-trash.text-secondary(
                        @click.prevent="cartDel(item.id)"
                      )
                    td {{ item.product.title }}
                    td {{ item.qty + ' 人' }}
                    td {{ item.total | priceFormat}}
              nuxt-link.btn.btn-info.cartdrop_btn(to="/") 前往結帳
            div(v-else)
              p 購物車尚未有商品
              nuxt-link.btn.btn-info.cartdrop_btn(to="/product") 商品列表
    button.btn-top(:class="{ active: scroll }", @click.prevent="goTop()")
      i.fas.fa-caret-up
</template>
<script>
import priceFormat from "~/assets/js/priceformat.js";
import { shopCartDelete, shopCartGet } from "~/api/font.js";
export default {
  data() {
    return {
      scroll: false,
      toggle:false,
      cartlist:[] ,
    };
  },
  computed:{
    cart(){
      return (this.$store.state.shopcart.cartlist)
    },
    loading() {
      return (this.$store.state.loading.loading)
    },
  },
  filters:{
    priceFormat(value){
    return value
      .toString()
      .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(all, pre, groupOf3Digital) {
        return '$'+(pre + groupOf3Digital.replace(/\d{3}/g, ',$&'))
      });
    }
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
      this.scroll = false;
    },
    cartDel(id) {
      this.$store.commit("loading/loadingUpdate", true);
      shopCartDelete(id)
        .then(() => {
          shopCartGet().then((res) => {
              let shop = res.data.data.carts;
              this.cartlist = shop;
              this.$store.commit("shopcart/shopcartUpdate",shop)
              this.$store.commit("loading/loadingUpdate", false);
            })
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async asyncData() {
    const shop = await shopCartGet();
    return {
      cartlist: shop.data.data.carts,
    };
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
    shopCartGet()
    .then((res) => {
      let shop = res.data.data.carts;
      this.$store.commit("shopcart/shopcartUpdate",shop)
      this.cartlist = shop
    })
    document.body.addEventListener('click', function(){
      this.shopcartdrop = false
    }); 
      this.$store.commit("loading/loadingUpdate", false);
  },
};
</script>