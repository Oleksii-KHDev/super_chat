import { createStore } from 'vuex';
import { name } from '../../package.json';

export default createStore({
  state: {
    appName: name,
    chatMessages: [],
    user: {},
    serverUrl: `${process.env.VUE_APP_SERVER_URL}:${process.env.VUE_APP_SERVER_PORT}`,
    emptyTagsList: new Set([
      'area',
      'base',
      'br',
      'col',
      'command',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ]),
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
    emptyTagsList(state) {
      return state.emptyTagsList;
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
