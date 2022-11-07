<template>
  <div>


    <h2>使用v-model</h2>
    <input type="text" v-model="msg">
    <span>{{msg}}</span>
    <br>


    <h2>v-model原理:用v-bind实现v-model</h2>
    <!-- 原生DOM当中是有oninput事件：当表单元素发生文本的变化的时候就会立即调用回调 -->
    <!-- input发生变化,立即给msg赋值为input的内容 -->
    <input type="text" :value="msg" @input=" msg = $event.target.value"/>
    <span>{{msg}}</span>



    <!--组件中的：自定义组件绑定v-model和:value-->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>   
    <!-- :value是什么?是props父子通信  -->
    <!-- @input是什么? 自定义事件 会修改msg的值 参数由子传过来-->
    <!-- 修改子数据会改变父数据 实现了父子组件数据共用 -->
    <!-- 等价于下面的写法 -->
    <CustomInput v-model="msg"></CustomInput>
    <hr>

    <!-- v-model绑定checkbox的情况 -->
    绑定checkbox
    <input type="checkbox" value="first" v-model="checked">
    <input type="checkbox" value="second" v-model="checked">
    v-model绑定的值:{{checked}}

  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data() {
      return {
         msg:"我爱塞北的大雪呀",
         checked:[]
      }
    },
    components: {
      CustomInput
    }
  }
</script>
