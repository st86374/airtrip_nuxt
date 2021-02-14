<template>
    <div>
        <div class="loading_bg" :class="{active:loading}">
            <div class="loading">
                <img src="https://cdn1.iconfinder.com/data/icons/office-222/91/General_Office_31-512.png" alt="">
                <p>Loading....</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading.loading;
    },
  },
}
</script>