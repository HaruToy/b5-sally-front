import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '',
  },
  getters: {
    getName(state) {
      return state.name;
    },
  },
  mutations: {
    setName(state, value) {
      state.name = value;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
