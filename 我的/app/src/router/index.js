import Home from '@/pages/Home/index'
import Login from '@/pages/Login/index'
import Search from '@/pages/Search/index'
import Register from '@/pages/Register/index'
import Details from '@/pages/Details/index'
import AddCartSuccess from '@/pages/AddCartSuccess/index'
import ShopCart from '@/pages/ShopCart/index'
import Trade from '@/pages/Trade/index'
import Pay from '@/pages/Pay/index'
import PaySuccess from '@/pages/PaySuccess/index'
import Center from '@/pages/Center/index'
import MyOrder from '@/pages/Center/MyOrder/index'
import GroupOrder from '@/pages/Center/GroupOrder/index'

import VueRouter from 'vue-router'
import store from '@/store'

const myrouter = new VueRouter({
    routes: [



        // {
        //     path: '/communication',
        //     component: () => import('@/pages/Communication/Communication'),
        //     children: [
        //       {
        //         path: 'event',
        //         component: () => import('@/pages/Communication/EventTest/EventTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       },
        //       {
        //         path: 'model',
        //         component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       },
        //       {
        //         path: 'sync',
        //         component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       },
        //       {
        //         path: 'attrs-listeners',
        //         component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       },
        //       {
        //         path: 'children-parent',
        //         component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       },
        //       {
        //         path: 'scope-slot',
        //         component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        //         meta: {
        //           isHideFooter: true
        //         },
        //       }
        //     ],
        // },




        {
            //总页面的重定向
            path: '/',
            redirect: '/home'
            // redirect:'/Communication'
        },
        {
            name: 'Center',
            path: '/center',
            component: Center,
            meta: {
                showFooter: true
            },
            children:[//二级路由
                {
                    name: 'MyOrder',
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    name: 'GroupOrder',
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    //center路由的重定向
                    path: '/center',
                    redirect: 'myorder'
                },
            ]
        },
        {
            name: 'PaySuccess',
            path: '/paySuccess',
            component: PaySuccess,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'Pay',
            path: '/pay',
            component: Pay,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                // 独享守卫 解决问题4
                if(from.path == "/trade"){
                    //从trade来的 放行
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        {
            name: 'Trade',
            path: '/trade',
            component: Trade,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                // trade独享守卫 解决问题4
                if(from.path == "/shopcart"){
                    //从shopcart来的 放行
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        {
            name: 'AddCartSuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'ShopCart',
            path: '/shopcart',
            component: ShopCart,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'Details',
            path: '/details/:id',
            component: Details,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'Home',
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
            meta: {
                showFooter: false
            }
        },
        // 字符串里面千万不能有空格!! 比如'/login '是错的
        {
            name: 'Search',
            // path: '/search',
            path: '/search/:keyword?',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'Register',
            path: '/register',
            component: Register,
            meta: {
                showFooter: false
            }
        },


    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//全局守卫 解决开发模块中的问题1,2,3
myrouter.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;//获取token 用来判断有没有登陆过
    let name = store.state.user.userInfo.name;//获取name 用来判断有没有用户信息

    if (token) {
        //如果登录了
        if (to.path == '/login' || to.path == '/register') {
            //如果去的是login页面 跳走
            // console.log("登陆时访问login");
            next('/home')
        }
        else if (name) {
            //仍有用户信息 放行
            // console.log("有用户信息");
            next()
        }
        else {
            //没有用户信息 则需要重新获取用户信息
            // console.log("没有用户信息,重新获取");
            try {
                await store.dispatch('getUserInfo')
                //放行
                // console.log("获取成功");
                next()
            } catch (error) {
                //获取失败 自动登出 需要重新登录
                // console.log("获取失败");
                await store.dispatch('getLogout');
                next('/login')
            }
        }
    }
    else {
        //未登录 不能去交易 支付 个人中心,去这些地方跳转到login,否则放行
        // console.log("未登录");

        let path = to.path
        // console.log("访问路径",path);

        //如果path包含这些路径 则跳转到login页面
        if(path.indexOf('/trade')!=-1 || path.indexOf('/pay')!=-1||path.indexOf('/center')!=-1){
            // console.log("访问了不能去的页面");
            //跳转到login并携带想要跳转页面的query参数 再login组件里做判断
            next(`/login?path=${path}`)
        }
        else{
            //放行
            // console.log("可以访问的页面");
            next()
        }
    }
})



export default myrouter




