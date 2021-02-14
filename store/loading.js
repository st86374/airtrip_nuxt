export const state = () =>({
    loading:true,
})
export const mutations ={
    loadingUpdate(state,payload){
        state.loading = payload
    }
}