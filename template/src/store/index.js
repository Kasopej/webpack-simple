import Vue from "vue";
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(vuex);
const state = {
  notes: []
};
const getters = {
  latestNote(state) {
    return state.notes[0];
  }
};
const actions = {
  addNote({ commit, state }, note) {
    const noteId = state.notes.length + 1;
    note.id = noteId;
    commit("commitAddNote", note);
  },
  editNote({ commit }, note) {
    commit("commitEditNote", note);
  },
  deleteNotes({ state, commit }, selectedNotes) {
    selectedNotes.forEach(selectedNote => {
      commit(
        "deleteNote",
        state.notes.find(note => note.id === selectedNote.id)
      );
      commit("reOrderNotes");
    });
  }
};
const mutations = {
  commitAddNote(state, note) {
    state.notes.splice(state.notes.length, 0, note);
  },
  commitEditNote(state, note) {
    state.notes.splice(note.id, 1, note);
  },
  deleteNote(state, note) {
    console.log("deleting" + note);
    note ? state.notes.splice(--note.id, 1) : "do nothing";
  },
  reOrderNotes(state) {
    state.notes.forEach((note, index) => note.id === index + 1);
  }
};

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
});
