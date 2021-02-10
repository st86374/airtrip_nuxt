<template lang="pug">
  div
    b-carousel#carousel-1(v-model='slide' :interval='4000'  controls='' @sliding-start='onSlideStart'  @sliding-end='onSlideEnd' fade)
      b-carousel-slide
        nuxt-link(to="/").carousel_link
          .carousel_img
          .carousel_text
            .container
              p 歡慶開幕 全站8折! 折扣碼：9527
      b-carousel-slide
        nuxt-link(to="/").carousel_link
          .carousel_img
          .carousel_text
            .container
              p 海島度假指南
      b-carousel-slide
        nuxt-link(to="/").carousel_link
          .carousel_img
          .carousel_text
            .container
              p 深度台灣旅遊
    section.news
      .container
        h2.news_title
          i.fas.fa-bullhorn
          |最新消息
        .news_links
          nuxt-link(v-for="item in news" :key="item.id" :to="item.url") 
            p.news_time {{item.time}}
            p.news_text {{item.text}}
        nuxt-link(to="/").more_btn
          button(type="button").btn.btn-outline-info MORE
    section.product.bg-light
      .container
        h2 
          i.fas.fa-luggage-cart
          |精選商品
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        news:[
          {
            text:'韓國文化體驗最強攻略!',
            time:'2020/01/30',
            url:'/',
            id:3
          },
          {
            text:'資深玩家經驗公開',
            time:'2021/01/15',
            url:'/',
            id:2
          },
          {
            text:'2020歡慶開幕 全站8折!',
            time:'2021/01/01',
            url:'/',
            id:1
          },
        ]
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
