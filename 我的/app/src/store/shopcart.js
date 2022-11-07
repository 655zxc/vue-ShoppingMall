import {reqShopCart} from '@/api/index'
import {reqDeleteShopCart} from '@/api/index'
import {reqChangeShopCart} from '@/api/index'


const actions = {
    //获得服务器中 购物车的信息
    async getShopCart(store){
        let result = await reqShopCart()
        //shopcart不带参数 因为响应头有参数uuid
        if(result.code==200){
            store.commit('GETSHOPCART',result.data)
        }
    },

    //向服务器发送 删除商品 的信息,不返回data数据
    //写法和加入购物车类似
    async deleteShopCart(store,id){
        let result = await reqDeleteShopCart(id)
        if(result.code==200){
            return "OK"
        }
        else{
            return Promise.reject(new Error("错误"))
        }
    },
 
    //单选 全选按钮的改变 向服务器发送信息 没有data返回值 同上
    async changeShopCart(store,{skuID,isChecked}){
        let result = await reqChangeShopCart(skuID,isChecked)
        if(result.code==200){
            return "OK"
        }
        else{
            return Promise.reject(new Error("错误"))
        }
    },

    //删除所有选中的商品
    async deleteAllChecked(store){
        let arrpromise = []
        let arr = store.getters.acartInfoList
        if(arr!=undefined){
            arr.forEach(p => {
                //遍历购物车数组
                if(p.isChecked){
                    let result = store.dispatch('deleteShopCart',p.skuId)
                    //删除单个商品
                    arrpromise.push(result)
                    //添加每次删除产生的promise
                }
            });
        }
        console.log(Promise.all(arrpromise));

        return Promise.all(arrpromise)
        //判断删除单个商品是否全部成功
        //返回判断的promise
    },

    //全选按钮
    async allSelected(store,checked){
        let arrpromise = []
        let arr = store.getters.acartInfoList
        arr.forEach(p => {
            // p.isChecked = checked?1:0
            //只是改本地的 没用
            let result = store.dispatch('changeShopCart',{skuID:p.skuId,isChecked:checked?1:0})
            arrpromise.push(result)
        });

        return Promise.all(arrpromise)
       
    }
}

const mutations = {
    GETSHOPCART(state,value){
        state.shopCart = value 
    }

   
}

const state = {
    shopCart : [{}]
    //存放游客的购物车
    //由于设置了响应头的uuid
    //服务器会根据uuid返回不同的shopcart购物信息

}

const getters = {
    acartInfoList(){
        return state.shopCart[0].cartInfoList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}