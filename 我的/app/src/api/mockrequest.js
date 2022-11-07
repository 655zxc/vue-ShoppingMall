

//这是request的复制 用于mock请求




import axios from 'axios'


const request = axios.create(
    {
        baseURL:'/mock', //路径为mock
        timeout:5000    
    }
)

request.interceptors.request.use(

    (config)=>{
        return config
    }
)

request.interceptors.response.use(
    (res)=>{
        return res.data
    },
    (err)=>{
        return Promise.reject(new Error('fail'))
    }
)

export default request
