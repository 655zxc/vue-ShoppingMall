//自定义的插件
//插件是一个对外暴露的对象
//有一个install方法 在vue.use的时候调用这个方法

let myPlugins = {}

//第一个参数是vue 第二个参数是一些配置对象
myPlugins.install=function(Vue,option){
    //在方法里 会有一些操作 比如添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现
}

export default myPlugins
