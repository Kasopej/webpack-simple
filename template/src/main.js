import Vue from 'vue'
//import App from './App.vue'
import NoteSummary from './components/NoteSummary'
import store from "./store";
import { mapActions } from "vuex";

export const eventBus = new Vue({});
new Vue({
  store,
  data: {
    notes: [
      {
        title: "A new note",
        summary: "Summary of the new note"
      },
      {
        title: "A new note",
        summary: "Summary of the new note"
      },
      {
        title: "A new note",
        summary: "Summary of the new note"
      }
    ],
    labels: [],
    selectedNotes: []
  },
  components: {
    "note-summary": NoteSummary
  },
  methods: {
    ...mapActions(["addNote"]),
    selectNote(note) {
      !this.selectedNotes.includes(note)
        ? this.selectedNotes.push(note)
        : alert(`${note.title} has already been selected`);
    },
    unSelectNote(note) {
      let noteIndex = this.selectedNotes.indexOf(note);
      if (noteIndex !== -1) {
        this.selectedNotes.splice(noteIndex, 1);
      }
    },
    addNote() {}
  },
  //template: `<h1>{{msg}}</h1>`,
  el: "#app",
  render() {
    const listeners = {
      on: {
        selectNote: this.selectNote,
        unSelectNote: this.unSelectNote
      }
    };
    return (
      <main class="container-fluid px-4">
        <input type="text" class="form-control" placeholder="search notes" />
        <section class="notes-section">
          <h3 class="text-center">Your notes</h3>
          <button on-click={this.addNote} class="ml-2 btn btn-success rounded">
            +
          </button>
          <div class="d-flex">
            {this.notes.map(note => (
              <note-summary note={note} {...listeners}></note-summary>
            ))}
          </div>
          <div class="d-flex"></div>
          <span>Labels: </span>
          <ul class="d-flex">
            {this.labels.map(label => (
              <li>{label}</li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
  //render: h => h(App)
});
