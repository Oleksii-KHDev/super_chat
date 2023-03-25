import BootstrapVue from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/js/bootstrap';

const app = createApp(App);
app.use(BootstrapVue);
app.use(store);
app.use(router);
app.mount('#app');
