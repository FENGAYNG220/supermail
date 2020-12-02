import axios from "axios"
export function request(config){
  const instance=axios.create({
 
    //1 . 创建axios实例
    baseURL:'http://123.207.32.32:8000',
    timeout:2000
    //可以加headers 
  })
    //2.axios 的拦截器
    instance.interceptors.request.use(config=>{
      // console.log(config)
      //2.1 请求拦截
      // 1. 比如config 中的 一些信息不符合服务器的要求
      // 2. 比如每次发送网络请求时，都希望在界面中显示一个请求图标
      // 3. 某些网络请求（比如登录 token ）,必须携带一些特殊信息
      return config
    },err=>{
      // console.log(err)
    })
     
      
      //2.2 响应拦截
    instance.interceptors.response.use(res=>{
      // console.log(res)
      return res.data
    },err=>{
      // console.log(err)
    })




    //3.发送真正的网络请求
    return  instance(config)
  

 } 
     

