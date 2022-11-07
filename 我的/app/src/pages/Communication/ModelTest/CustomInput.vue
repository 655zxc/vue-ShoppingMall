<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件----{{value}}</h2>
    <input :value="value"  @input="$emit('input',$event.target.value)"/>
    <!-- 单向绑定父传来的值到输入框上 -->
    <!-- input是原生dom的事件 触发回调,触发input自定义事件,并传输入框的值 -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props:['value']
    // 接收父组件传来的值
  }
</script>
