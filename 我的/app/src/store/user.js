//login和register共用的模块
import {reqCode} from '@/api/index'
import {reqRegister,reqLogin,reqUserInfo,reqLogout} from '@/api/index'



const actions = {
    //请求验证码
    async getCode(store,phone){
       
        let result = await reqCode(phone)
        if(result.code == 200){
            store.commit('GETCODE',result.data)
            return 'OK' 
            //返回一个正常的promise
        }
        else{
            return Promise.reject(new Error('错误'))
            //返回一个错误的Promise
        }
    },

    //请求注册
    async reqRegister(store,params){
        let result = await reqRegister(params)
        if(result.code==200){
            console.log(result.message,params);
            return "OK"
        }
        else{
            return Promise.reject(new Error(result.message))
        }
    },

    //请求登录
    async reqLogin(store,params){
        let result = await reqLogin(params)
        // console.log("登录", result,params);
        localStorage.setItem("TOKEN",result.data.token)
        //将token存储至本地
        if(result.code==200){
            store.commit('REQLOGIN',result.data.token)
            return "OK"
        }
        else{
            return Promise.reject(new Error("result.message"))
        }
    },

    //获取用户信息
    async getUserInfo(store){
        let result = await reqUserInfo()
        // console.log('获取用户信息', result);
        if(result.code==200){
            store.commit('GETUSERINFO',result.data)
            return "OK"
        }     
        else{
            return Promise.reject(new Error("错误"))
        }
    },

    //退出登录
    async getLogout(store){
        let result = await reqLogout()
        // console.log("登出信息",result);
        if(result.code == 200){
            store.commit('GETLOGOUT')
        }
    },
}

const mutations = {
    GETCODE(state,value){
        state.code = value
    },

    REQLOGIN(state,value){
        state.token = value
    },

    GETUSERINFO(state,value){
        state.userInfo = value
    },

    GETLOGOUT(state){
        //清除本地缓存
        localStorage.removeItem("TOKEN")
        //清除仓库
        state.token = ""
        state.userInfo = ""
        state.code = ""
    }
}

const state = {
    code:"",//验证码
    token:localStorage.getItem('TOKEN'),//令牌 默认值为本地存储的token
    userInfo:{}//用户信息
}

const getters = {
  
}

export default {
    actions,
    mutations,
    state,
    getters
}