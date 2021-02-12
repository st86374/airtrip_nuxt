<template lang="pug">
  header(:class="{ active: scroll }")
    .container.header
      h1
        nuxt-link.header_brand(to="/") AirTrip
      button.d-none 
        i.fas.fa-bars
      ol.header_links.d-flex
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
                    td {{ item.total }}
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
      cartlist:[] ,
    };
  },
  computed:{
    cart(){
      return (this.$store.state.shopcart.cartlist)
    }
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
      this.scroll = false;
    },
    cartDel(id) {
      shopCartDelete(id)
        .then(() => {
          shopCartGet().then((res) => {
              let shop = res.data.data.carts;
              shop.forEach((element) => {
                element.total = priceFormat(element.total);
              });
              this.cartlist = shop;
              this.$store.commit("shopcart/shopcartUpdate",shop)
            })
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async asyncData() {
    const shop = await shopCartGet();
    shop.data.data.carts.forEach((element) => {
      element.total = priceFormat(element.total);
    });
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
      shop.forEach((element) => {
        element.total = priceFormat(element.total);
      });
      this.$store.commit("shopcart/shopcartUpdate",shop)
      this.cartlist = shop
    })
    document.body.addEventListener('click', function(){
      this.shopcartdrop = false
    }); 
  },
};
</script>