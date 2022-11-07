//对API统一管理
//组件想要发送请求时 只需要引入,调用这里面的函数 比如reqCategoryList() 而不需要写一大堆



//1.三级联动接口 地址/api/product/getBaseCategoryList 无参数
import requests from './request'//引入写好的axios
export const reqCategoryList = ()=>{
    //这里用的是分别暴露
    //对外暴露一个函数 这个函数return一个promise(axios都返回promise)
    return requests(
        //requests是从request引入的二次封装好的axios实例 可以发请求
        {
            url:'/product/getBaseCategoryList',//由于requests在封装的时候设置了baseURL:'/api',因此地址只用写后半段
            method:'get'
        }
    )
}



//2.mock获取轮播图的接口 用于模拟ListContainer的数据
import mockrequests from './mockrequest'
export const reqBanners = ()=>{
    return mockrequests(
        {
            url:'/banners',//在mockServe中设置的请求地址/mock/banners
            method:'get'
        }
    )
}



//3.mock获取轮播图的接口 用于模拟Floor的数据
//使用2中引进 mockrequest ,因为2,3,基本路径都相同,使用同样的axios
export const reqFloor = ()=>{
    return mockrequests(
        {
            url:'/floors',//在mockServe中设置的请求地址/mock/banners
            method:'get'
        }
    )
}


//4.访问search的接口
//地址api/list 类型post 参数8个,作为一个对象
export const reqSearchInfo = (params)=>{//这个接口需要参数,因此箭头函数有形参
    return requests(
        {
            url:'/list',
            method:'post',
            data:params
            //传递参数
        }
    )
}


//5.details模块 请求商品详细信息
export const reqDetailsInfo = (id)=>{//这个接口需要参数,因此箭头函数有形参
    return requests(
        {
            url:`/item/${id}`,
            method:'get',
           //不需要data 已经在url里传值了
        }
    )
}


//6.请求购物成功的数据
export const reqShoppingCart = (id,num)=>{
    return requests(
        {
            url:`/cart/addToCart/${id}/${num}`,
            method:'post',
           
        }
    )
}


//7.请求购物车的数据
export const reqShopCart = ()=>{
    return requests(
        {
            url:"/cart/cartList",
            method:'get',
           
        }
    )
}


//8.删除购物车数据
export const reqDeleteShopCart = (skuId)=>{
    return requests(
        {
            url:`/cart/deleteCart/${skuId}`,
            method:'delete',
        }
    )
}


//9.购物车的单选和全选按钮
export const reqChangeShopCart = (skuID,isChecked)=>{
    return requests(
        {
            url:`/cart/checkCart/${skuID}/${isChecked}`,
            method:'get',
        }
    )
}


//10.获取验证码的接口
export const reqCode = (phone)=>{
    return requests(
        {
            url:`/user/passport/sendCode/${phone}`,
            method:'get',
        }
    )
}


//11.注册用户的接口
export const reqRegister = (params)=>{
    return requests(
        {
            url:"/user/passport/register",
            method:'post',
            data:params
        }
    )
}


//12.登录的接口
export const reqLogin = (params)=>{
    return requests(
        {
            url:"/user/passport/login",
            method:'post',
            data:params
        }
    )
}


//13.token校验获取用户登录信息 无参数 token在请求头设置
export const reqUserInfo = ()=>{
    return requests(
        {
            url:"/user/passport/auth/getUserInfo",
            method:'get',
        }
    )
}


//14.退出登录
export const reqLogout = ()=>{
    return requests(
        {
            url:"/user/passport/logout",
            method:'get',
        }
    )
}


//15.获取用户地址信息
export const reqAddress = ()=>{
    return requests(
        {
            url:"/user/userAddress/auth/findUserAddressList",
            method:'get',
        }
    )
}


//16.获取订单交易信息
export const reqTrade = ()=>{
    return requests(
        {
            url:"/order/auth/trade",
            method:'get',
        }
    )
}


//17.提交订单
export const reqSubOrder = (tradeNo,params)=>{
    return requests(
        {
            url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
            method:'post',
            data:params
        }
    )
}


//18.获取订单信息
export const reqOrderInfo = (orderId)=>{
    return requests(
        {
            url:`/payment/weixin/createNative/${orderId}`,
            method:'get',
        }
    )
}


//19.查询订单支付状态
export const reqPatStatus = (orderId)=>{
    return requests(
        {
            url:`/payment/weixin/queryPayStatus/${orderId}`,
            method:'get',
        }
    )
}


//20.获取我的订单
export const reqMyOrder = (page,limit)=>{
    return requests(
        {
            url:`/order/auth/${page}/${limit}`,
            method:'get',
        }
    )
}