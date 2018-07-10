import 'babel-polyfill';
import 'normalize.css';
import Vue from 'vue';
import router from './router.js';
import '../../common/common.js';
import http from '../../common/http.js';
import 'assets/style.scss';
import ElementUI from 'element-ui';


Vue.use(ElementUI);

new Vue({
    router,
    http,
    beforeCreate() {
        this.$http.scope = this;
    },
}).$mount('#app');
