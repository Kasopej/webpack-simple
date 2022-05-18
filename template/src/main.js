import Vue from 'vue'
//import App from './App.vue'
import NoteSummary from './components/NoteSummary'
import CreateEditNote from "./components/CreateEditNote";
import store from "./store";
import { mapActions, mapGetters } from "vuex";

export const eventBus = new Vue({});
new Vue({
  store,
  data: {
    showNoteModal: false,
    mode: "Create",
    notes: [
      {
        title: "A new note",
        summary: "Summary of the new note"
      },
    ],
    labels: [],
    selectedNotes: []
  },
  components: {
    "note-summary": NoteSummary,
    "create-edit-note": CreateEditNote
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
    launchAddNote() {
      this.addNote({ title: "", text: "" });
      this.showNoteModal = true;
    },
    closeModal(){
      this.showNoteModal = false;
    }
  },
  computed: {
    ...mapGetters(["latestNote"])
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
        {this.showNoteModal ? (
          <create-edit-note note={this.latestNote} onCloseModal={this.closeModal} mode={this.mode}
          {...{scopedSlots : {
            title: ({title}) => <input class="form-group" type="input" value={title} name="title" id="title"></input>
          }}}
          >
            <em
            slot="heading"
            >A heading</em>
          </create-edit-note>
        ) : (
          ""
        )}
        <input type="text" class="form-control" placeholder="search notes" />
        <section class="notes-section">
          <h3 class="text-center">Your notes</h3>
          <button
            onClick={this.launchAddNote}
            class="ml-2 btn btn-success rounded"
          >
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

/* Lessons Learnt 
Different rendering approaches available in vue (template, el, or a render function)
How to use JSX and bind dynamic data to the JSX by using Vnode data API
Had a chalenge with pasing named & scopedSlots in render functions as the documentation was a bit confusing. Worked this through after about 35-40 mins
*/
