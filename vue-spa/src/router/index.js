import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';
import ChatView from '@/views/ChatView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: LoginView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
