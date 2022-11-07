import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from '@/router/index'

//注册全局组件
import TypeNav from '@/components/TypeNav/index'
Vue.component(TypeNav.name,TypeNav)

//测试接口
// import {reqCategoryList} from '@/api'
// console.log(reqCategoryList());

//vuex
import store from './store/index.js'

//引入mockServe这个js文件
import '@/mock/mockServe'

//引入轮播图样式
import 'swiper/css/swiper.css'

//测试接口
// import {reqSearchInfo} from '@/api/index'
// console.log(reqSearchInfo({}));

// 全局使用<Pagination> <pagination/>
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination) 

//测试uuid
// import {getUUID} from '@/utils/uuid'
// console.log(getUUID());


import * as API from '@/api' //引入所有接口

//引入element组件
import { Button ,MessageBox} from 'element-ui';
Vue.component(Button.name, Button);

// //引入图片懒加载
import VueLazyload from 'vue-lazyload';
import picture from '@/assets/1.jpg'
// //注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:picture
});


// //以下皆为表单验证
// //vee-validate插件：表单验证区域’
// import VeeValidate from "vee-validate";
// //中文提示信息
// import zh_CN from "vee-validate/dist/locale/zh_CN";
// Vue.use(VeeValidate);

// //表单验证
// VeeValidate.Validator.localize("zh_CN", {
//   messages: {
//     ...zh_CN.messages,
//     is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
//   },
//   attributes: {
//     phone: "手机号",
//     code: "验证码",
//     password: "密码",
//     password1: "确认密码",
//     agree:'协议'
//   },
// });

// //自定义校验规则
// VeeValidate.Validator.extend("tongyi", {
//   validate: (value) => {
//     return value;
//   },
//   getMessage: (field) => field + "必须同意",
// });





new Vue({
  render: h => h(App),
  router,//引入一个路由
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API//绑定接口到原型上

    //注册组件
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}).$mount('#app')
