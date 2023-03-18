// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created: function () {
    this.checkLogin();
  },
  router,
  components: { App },
  template: '<App/>',
  methods: {
    checkLogin() {
      if (!localStorage.getItem('login')) {
        this.$router.push('/login');
      } else {
        this.$router.push('/chat');
      }
    },
  },
});
