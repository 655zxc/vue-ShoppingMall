import { reqDetailsInfo , reqShoppingCart} from '@/api/index'
import {getUUID} from '@/utils/uuid'

const actions = {
    //获取商品信息
    async detailsList(store, id) {
        let result = await reqDetailsInfo(id)
        if (result.code == 200) {
            store.commit('DETAILSLIST', result.data)
        }
    },

    //加入购物车
    async shoppingCart(store,{id,num}) {
        let result = await reqShoppingCart(id,num)
        if (result.code == 200) {
            //状态码200 代表加入购物车成功
            
            return 'OK'//return一个非promise 则async函数返回值是一个成功的promise对象
        }
        else{
            //加入购物车失败
            //return一个失败的promise async函数就返回这个promise
        return Promise.reject(new Error("加入购物车失败"))
        //Promise.reject 创造一个失败的promise
        }
    },
    //因为我们只需要向服务器发送axios 不需要接收参数 因此只需要reqShoppingCart,不需要commit了
}

const mutations = {
    DETAILSLIST(state, value) {
        state.detailsList = value
    },

   
}

const state = {
    detailsList: {
        categoryView: {},
        price: 0,
        skuInfo: {
            skuImageList:[{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''}]
        },
        spuSaleAttrList: [],
        valuesSkuJson: {}
    },
    //初始化 防止服务器数据返回不及时报错

    uuid:getUUID()
    //加载details时 获取uuid
}

const getters = {
    
}

export default {
    actions,
    mutations,
    state,
    getters
}