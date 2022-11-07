<template>
  <div>
    <h1>EventTest组件</h1>



    <!-- 原生dom绑定原生DOM事件 -->
    <button @click="handler">原生btn按钮</button>



    <!-- 组件绑定原生dom事件 -->
    <!-- @写在组件标签里 就变成了自定义事件 因为这个标签不是原生dom-->
    <!-- @click.native 变回原生DOM事件，利用事件的委派-->
    <Event1 @click.native="handler1"></Event1>
    <hr/>




    <!-- 原生DOM绑定自定义事件没有任何意义 -->
    <!-- 因为没有emit触发这个自定义事件 -->
    <!-- <button @erha="handler3"> 原生的btn</button> -->



    <!-- 组件绑定自定义事件 -->
    <!-- click xxx都是自定义事件 需要event2里的emit触发 -->
    <Event2 @click="handler2" @xxx="handler2"></Event2>




    <!-- 表单元素 color:选取颜色  range：范围条 date：日历 week-->
    <input type="week" />
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
      //原生DOM事件的回调
      handler(event){
        console.log(event);
      },
      handler1(){
        console.log('66666666');
      },
      handler2(params){
       console.log(params);
      }
    }
  }
</script>
