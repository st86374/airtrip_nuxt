<template lang="pug">
div
  .product_banner
  .breadcrumb_outer.bg-light
    .container.px-0
        ol.breadcrumb.bg-none
            li.breadcrumb-item
                nuxt-link(:to="'/'") 首頁
            li.breadcrumb-item 商品列表
  section
    .product_bar
        .container.d-flex
            .product_categorys
                button.product_categorys_btn(:class="[sort ===''?'active':'']" @click="sort=''") 全部分類
                button.product_categorys_btn( v-for="( item,index ) in categorys" :class="[sort ===item.category?'active':'']" @click="sort = item.category") {{ item.category }}
            input.product_search(placeholder="請輸入關鍵字" v-model="keyword").form-control
    .container
        .row
            .col-lg-4.col-md-6(v-for="(item, index) in productlist",:key="item.id" v-if="(sort === item.category||sort==='') && (item.title.indexOf(keyword)> -1 || item.description.indexOf(keyword)>-1)")
              nuxt-link.productlist_item.shadow-sm.mx-0.my-3(:to="'/product/' + item.id")
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
                    del.mr-3 {{ item.origin_price }}
                    p.productlist_price.text-danger {{ item.price }}
                  p.productlist_price(v-else) {{ item.origin_price }}
                  button.productlist_shopcart
                    i.fas.fa-shopping-cart
            //- p.text-center.my-3(v-else) 無任何一筆符合搜尋結果
</template>
<script>
import priceFormat from "~/assets/js/priceformat.js";
import { productListGet } from "~/api/font.js";
export default {
    data(){
        return{
            sort:'',
            keyword:'',
            categorys:[],
            likelist:[],
        }
    },
  async asyncData(){
    const list = await productListGet()
    list.data.products.forEach((element) =>{
      element.price = priceFormat(element.price)
    })
    list.data.products.forEach((element) =>{
      element.origin_price = priceFormat(element.origin_price)
    })
    return{
      productlist:list.data.products
    }
  },
  methods:{
      likecheck(id){
            if(this.likelist.map(x => x.id).indexOf(id)> -1){
                return true
          }else{
              return false
          }
      },
      liketoggle(item){
            if(this.likelist.map(x =>x.id).indexOf(item.id)===-1){
                console.log(this.likelist.map(x =>x.id).indexOf(item.id))
                  this.likelist.push(item)
              }else{
                  let i = this.likelist.map(x =>x.id).indexOf(item.id)
                  this.likelist.splice(i, 1)
              }       
            localStorage.setItem('likelist',(JSON.stringify(this.likelist)))
      }  
  },
  mounted() {
      this.productlist.forEach((element)=>{
          if(this.categorys.map(x => x.category).indexOf(element.category)=== -1){
              this.categorys.push({
                  category:element.category
                  })
          }
      })
      if((JSON.parse(localStorage.getItem('likelist')))){
          this.likelist = JSON.parse(localStorage.getItem('likelist'))
      }
  },
};
</script>