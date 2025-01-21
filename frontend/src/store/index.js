import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    services: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
        state.user = null;
    },
    setServices(state, services) {
      state.services = services;
    },
  },
  actions: {
    fetchServices({ commit }) {
      const services = [
        { id: 1, name: 'Vaccinare' },
        { id: 2, name: 'Consultație' },
        { id: 3, name: 'Sterilizare' },
      ];
      commit('setServices', services);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
        return state.user;
    },
    getServices(state) {
      return state.services;
    },
  },
});

export default store;
