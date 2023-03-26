import { createStore } from 'vuex';
import { name } from '../../package.json';

export default createStore({
  state: {
    appName: name,
    chatMessages: [],
    user: {},
    serverUrl: `${process.env.VUE_APP_SERVER_URL}:${process.env.VUE_APP_SERVER_PORT}`,
  },
  getters: {
    appName(state) {
      return state.appName;
    },
    messages(state) {
      return state.chatMessages;
    },
    currentUser(state) {
      return state.user;
    },
    serverUrl(state) {
      return state.serverUrl;
    },
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
