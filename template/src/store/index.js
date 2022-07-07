import Vue from "vue";
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(vuex);
const state = {
  notes: [],
  labels: [],
  selectedLabels: [],
  notesQuery: "",
  nextId: 1
};
const getters = {
  notes(state) {
    return state.notes.filter(note => {
      if (state.selectedLabels.length) {
        return (
          (note.title.toLowerCase().includes(state.notesQuery.toLowerCase()) ||
            note.text.toLowerCase().includes(state.notesQuery.toLowerCase())) &&
          state.selectedLabels.some(selectedLabel =>
            note.labels.includes(selectedLabel)
          )
        );
      } else
        return (
          note.title.toLowerCase().includes(state.notesQuery.toLowerCase()) ||
          note.text.toLowerCase().includes(state.notesQuery.toLowerCase())
        );
    });
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
  commitEditTitle(state, payload) {
    state.notes[getNotePosition(state, payload.note)].title = payload.title;
  },
  deleteNote(state, note) {
    state.notes.splice(getNotePosition(state, note), 1);
  },
  addLabel(state, newLabel) {
    if (newLabel && !state.labels.includes(newLabel)) {
      state.labels.splice(state.labels.length, 0, newLabel);
    }
  },
  commitRemoveLabel(){
    
  },
  updateStateQuery(state, query) {
    state.notesQuery = query;
  },
  commitSelectedLabels(state, selectedLabels) {
    state.selectedLabels = selectedLabels;
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
