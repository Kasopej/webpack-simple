import Vue from "vue";
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(vuex);
const state = {
  notes: []
};
const getters = {};
const actions = {};
const mutations = {};

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
});
