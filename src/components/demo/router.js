import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const main = resolve => (require(['./test.vue'], resolve));


/**
 * 说明：
 * 1.path需要在前面配置/:showType，用于区分单页显示（showType=page-only）
 * or带框架显示(showType=frame)or tab显示（showType=tabs）
 * 2. 必须有meta，且至少包含name和label，name为空字符串则不埋点, 子路由的label为面包屑导航显示的名称，必填
 *
 */
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: main,
    },
  ],
});

export default router;
