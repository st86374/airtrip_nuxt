<template lang="pug">
    div
        header
            .container.header
                h1
                    nuxt-link(to="/").header_brand AirTrip
                button.d-none 
                    i.fas.fa-bars
                .header_links
                    nuxt-link(to="/product") 商品列表
                    nuxt-link(to="/news") 最新消息
                    nuxt-link(to="/shop") 購物列表
</template>