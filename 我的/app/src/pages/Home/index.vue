<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- vfor遍历这两个数据得到两个floor -->
    <!-- floorList的每个元素存一个floor的数据 -->
    <Floor v-for="p in floorList" :key = "p.id" :data = "p"/>

    <Brand/>
    
  </div>
</template>

<script>
import ListContainer from './ListContainer/index'
import Recommend from './Recommend/index'
import Rank from './Rank/index'
import Like from './Like/index'
import Floor from './Floor/index'
import Brand from './Brand/index'
import { mapState } from 'vuex'
export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    mounted(){
        this.$store.dispatch('getFloorList')
        //请求floor的数据

        // this.$store.dispatch('getUserInfo');
        //获取用户信息
    },
    computed:{
        ...mapState({
            floorList:(state) => state.home.floorList
        })
        //获取floor的数据 得到两个floor的数据 
    }
}
</script>

<style>

</style>