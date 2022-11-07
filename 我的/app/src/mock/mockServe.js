import Mock from 'mockjs'
import banners from './banner.json'
import floors from './floor.json'

//参数1:数据请求地址(这个在api/index中要用的) 残数2:请求的数据
Mock.mock('/mock/banners',{
    code: 200,
    data: banners
})


Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})
