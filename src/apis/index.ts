import axios from "axios";

// axios.defaults.baseURL = ''  //正式
axios.defaults.baseURL = 'http://localhost:3000' //测试

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
//允许跨域携带cookie信息
axios.defaults.withCredentials = true;
//设置超时
axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error: any) => {
    console.log('请求异常', error);
  }
);
export default {
  /**
   * @param {String} url 
   * @param {Object} data 
   * @returns Promise
   */
  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: data,
      })
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err: any) => {
          reject(err)
        });
    })
  },

  get(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data,
      })
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
};
