//总仓库
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home'
import search from './search'
import details from './details'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'



export default  new Vuex.Store({
    modules:{
        home,
        search,
        details,
        shopcart,
        user,
        trade
    }
})