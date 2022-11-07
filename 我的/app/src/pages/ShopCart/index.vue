<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">



        <ul class="cart-list" v-for="p in shopcart" :key="p.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="p.isChecked == 1"
              @click = "oneSelected(p,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="p.imgUrl" />
            <div class="item-msg">{{ p.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ p.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('sub',-1,p)" >-</a>
            <!-- 由于value绑定了数据 因此只要skunum不变 input即使输入非法数据但不发送请求 input内容就不会变 -->
            <input
              autocomplete="off"
              type="text"
              :value="p.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change',$event.target.value*1,p)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,p)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ p.skuNum * p.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteShopCart(p.skuId)">删除</a>
            <br />
            <a href="javascript:void(0)">移到收藏</a>
          </li>




        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @click="allSelected" :checked="isAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllChecked">删除选中的商品</a>
        <a href="javascript:void(0)">移到我的关注</a>
        <a href="javascript:void(0)">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ sumSku }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费）:</em>
          <i class="summoney"> {{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  target="_blank" @click="pay">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getShopCart");
    //获取shopcart的参数
  },
  methods: {
    //单选按钮
    async oneSelected(p,e){
      //p.isChecked是从vuex仓库得到的记录是否被选中
      //e.target.checked是当前input是否被选中

      let isChecked = e.target.checked == true ? 1 : 0
      //获取改变的状态

      //向服务器发送已改变的信息
      try {
        await this.$store.dispatch('changeShopCart',{skuID:p.skuId,isChecked:isChecked})

         //服务器数据改变了 重新获取数据
         this.$store.dispatch("getShopCart");
      } catch (error) {
          console.log(error.message);
      }
     
    },

    //全选按钮
    async allSelected(e) {
      try {
        await this.$store.dispatch('allSelected',e.target.checked)
        this.$store.dispatch("getShopCart");
      } 
      catch (error) {
        console.log(error.message);
      }
    },

    //改变商品数量 type是谁点击的 num是改变数量 p是商品
    handler: throttle(function(type,num,p){
      //num形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
      switch(type){
        //根据类型 发送请求
        case 'add':
                  this.$store.dispatch('shoppingCart',{id:p.skuId,num:num});
                  //这里应该写await接收 然后处理错误情况 但我懒得写了
                  break;
        case 'sub':
                  if(p.skuNum>1){
                    this.$store.dispatch('shoppingCart',{id:p.skuId,num:num});
                  }
                  break;
        case 'change':
                  //判断输入框的数量 传入之前做了*1的处理
                  if(isNaN(num) || num<1){
                  //不执行
                  }
                  else{
                    this.$store.dispatch('shoppingCart',{id:p.skuId,num:parseInt(num)-p.skuNum});
                  }
                  break;
        default:break;
      }

      //服务器数据改变了 重新获取数据
      this.$store.dispatch("getShopCart");
    },500),

    //删除购物车单个商品
    async deleteShopCart(id){
      try {
        //发送删除信息
        let result = await this.$store.dispatch('deleteShopCart',id)
        //重新从服务器获取购物车信息
        this.$store.dispatch("getShopCart");
        //
        // this.$router.push('ShopCart')
      } catch (error) {
        console.log(error.message);
      }
    },

    //删除所有选中的商品
    async deleteAllChecked(){
      try {
        await this.$store.dispatch('deleteAllChecked')
        console.log(result);

        //重新从服务器获取购物车信息
        this.$store.dispatch("getShopCart");
      } 
      catch (error) {
        console.log(error.message);
      }
    },

    //结账
    pay(){
      //也可以用routerlink
      this.$router.push('/trade')
    }
  },
  computed: {
    ...mapState({
      shopcart: (state) => state.shopcart.shopCart[0].cartInfoList,
      //从仓库绑定数据
    }),

    //计算总价 在表达式里不好计算 在这里计算
    sumPrice() {
      let sum = 0;
      if (this.shopcart !== undefined) {
        this.shopcart.forEach((p) => {
          if (p.isChecked == 1) {
            sum += p.skuNum * p.cartPrice;
          }
        });
      }

      return sum;
    },

    //计算总商品数
    sumSku() {
      let sum = 0;
      if (this.shopcart !== undefined) {
        this.shopcart.forEach((p) => {
          if (p.isChecked == 1) {
            sum += p.skuNum;
          }
        });
      }
      return sum;
    },

    //全选按钮
    isAllChecked(){
      let flag = 1
       if (this.shopcart !== undefined) {
         
        this.shopcart.forEach((p) => {
          if(p.isChecked == 0){
            //发现有未选
            flag = 0
            //让全选按钮变为未选
          }
        });
      }
      return flag
    }
  },
 
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;
      }

      .cart-list-con5 {
        width: 17%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 10%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 13%;

        a {
          color: #666;
        }
      }
    }
  }
}

.cart-tool {
  overflow: hidden;
  border: 1px solid #ddd;

  .select-all {
    padding: 10px;
    overflow: hidden;
    float: left;

    span {
      vertical-align: middle;
    }

    input {
      vertical-align: middle;
    }
  }

  .option {
    padding: 10px;
    overflow: hidden;
    float: left;

    a {
      float: left;
      padding: 0 10px;
      color: #666;
    }
  }

  .money-box {
    float: right;

    .chosed {
      line-height: 26px;
      float: left;
      padding: 0 10px;
    }

    .sumprice {
      width: 200px;
      line-height: 22px;
      float: left;
      padding: 0 10px;

      .summoney {
        color: #c81623;
        font-size: 16px;
      }
    }

    .sumbtn {
      float: right;

      a {
        display: block;
        position: relative;
        width: 96px;
        height: 52px;
        line-height: 52px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>