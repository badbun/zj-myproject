import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const main = resolve => (require(['./test.vue'], resolve));

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
