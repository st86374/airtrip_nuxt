import request from './config.js'
//取得商品
export const productListGet = id =>!id? request.get('/products/all'):request.get('/product/'+id)
//購物車