export const state = () =>({
    cartlist:[],
})
export const mutations ={
    shopcartUpdate(state,payload){
        state.cartlist = payload
    }
}