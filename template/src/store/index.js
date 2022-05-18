import Vue from "vue";
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(vuex);
const state = {
  notes: []
};
const getters = {
  latestNote(state) {
    return state.notes[state.notes.length - 1];
  }
};
const actions = {
  addNote({ commit, state }, note) {
    const noteId = state.notes.length + 1;
    note.id = noteId;
    commit("commitAddNote", note);
  }
};
const mutations = {
  commitAddNote(state, note) {
    state.notes.splice(state.notes.length, 0, note);
  }
};

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
});
