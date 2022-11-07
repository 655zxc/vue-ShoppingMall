<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="geiQian(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import mixin from "./mymixin/mixin.js"
export default {
  name:'Daughter',
  mixins:[mixin],
  //引入mixin的JS内容 不加引号
  data () {
    return {
      money: 20000
    }
  },

  methods: {
    //  tinghua(){
    //     console.log('我是小红，我听爸爸的话');
    // },
    // geiQian(money){
    //    this.money-=money;
    //    this.$parent.money+=money;
    // }
    //类似的部分可以使用mixin
  }
}
</script>
