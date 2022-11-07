



// 该axios的基础路径访问api
// 由于本项目中访问接口地址均为 /api/XXX
// 因此用的时候,在index里加上XXX就可以了





//axios的二次封装
import axios from 'axios'

//引入仓库文件夹
import store from '@/store';
// import { config } from 'vue/types/umd';

//创建axios的实例
const request = axios.create(
    {
        baseURL:'/api', //基础路径 发送时路径会出现/api
        timeout:5000    //响应时间 超过5s即为超时
    }
)

//请求拦截器
request.interceptors.request.use(
    // config 配置对象
    (config)=>{


        if(store.state.details.uuid){
            config.headers.userTempId = store.state.details.uuid;
        }//给请求头添加uuid
       
        if(store.state.user.token){
            config.headers.token = store.state.user.token;
        }//给请求头添加token

        return config
    }
)

request.interceptors.response.use(
    (res)=>{
        return res.data//返回只需要data
    },//成功回调
    (err)=>{
        return Promise.reject(new Error(err))//失败 终止promise链
    }//失败回调
)

export default request