<template>
  <div class="spec-preview">
    <img :src="skuImageList[this.cur].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="skuImageList[this.cur].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],//父组件传的数据
    data(){
      return {
        cur:0
        //当前图片索引
      }
    },
    mounted(){
      this.$bus.$on('changeImg',this.changeImg)
    },
    methods:{
      //接收兄弟传参并执行回调
      changeImg(index){
        this.cur = index
      },
  
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth/2;
      let top = event.offsetY - mask.offsetHeight/2;
      //约束范围
      if(left <=0) left = 0;
      if(left >=mask.offsetWidth) left = mask.offsetWidth;
      if(top<=0)top = 0;
      if(top>=mask.offsetHeight) top = mask.offsetHeight;
      //修改元素的left|top属性值
      mask.style.left = left+'px';
      mask.style.top = top +'px';

      // 大背景图是小图的两倍 因此乘2 向反方向移动
      big.style.left = - 2 * left+'px';
      big.style.top = -2 * top +'px';
     
    }
  }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>