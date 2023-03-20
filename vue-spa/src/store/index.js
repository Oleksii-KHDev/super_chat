import { createStore } from 'vuex';
import { name } from '../../package.json';

export default createStore({
  state: {
    appName: name,
    chatMessages: [],
    user: {},
  },
  getters: {
    appName(state) {
      return state.appName;
    },
    messages(state) {
      return state.chatMessages;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
