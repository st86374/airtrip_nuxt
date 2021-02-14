<template>
        <div v-if="loading" class="loading_bg active">
            <div class="loading">
                <img src="https://cdn1.iconfinder.com/data/icons/office-222/91/General_Office_31-512.png" alt="">
                <p>Loading....</p>
            </div>
        </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false,
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      },
    },
  }
</script>