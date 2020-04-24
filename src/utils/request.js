/**
 * 拦截器
 */
 import axios from 'axios';
 import { Message } from 'element-ui';

 const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';  //此处的/devApi是将vue.config.js文件中/devApi的替换过来

 //创建axios，然后赋值变量给serve
 const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
  });

//请求接口前，做一些数据处理（请求拦截器）
 service.interceptors.request.use(function (config) {
    // 在发送请求之前需要做什么
    //在请求头添加参数
    //Tokey
    //userId
    //sui
    //业务需求
    config.headers['Tokey'] = "123";
    config.headers['userId'] = "MZH";
    config.headers['sui'] = "456";
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//请求接口后，返回数据进行拦截（响应拦截器）
service.interceptors.response.use(function (response) {
    //对响应数据后做一些事情
    let data = response.data;
    if(data.resCode !== 0){
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
    }
  }, function (error) {
    // 对响应错误后做一些事情
    return Promise.reject(error);
  });

// 此处我们使用request，当我们需要修改请求的方法的时候，只需要修改method即可
// service.request({
//     method: 'post',
//     url:'/user/12345',
//     data:{
//         firstName:'frod',
//         lastName:'Flintstone'
//     }
// })

export default service;

