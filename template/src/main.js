import Vue from 'vue'
//import App from './App.vue'
import NoteSummary from './components/NoteSummary'
import CreateEditNote from "./components/CreateEditNote";
import store from "./store";
import { mapActions, mapGetters, mapState } from "vuex";

export const eventBus = new Vue({});
new Vue({
  store,
  data: {
    showNoteModal: false,
    mode: "create",
    labels: [],
    selectedNotes: []
  },
  components: {
    "note-summary": NoteSummary,
    "create-edit-note": CreateEditNote
  },
  methods: {
    ...mapActions(["addNote", "deleteNotes"]),
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
      this.showNoteModal = true;
    },
    closeModal() {
      this.showNoteModal = false;
    },
    actOnMultipleNotes(event) {
      if (event.target.classList.contains("delete")) {
        this.deleteNotes(this.selectedNotes).then(
          () => (this.selectedNotes = [])
        );
      }
    }
  },
  computed: {
    ...mapGetters(["latestNote"]),
    ...mapState(["notes"])
  },
  watch: {
    notes() {
      console.log(this.notes);
    }
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
          <create-edit-note
            onCloseModal={this.closeModal}
            mode={this.mode}
            {...{
              scopedSlots: {
                title: titleSlot => (
                  <input
                    class="form-group"
                    type="input"
                    value={titleSlot.title}
                    name="title"
                    id="title"
                    onInput={event => {
                      titleSlot.title = event.currentTarget.value;
                    }}
                  ></input>
                )
              }
            }}
          ></create-edit-note>
        ) : (
          ""
        )}
        <input type="text" class="form-control" placeholder="search notes" />
        <section class="notes-section">
          <h3 class="text-center">Your notes</h3>
          <div style="float:left" class="d-flex justify-content-start">
            <button
              onClick={this.launchAddNote}
              class="ml-2 btn btn-success rounded"
            >
              +
            </button>
          </div>

          <div style="float:right" class="d-flex justify-content-end">
            <div>
              <i class="fa-thin fa-trash"></i>
              <button
                class="delete btn btn-danger btn-md"
                onClick={this.actOnMultipleNotes}
                disabled={!this.selectedNotes.length}
              >
                delete selected
              </button>
            </div>
          </div>

          <div class="d-flex flex-wrap notes-wrapper" style="clear:both">
            {this.notes.map(note => (
              <note-summary
                note={note}
                {...listeners}
                key={note.title}
              ></note-summary>
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
