<template lang="pug">
div
  .order_banner
  .breadcrumb_outer.bg-light
    .container.px-0
      ol.breadcrumb
        li.breadcrumb-item
          nuxt-link(:to="'/'") 首頁
        li.breadcrumb-item 購物列表
  section(v-if="(step === 1)")
    .container
      table.table.order_table
        thead
          tr
            th 移除
            th 品名
            th 小圖
            th 人數
            th 價格
        tbody
          tr(v-for="item in cartdata.carts", :key="item.id")
            td
              i.fas.fa-trash.text-secondary(@click.prevent="cartDel(item.id)")
            td
              nuxt-link.text-info(:to="'/product/' + item.product.id") {{ item.product.title }}
            td
              img.order_img(:src="item.product.imageUrl")
            td {{ item.qty + '人' }}
            td {{ item.total }}
          tr
            td(colspan="3")
              .d-flex
                input.form-control.order_cost(
                  placeholder="請輸入折扣碼",
                  v-model="code"
                )
                button.btn.btn-info(@click.prevent="costGet") 送出
            td 總價：
            td {{ cartdata.total }}
      button.btn.btn-info(@click="step = 2") 下一步
  section(v-if="(step === 2)")
    .container
      table.table.order_table
        thead
          tr
            th 移除
            th 品名
            th 小圖
            th 人數
            th 價格
        tbody
          tr(v-for="item in cartdata.carts", :key="item.id")
            td
              i.fas.fa-trash.text-secondary(@click.prevent="cartDel(item.id)")
            td
              nuxt-link.text-info(:to="'/product/' + item.product.id") {{ item.product.title }}
            td
              img.order_img(:src="item.product.imageUrl")
            td {{ item.qty + '人' }}
            td {{ item.total }}
          tr
            td(colspan="3")
              .d-flex
                input.form-control.order_cost(
                  placeholder="請輸入折扣碼",
                  v-model="code"
                )
                button.btn.btn-info(@click.prevent="costGet") 送出
            td 總價：
            td {{ cartdata.total }}
      button.btn.btn-info(@click="step = 2") 下一步
</template>
<script>
import priceFormat from "~/assets/js/priceformat.js";
import {
  shopCartDelete,
  productListGet,
  shopCartPost,
  shopCartGet,
} from "~/api/font.js";
export default {
  data() {
    return {
      code: "",
      step:1,
    };
  },
  computed: {
    cart() {
      return this.$store.state.shopcart.cartlist;
    },
  },
  methods: {
    cartDel(id) {
      shopCartDelete(id)
        .then(() => {
          shopCartGet().then((res) => {
            let shop = res.data.data.carts;
            shop.forEach((element) => {
              element.total = priceFormat(element.total);
            });
            this.cartlist = shop;
            this.$store.commit("shopcart/shopcartUpdate", shop);
          });
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
    shop.data.data.total = priceFormat(shop.data.data.total);
    return {
      cartdata: shop.data.data,
    };
  },
};
</script>