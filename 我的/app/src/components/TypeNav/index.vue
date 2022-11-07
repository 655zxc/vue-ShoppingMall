<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- search中一级菜单的显示 -->

      <div @mouseenter="entershow" @mouseleave="leaveshow">
        <h2 class="all">全部商品分类</h2>
        <transition name='sort'>
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(p1, index) in categoryList"
                :key="p1.categoryId"
              >
                <!-- 遍历数组第一层 -->
                <div @mouseenter="enterindex(index)" @mouseleave="leaveindex">
                  <!-- 二级菜单的显示 -->
                  <h3 :class="{ cur: index == currentIndex }">
                    <!-- 鼠标移入触发事件 -->
                    <a
                      :data-categoryname="p1.categoryName"
                      :data-categoryid1="p1.categoryId"
                      >{{ p1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: index == currentIndex ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="p2 in p1.categoryChild"
                      :key="p2.categoryId"
                    >
                      <!-- 遍历数组第二层 目标是第一层的某个数据 -->
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryname="p2.categoryName"
                            :data-categoryid2="p2.categoryId"
                            >{{ p2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="p3 in p2.categoryChild"
                            :key="p3.categoryId"
                          >
                            <!-- 第三层遍历 -->
                            <a
                              :data-categoryname="p3.categoryName"
                              :data-categoryid3="p3.categoryId"
                              >{{ p3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //按需引入lodash
export default {
  name: "TypeNav",
  mounted() {
    //如果当前路由是search 则隐藏菜单
    // console.log(this.$route.path.slice(0,7)); //有时候参数是/search/XXX
    // if (this.$route.path.slice(0,7) == "/search" || this.$route.path.slice(0,8) == "/details") 
    if(this.$route.path != '/home')
    {
      this.isShow = false;
    // console.log(55);
    }

  
  },
  computed: {
    //state:他是咱们大仓库中的state（包含home|search）
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  //这样 就可以this.categoryList访问数据了
  methods: {
    //二级菜单的显示
    // enterindex(index){//鼠标移入事件
    //     this.currentIndex = index//设置当前鼠标指向
    // },
    //不节流
    //使用lodash实现节流 采用key-value写法 50ms执行一次
    enterindex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveindex() {
      //移出重置
      this.currentIndex = -1;
    },

    // search中一级菜单的显示
    entershow() {
      this.isShow = true;
    },
    leaveshow() {
      //在search中移出就隐藏
      // if (this.$route.path.slice(0,7) == "/search" || this.$route.path.slice(0,8) == "/details") 
      if(this.$route.path != '/home')
      {
          //通过params参数 有时候参数是/search/XXX 
        this.isShow = false;
      }
    },

    // goSearch(e) {
    //   //菜单的路由跳转事件
    //   let {
    //     categoryName,
    //     categoryId1,
    //     categoryId2,
    //     categoryId3,
    //   } = e.target.dataset; //解构赋值获取目标的属性

    //   if (categoryName) {
    //     //如果存在categoryname 则是a
    //     // console.log(categoryname,categoryid1,categoryid2,categoryid3);

    //     let query = {categoryName} //传递参数
    //     let params = {} //存搜索栏的参数

    //     if (categoryId1) {
    //       //如果是一级菜单
    //         query.categoryId = categoryId1 //添加传递参数
    //     } else if (categoryId2) {
    //       //如果是二级菜单
    //         query.categoryId = categoryId2 //添加传递参数
    //     } else {
    //       //如果是三级菜单
    //         query.categoryId = categoryId3 //添加传递参数
    //     }

    //     if(this.$route.params){//如果存在搜索栏的参数
    //         params = this.$route.params
    //     }

    //      this.$router.push({
    //         name: 'Search',
    //         query: query,
    //         params:params
    //       });
    //   }
    // },

        goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      
      let node = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let {
        categoryname,
        categoryid1,
        categoryid2,
        categoryid3,
      } = node.dataset;
     
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: "Search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (categoryid1) {
          query.category1Id = categoryid1;
          //一定是a标签：二级目录
        } else if (categoryid2) {
          query.category2Id = categoryid2;
          //一定是a标签：三级目录
        } else {
          query.category3Id = categoryid3;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          loction.params = this.$route.params;
          //动态给location配置对象添加query属性
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
  },

  
  data() {
    return {
      currentIndex: -1, //当前鼠标指向
      isShow: true, //默认显示typenav
    };
  },
};
</script>

<style scoped lang='less'>
.type-nav {
//   border-bottom: 2px solid #e1251b;
  border-bottom: 2px solid #F56C6C;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
    //   background-color: #e1251b;
      background-color:#F56C6C;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }



    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }

          //     .cur{
          //         background-color: skyblue;
          //     }
          // }

          .cur {
            background-color: #DCDFE6;
          }
        }
      }
    }

    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
    //   height: 0px;
    opacity:0
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
     //   height: 461px;
    opacity:1
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.15s linear;
    }
  }
}
</style>