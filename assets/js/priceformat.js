const priceFormat = (value) => {
    return value
      .toString()
      .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(all, pre, groupOf3Digital) {
        return '$'+(pre + groupOf3Digital.replace(/\d{3}/g, ',$&'))
      });
  }
  export default priceFormat