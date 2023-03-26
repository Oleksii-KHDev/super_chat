import { createApp } from 'vue';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox-plus-jquery';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import store from './store';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(store);
app.use(router);
app.mount('#app');
