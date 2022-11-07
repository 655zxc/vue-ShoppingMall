import { reqAddress,reqTrade} from '@/api/index'

const actions = {

    //获取用户地址信息 
    async getAddress(store){
        let result = await reqAddress()
        //无参数 但是响应头有token
        if(result.code==200){
            store.commit('GETADDRESS',result.data)
            return "OK"
        }
        else{
            return Promise.reject(new Error("错误"))
        }
    },


    //获取订单交易信息
    async getTrade(store){
        let result = await reqTrade()
        if(result.code==200){
            store.commit('GETTRADE',result.data)
            return "OK"
        }
        else{
            return Promise.reject(new Error("错误"))
        }
    },
}

const mutations = {
    GETADDRESS(state,value){
        state.userAddress = value
    },

    GETTRADE(state,value){
        state.trade = value
    }
}

const state = {
   userAddress:[],
   trade:{}

}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}