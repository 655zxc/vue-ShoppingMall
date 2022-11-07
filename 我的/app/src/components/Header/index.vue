<template>
          <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <!-- 如果没有名字 就没登录 -->
                            <span>请</span>
                           
                            <router-link to="/login" >登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                            <!-- 声明式路由跳转 -->
                        </p>
                        <p v-else>
                            <!-- 否则登录 -->
                            <a>{{userName}}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input v-model='keyWord' type="text" id="autocomplete" class="input-error input-xxlarge" />
                        <button  @click = 'goSearch' class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                        <!-- 按钮 不是超链接 用编程式路由 -->
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'Header',
    data(){
        return {
            keyWord:''
        }
    },
    methods:{

        //搜索栏跳转到search
        goSearch(){
            let a = {keyword:this.keyWord||undefined}//防止传空串
            let b = {}
            if(this.$route.query){//如果已经有菜单的参数了
                b = this.$route.query
            }
            this.$router.push(
                {
                    name:'Search',
                    params:a,
                    query:b
                }
            ).then(()=>{},()=>{})
            //添加回调then或者catch收集错误
            //跳转search并传参
        },
    // goSearch() {
    //   //代表的是如果有query参数也带过去
    //   if (this.$route.query) {
    //     let loction = {
    //       name: "Search",
    //       params: { keyword: this.keyword || undefined },
    //     };
    //     loction.query = this.$route.query;
    //     this.$router.push(loction);
    //   }
    // },
        clearSearch(){
            this.keyWord = ""
        },

        //退出登录
        logout(){
            //发送退出请求
            console.log("发送退出登录请求");
            this.$store.dispatch('getLogout')

            // //重新请求信息 更新页面
            // console.log("重新请求用户信息");
            // this.$store.dispatch('getUserInfo')
        }
    },
    mounted() {
        this.$bus.$on('clearSearch',this.clearSearch)
        //清空搜索栏
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name
        }
    }
   
}
</script>

<style scoped lang='less'>
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>