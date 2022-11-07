import {reqSearchInfo} from '@/api/index'


const actions = {

    async getSearchList(store,params={}) {
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            store.commit('GETSEARCHLIST', result.data)//commit数据
        }

    }

}

const mutations = {
    GETSEARCHLIST(state,params){
        state.searchList = params
       
    }
}

const state = {
    searchList:{}
}

const getters = {
    goodsList(state){
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
        //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList||[];
      },
      
    trademarkList(state){
        return state.searchList.trademarkList||[];
      },

    attrsList(state){
        return state.searchList.attrsList||[];
      }
}

export default {
    actions,
    mutations,
    state,
    getters
}