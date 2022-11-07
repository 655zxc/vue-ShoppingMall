<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 展示路由组件 -->
    <!-- <Footer v-show = "$route.path == '/home'||$route.path=='/search'"/> -->
    <!-- 不建议这样 页面多了太繁琐 -->
    <!-- 登陆注册时footer不显示 主页搜索显示 -->
    <!-- app里的$route就是展示的组件的$route 一会是login的$route 一会是search的$route -->
    <Footer v-show = "$route.meta.showFooter"/>
    <!-- 根据当前路由的meta信息决定展示 -->
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
export default {
  name: 'App',
  components:{
    Header,Footer
  },
  mounted(){
    this.$store.dispatch("categoryList");
    //组件挂载完毕 发送请求 把数据存在vuex中
    // console.log(this.$store.state.home.categoryList); 拿到了 在vue里能看到 但是这看不到 ?
  }
 
}
</script>

<style>

</style>
