import Vue from 'vue';
import Axios from 'axios';
import { Promise } from 'es6-promise';

Axios.defaults.withCredentials = true;
Axios.defaults.headers = {
  'Content-Type': 'application/json',
  'activityLoginToken': '',
};
Axios.defaults.timeout = 60000; // 1分钟
Axios.defaults.responseType = 'json';

Axios.defaults.transformResponse = [data => {
  if (!data) {
    return data;
  }

  let jsonData = data;
  if (typeof data === 'string') {
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      console.error(`parse error:${data}`);
    }
  }
    // TODO interceptors支持中断后下列代码请移至interceptors中

  return jsonData;
}];

const ignoreUrls = ['/hawk/grab/servyoucommon.htm'];// 忽略异常处理的URL
const isIgnoreUrls = url => ignoreUrls.some(ignoreUrl => url.indexOf(ignoreUrl) !== -1);

const errorHandle = error => {
  const vm = this.a.scope;
  if (error.response) {
    if (isIgnoreUrls(error.response.config.url)) {
      return Promise.reject(error);
    }

    let errorMsg = '';
    if (error.response.config.errorInfo) {
      errorMsg = error.response.config.errorInfo[error.response.status];
    }
    switch (error.response.status) {
      case 404:
        errorMsg = errorMsg || '您访问的地址有误，或者该页面不存在哦～';
        vm.$error(errorMsg);
        break;
      default:
        errorMsg = errorMsg || '网络好像有问题，请稍后重试哦～';
        vm.$error(errorMsg);
    }
    error.errorMsg = errorMsg;
  } else if (error instanceof Error) {
    if (isIgnoreUrls(error.config.url)) {
      return Promise.reject(error);
    }

    let errorMsg = '请求超时了，请稍后重试哦～';
    if (error.config.errorInfo) {
      errorMsg = error.config.errorInfo.timeout;
    }

    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') === 0) {
      vm.$error(errorMsg);
      error.errorMsg = errorMsg;
    } else {
      error.errorMsg = error.message;
      console.error(error.message);
    }
  } else if (error.returnCode === '80502501') { // 接口授权失败
    const errorMsg = '获取授权失败了，请稍后重试哦～';
    error.errorMsg = errorMsg;
    vm.$error(errorMsg);
  } /* else if (vm.$root.httpErrorInfo && vm.$root.httpErrorInfo[vm.$route.path]) {
        const errorCode = error.returnCode || error.messageCode || error.data.messageCode;
        let errorMsg = vm.$root.httpErrorInfo[vm.$route.path][errorCode || 'default'];
        errorMsg = errorMsg || error.returnMessage || error.data.message || error.message;
        vm.$error(errorMsg);
        error.errorMsg = errorMsg;
  } */ else {
    const errorMsg = error.data.returnMessage || error.data.message || error.message;
    error.errorMsg = errorMsg;
    vm.$error(errorMsg);
  }

  return Promise.reject(error);
};

Axios.interceptors.response.use(
    response => {
      const jsonData = response;
      let returnCode;

      if (jsonData.data) {
        returnCode = jsonData.data.returnCode;
      }
      if (returnCode) {
        if (returnCode === '00000000') {
          return jsonData.data;
        }
        errorHandle(jsonData);
      } else if (jsonData.data) {
        if (jsonData.data.success === true) {
          return jsonData.data;
        } else if (jsonData.data.success === false) {
          errorHandle(jsonData);
        }
      }

      return response.data;
    },
    errorHandle,
);

export default Vue.prototype.$http = Axios;
