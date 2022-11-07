<template>
  <div class="pagination">
    <button :disabled = "pageNo == 1" @click="$bus.$emit('changePageNo',pageNo-1)" >上一页</button>
    <button v-if="startend.start>1" @click="$bus.$emit('changePageNo',1)" >1</button>
    <button v-if="startend.start>2">···</button>



    <template v-for="p in startend.end" >
    <button  v-if="p>=startend.start" :key = "p" @click="$bus.$emit('changePageNo',p)" :class="{active:pageNo==p}">{{p}}</button>  
    </template>
    <!-- 使用vfor遍历得到的end -->
    <!-- v-if隐藏start之前的页数 -->

    

    
    <button v-if="startend.end<Math.ceil(total/pageSize)-1">···</button>
    <button v-if="startend.end<Math.ceil(total/pageSize)" @click="$bus.$emit('changePageNo',Math.ceil(total/pageSize))">{{Math.ceil(total/pageSize)}}</button>
    <button :disabled="pageNo == Math.ceil(total/pageSize)" @click="$bus.$emit('changePageNo',pageNo+1)">下一页</button>

    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{

      //根据当前页计算连续页的start和end
      startend(){
        let start = this.pageNo - Math.floor(this.continues/2)
        let end = parseInt(this.pageNo) + Math.floor(this.continues/2)

        //如果连续页大于总页数 就没那么复杂了
        if(this.continues>Math.ceil(this.total/this.pageSize))
        {
          start = 1
          end = Math.ceil(this.total/this.pageSize)
        }
        //页数大于连续页
        else{
          //如果左边超出范围
          if(start<1){
            start = 1
            end = this.continues
          }
          //如果右边超出范围
          if(end>Math.ceil(this.total/this.pageSize)){
            start = Math.ceil(this.total/this.pageSize) - this.continues + 1
            end = Math.ceil(this.total/this.pageSize)
          }
        }
        
        start = parseInt(start)
        end = parseInt(end)
        //返回多于一个数字时 可以返回对象
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
      margin-bottom: 50px;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>

