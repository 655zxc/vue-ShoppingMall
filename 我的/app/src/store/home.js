import { reqCategoryList, reqBanners, reqFloor } from '@/api/index'

const actions = {

    //获取服务器三级菜单的数据
    async categoryList(store) {
        // console.log(reqCategoryList()); 输出服务器返回的数据 一个成功的promise
        let result = await reqCategoryList()
        if (result.code == 200) {
            store.commit('CATEGORYLIST', result.data)//commit数据
        }
    },


    //获取服务器主轮播图的数据
    //写法同上
    async getListBanner(store) {
        let result = await reqBanners()
        if (result.code == 200) {
            store.commit('GETLISTBANNER', result.data)//commit数据
        }
    },


    //获取服务器floor轮播图的数据
    //写法同上
    async getFloorList(store) {
        let result = await reqFloor()
        if (result.code == 200) {
            store.commit('GETFLOORLIST', result.data)//commit数据
    }
    }
}

const mutations = {
    CATEGORYLIST(state, value) {
        value.pop()

        state.categoryList = value
    },



    GETLISTBANNER(state, value) {
        state.bannerList = value
    },



    GETFLOORLIST(state, value) {
        state.floorList = value
    }
}

const state = {
    categoryList: [], //存放typenav数据 数据类型根据服务器返回的数据设置 不是自己随便写的 即数组

    bannerList: [],

    floorList: [],


}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}