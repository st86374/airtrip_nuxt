import request from './config.js'
//取得商品
export const productListGet = id =>!id? request.get('/products/all'):request.get('/product/'+id)
//購物車
export const shopCartPost = data => request.post('/cart',data)
export const shopCartDelete = id => request.delete(`/cart/${id}`)
export const shopCartGet = () => request.get(`/cart`)
//訂單
export const orderPost = data => request.get(`/order`,data)