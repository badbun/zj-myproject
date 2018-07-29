import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.filter('format', value => value.format('yyyy-MM-dd'));

const ElementUIConfig = {};
ElementUIConfig.install = () => {
  const Messagebox = {
    $alert: message => {
      if (!ElementUI.MessageBox.$messageboxPromise) {
        ElementUI.MessageBox.$messageboxPromise = ElementUI.MessageBox({
          title: '提示',
          message,
          $type: 'alert',
          confirmButtonText: '确定',
        });
        ElementUI.MessageBox.$messageboxPromise.then(() => {
          delete ElementUI.MessageBox.$messageboxPromise;
        });
        return ElementUI.MessageBox.$messageboxPromise;
      }
      return Promise.reject().catch(() => {});
    },
    $error: message => {
      if (!ElementUI.MessageBox.$messageboxPromise) {
        ElementUI.MessageBox.$messageboxPromise = ElementUI.MessageBox({
          title: '出错啦',
          message,
          $type: 'alert',
          confirmButtonText: '确定',
        });
        ElementUI.MessageBox.$messageboxPromise.then(() => {
          delete ElementUI.MessageBox.$messageboxPromise;
          if (window.location.href.indexOf('/login') != -1) {
            window.close();
          }
        });
        return ElementUI.MessageBox.$messageboxPromise;
      }
      return Promise.reject().catch(() => {});
    },
    $confirm: (message, title = '确认', buttonConfig = {}) => {
      if (!ElementUI.MessageBox.$messageboxPromise) {
        ElementUI.MessageBox.$messageboxPromise = ElementUI.MessageBox({
          title,
          message,
          $type: 'confirm',
          showCancelButton: true,
          confirmButtonText: buttonConfig.confirmButtonText || '确认',
          cancelButtonText: buttonConfig.cancelButtonText || '取消',
        });
        ElementUI.MessageBox.$messageboxPromise.then(() => {
          delete ElementUI.MessageBox.$messageboxPromise;
        }, () => {
          delete ElementUI.MessageBox.$messageboxPromise;
        });
        return ElementUI.MessageBox.$messageboxPromise;
      }
      return Promise.reject().catch(() => {});
    },
  };


  Object.entries(Messagebox).forEach(([method, fn]) => {
    Vue.prototype[method] = fn;
    ElementUI.MessageBox[method] = fn;
  });
};

Vue.use(ElementUI);
Vue.use(ElementUIConfig);
