<template lang="pug">
div
  .product_banner
  .breadcrumb_outer.bg-light
    .container.px-0
      ol.breadcrumb
          li.breadcrumb-item
              nuxt-link(:to="'/'") 首頁
          li.breadcrumb-item 
               nuxt-link(:to="'/product'") 商品列表
          li.breadcrumb-item {{product.title}}
  section
    .container
      .row
        .col-md-5.px-0
          .product_img(
            :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"
          )
        .col-md-7
          h3.product_title {{ product.title }}
          p.product_content {{ product.content }}
          p.product_description {{ product.description }}
          .d-flex.mt-3.align-items-end
            p 售價：
              .d-flex.align-items-end(
                v-if="product.origin_price > product.price"
              )
                del.product_originprice.mr-3 {{ product.origin_price }}
                p.product_price {{ product.price }}
              p.product_originprice(v-else) {{ product.origin_price }}
          .row.justify-content-end.mt-3
              .col-md-3.col-6
                  select.form-control(v-model="qty")
                    option(v-for="n in 10", :value="n") {{ n + '人' }}
              .col-md-3.col-6
                  button.btn.btn-info.text-break(@click.prevent="shopCartAdd()")
                      i.fas.fa-shopping-cart.mr-2
                      |加入購物車
  section.bg-light
    .container
        .h3.text-center.border-bottom.pb-3.mb-3 其他{{product.category}}旅程
        VueSlickCarousel(v-bind="productslick")
            div(class="mb-3" v-for="item in productlist",:key="item.id" v-if="item.category===product.category&&item.id != product.id") 
              nuxt-link.productlist_item(:to="'/product/'+item.id").shadow-sm
                .productlist_img_outer
                  .productlist_img( :style="{ 'background-image': 'url(' + item.imageUrl + ')'}" )
                  button.productlist_like(@click.prevent="liketoggle(item)")
                   i.fas.fa-heart(v-if="likecheck(item.id)")
                   i.far.fa-heart(v-else)
                .productlist_body
                  h3.productlist_name {{item.title}}
                  p.productlist_text {{item.content}}
                .productlist_footer
                  div(class="d-flex" v-if="item.origin_price > item.price")
                    del.mr-3 {{ item.origin_price}}
                    p.productlist_price.text-danger {{ item.price }}
                  p(v-else).productlist_price {{ item.origin_price }}
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import priceFormat from "~/assets/js/priceformat.js";
import { productListGet, shopCartPost ,shopCartGet} from "~/api/font.js";
export default {
      components: { VueSlickCarousel },
  data() {
    return {
      qty: 1,
          likelist: [],
        productslick: {
        dots: true,
        autoplay:true,
        infinite: true,
        arrows:true,
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
                    arrows:false,
              slidesToShow: 1,
            slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods:{
    shopCartAdd(){
      let data = {}
      data.data={}
      data.data.product_id = this.product.id;
      data.data.qty = this.qty
      shopCartPost(data).then(()=>{
        shopCartGet().then((res) => {
            let shop = res.data.data.carts;
            shop.forEach((element) => {
              element.total = priceFormat(element.total);
            });
            this.$store.commit("shopcart/shopcartUpdate", shop)
          })
      })
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
  },
  async asyncData({ params }) {
    const list = await productListGet();
    const data = await productListGet(params.id);
    list.data.products.forEach((element) => {
      element.price = priceFormat(element.price);
    });
    list.data.products.forEach((element) => {
      element.origin_price = priceFormat(element.origin_price);
    });
    data.data.product.origin_price = priceFormat(
      data.data.product.origin_price
    );
    data.data.product.price = priceFormat(data.data.product.price);
    return {
      productlist: list.data.products,
      product: data.data.product,
    };
  },
    mounted() {
    if (JSON.parse(localStorage.getItem("likelist"))) {
      this.likelist = JSON.parse(localStorage.getItem("likelist"));
    }
  },
};
</script>