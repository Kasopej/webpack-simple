import Vue from "vue";
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(vuex);
const state = {
  notes: [],
  notesQuery: "",
  nextId: 1
};
const getters = {
  latestNote(state) {
    return state.notes[0];
  },
  notes(state) {
    return state.notes.filter(
      note =>
        note.title.includes(state.notesQuery) ||
        note.text.includes(state.notesQuery)
    );
  },
  nextId(state) {
    let nextId = null;
    state.notes.forEach(
      note => (nextId = note.id >= nextId ? note.id : nextId)
    );
    return ++nextId;
  }
};
const actions = {
  addNote({ commit }, note) {
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
    });
  }
};
const mutations = {
  commitAddNote(state, note) {
    note.id = state.nextId++;
    state.notes.splice(state.notes.length, 0, note);
  },
  commitEditNote(state, note) {
    state.notes.splice(getNotePosition(state, note), 1, note);
  },
  deleteNote(state, note) {
    state.notes.splice(getNotePosition(state, note), 1);
  },
  reorderNotes(state) {
    state.notes.forEach((note, index) => note.id === index + 1);
  },
  updateStateQuery(state, query) {
    state.notesQuery = query;
  }
};

function getNotePosition(state, note) {
  return state.notes.findIndex(stateNote => note.id === stateNote.id);
}

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
});
