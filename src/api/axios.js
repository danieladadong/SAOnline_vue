import axios from 'axios'
import Qs from 'qs'
import Router from '@/router/index'
import cookie from 'js-cookie'

// 超时设定
axios.defaults.timeout = 15000
axios.defaults.baseURL = "http://localhost:8000/";

//http request 拦截器
axios.interceptors.request.use(function(config){
  // let token = typeof(cookie.get('token')) != "undefined" ? cookie.get('token') : null;
  // config.headers['token'] = token; // 请求头带上token
  return config
}, function(err){
  Message({
    message: '请求超时',
    type: 'error'
  })
  return Promise.reject(er.messager)
});

// http response 拦截器
axios.interceptors.response.use(function(response){
  if (response.status==200) { //如果返回success，statusCode==200时，不拦截
    const data = response.data;
    return data
  }
}, (err) => { //响应失败时的处理
  // 根据返回的code值来做不同的处理(和后端约定)
  console.log(err.response)
  switch (err.response.status) {

    case 401:
      console.log('401:' + err.response.message)
      return Promise.reject('401')
    case 500:
      if(err.response.data.message==='token无效，请重新登录'){
        Router.push({
          path:'/login'
        })
      }else{
        return err.response.data
      }
    case 600:
      // // 600时未登陆，导向登陆界面
      // Router.push({
      //     path: '/'
      // })
      // console.log('600:' + data.message)
      return Promise.reject('600')
    case 601:
      // // 601时已登录，导向主界面
      //   Router.push({
      //     path: '/about'
      //   })
      // console.log('601:' + data.message)
      return data
    default:
      console.log('错误：' + data.message)
      // return Promise.reject('未知错误')
      return Promise.reject(data)
  }
  return Promise.reject(err.response)
})

//封装 getRequest
export function getRequest(url, params) {
  return axios({
    method: 'get',
    url: `${url}`,
    params: params
  })
}
// 传入的参数
export function postRequest(url, params) {

  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {

      return Qs.stringify(data, {
        allowDots: true
      })
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 传入的参数为 JSON
// 后端需要 @RequestBody
//封装 postRequest-json数据格式
export function postJsonRequest(url, params) {

  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function putJsonRequest(url,params){
    return axios({
        method: 'put',
        url: `${url}`,
        data: params,
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export function deleteRequest(url,params){
    return axios({
        method: 'delete',
        url: `${url}`,
        params: params
    })
}

export default axios;