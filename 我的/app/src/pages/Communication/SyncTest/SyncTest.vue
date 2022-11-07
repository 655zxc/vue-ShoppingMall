<template>
  <div>
    小明的爸爸现在有{{ money }}元



    <h2>不使用sync修改符</h2>
    <Child :money="money" @update:money="money = $event"></Child>
    <!-- props传值money给子组件 自定义事件接收子组件emit传的参数并修改money值 -->
    <!-- 实现了父子传值 -->
    



    <h2>使用sync修改符</h2>
    <!-- sync做了两件事 props传值money 写了自定义事件update:money -->
    <!-- v-model是,传值,自定义事件input -->
    <!-- 两者区别就是自定义事件的名字不一样 -->
    <Child :money.sync="money"></Child>
    <!-- 等价于上面 -->




    <h2>使用v-model修改符</h2>
    <Child2 v-model="money"></Child2>
    <!-- 等价于:value="money" @input="money = $event" -->


    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',
  data() {
    return {
      money: 10000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
