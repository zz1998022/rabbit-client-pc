// 1.创建一个新的axios实例 用于配置和小兔鲜服务器端相关的请求配置
// 2.配置基准的请求地址
// 3.配置请求拦截器 看看本地是否存在token，如果存在 将它放在请求头中
// 4.配置响应拦截器 精简数据层级 检查token是否过期
import axios from "axios";
import store from "@/store";
import router from "@/router";

// 线上环境: https://apipc-xiaotuxian-front.itheima.net/
// 开发环境: http://pcapi-xiaotuxian-front-devtest.itheima.net/

const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";

const instanceWithToken = axios.create({ baseURL });
const instanceWithoutToken = axios.create({ baseURL });

// 请求拦截器
instanceWithToken.interceptors.request.use((config) => {
  // 当发送请求时 先走当前的回调函数
  const token = store.state.user.profile.token;
  // 判断token是否存在
  if (token) {
    // 如果存在 将token放在请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 不返回相当于没修改
  return config;
});

// 响应拦截器
instanceWithToken.interceptors.response.use(
  (response) => {
    // 如果服务器端返回的是表示成功的状态码 走这个回调函数
    // 服务器端做出响应以后，先走当前回调函数，当前回调函数中可以对响应结果进行处理，处理完成后在给到请求的调用者
    return response.data;
  },
  (error) => {
    // 如果服务器端返回的是表示失败的状态码 走这个回调函数
    if (error.response.status === 401) {
      // 401 未授权
      // 1.跳转到登录页
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
      // 2.清空本地的用户信息
      store.commit("user/setUser", {});
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
instanceWithoutToken.interceptors.response.use((response) => response.data);

export function generateRequestConfig(url, method, data) {
  return {
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  };
}

// 用于发送携带token的请求
export function requestWithToken(url, method, data) {
  return instanceWithToken({
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  });
}

// 用于发送普通请求
export function requestWithoutToken(url, method, data) {
  return instanceWithToken({
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  });
}
