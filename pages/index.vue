<template lang="pug">
div
  b-carousel#carousel-1(
    v-model="slide",
    :interval="4000",
    controls="",
    @sliding-start="onSlideStart",
    @sliding-end="onSlideEnd",
    fade
  )
    b-carousel-slide
      nuxt-link.carousel_link(to="/")
        .carousel_img
        .carousel_text
          .container
            p 歡慶開幕 全站8折! 折扣碼：9527
    b-carousel-slide
      nuxt-link.carousel_link(to="/")
        .carousel_img
        .carousel_text
          .container
            p 海島度假指南
    b-carousel-slide
      nuxt-link.carousel_link(to="/")
        .carousel_img
        .carousel_text
          .container
            p 深度台灣旅遊
  section.newslist
    .container
      h2.newslist_title
        i.fas.fa-bullhorn
        | 最新消息
      .newslist_links
        nuxt-link(v-for="item in news", :key="item.id", :to="item.url") 
          p.newslist_time {{ item.time }}
          p.newslist_text {{ item.text }}
      nuxt-link.more_btn(to="/")
        button.btn.btn-outline-info(type="button") MORE
  section.productlist.bg-light
    .container
      h2 
        i.fas.fa-luggage-cart
        | 精選商品
      VueSlickCarousel(v-bind="productslick")
        div(v-for="(item, index) in productlist.slice(0, 6)", :key="item.id") 
          nuxt-link.productlist_item.shadow-sm(:to="'/product/' + item.id")
            .productlist_img_outer
              .productlist_img(
                :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"
              )
              button.productlist_like(@click.prevent="liketoggle(item)")
                i.fas.fa-heart(v-if="likecheck(item.id)")
                i.far.fa-heart(v-else)
            .productlist_body
              .d-flex.justify-content-between.align-items-start
                h3.productlist_name {{ item.title }}
                span.productlist_badge {{ item.category }}
              p.productlist_text {{ item.content }}
            .productlist_footer
              .d-flex.align-items-end(v-if="item.origin_price > item.price")
                del.mr-3 {{ item.origin_price | priceFormat}}
                p.productlist_price.text-danger {{ item.price | priceFormat }}
              p.productlist_price(v-else) {{ item.origin_price | priceFormat}}
              button.productlist_shopcart(@click.prevent="shopCartAdd(item)")
                i.fas.fa-shopping-cart
      nuxt-link.more_btn(to="/product")
        button.btn.btn-outline-info(type="button") MORE
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import priceFormat from "~/assets/js/priceformat.js";
import { productListGet, shopCartPost, shopCartGet } from "~/api/font.js";
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      likelist: [],
      news: [
        {
          text: "韓國文化體驗最強攻略!",
          time: "2020/01/30",
          url: "/",
          id: 3,
        },
        {
          text: "資深玩家經驗公開",
          time: "2021/01/15",
          url: "/",
          id: 2,
        },
        {
          text: "2020歡慶開幕 全站8折!",
          time: "2021/01/01",
          url: "/",
          id: 1,
        },
      ],
      productslick: {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,

        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  components: {
    VueSlickCarousel,
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
  async asyncData() {
    const list = await productListGet();
    list.data.products = list.data.products.sort(() => Math.random() - 0.5);
    return {
      productlist: list.data.products,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    likecheck(id) {
      if (this.likelist.map((x) => x.id).indexOf(id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    liketoggle(item) {
      if (this.likelist.map((x) => x.id).indexOf(item.id) === -1) {
        console.log(this.likelist.map((x) => x.id).indexOf(item.id));
        this.likelist.push(item);
      } else {
        let i = this.likelist.map((x) => x.id).indexOf(item.id);
        this.likelist.splice(i, 1);
      }
      localStorage.setItem("likelist", JSON.stringify(this.likelist));
    },
    shopCartAdd(item) {
      let data = {};
      data.data = {};
      data.data.product_id = item.id;
      data.data.qty = 1;
      this.$store.commit("loading/loadingUpdate", true);
      shopCartPost(data).then(() => {
        shopCartGet().then((res) => {
          let shop = res.data.data.carts;
          this.$store.commit("shopcart/shopcartUpdate", shop);
          this.$store.commit("loading/loadingUpdate", false);
        });
      });
    },
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("likelist"))) {
      this.likelist = JSON.parse(localStorage.getItem("likelist"));
    }
  },
};
</script>
