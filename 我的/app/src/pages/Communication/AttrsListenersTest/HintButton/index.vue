<template>
  <div>
     <a :title="title">
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
        <!-- 用 bind on 绑定父传来的数据 -->
     </a>
  </div>
</template>

<script>
export default {
  name: "",
  props:['title'],
  mounted(){
    //this.$attrs:可以获取到父亲传递的数据,就像props一样
    //如果子组件通过props接收了一部分参数,this.$attrs只能接收剩下未被props接收的参数
    console.log('props接收到的数据',this._props);
    console.log('$attrs接收到的数据',this.$attrs);
    console.log('$listeners接收到的数据',this.$listeners);
    // $listeners：组件实例的属性，可以获取到父亲传递自定义事件
  }
};
</script>

<style scoped></style>
