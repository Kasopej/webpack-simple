import Vue from 'vue'
//import App from './App.vue'
import NoteSummary from './components/NoteSummary'
import CreateEditNote from "./components/CreateEditNote";
import store from "./store";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export const eventBus = new Vue({});
new Vue({
  store,
  data: {
    showNoteModal: false,
    mode: "create",
    selectedNotes: [],
    selectedLabels: [],
    showCreateLabel: false,
    newLabel: ""
  },
  components: {
    "note-summary": NoteSummary,
    "create-edit-note": CreateEditNote
  },
  methods: {
    ...mapActions(["addNote", "deleteNotes", "updateQuery"]),
    ...mapMutations(["updateStateQuery", "addLabel", "commitSelectedLabels"]),
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
        this.deleteNotes(this.selectedNotes).finally(() => {
          this.selectedNotes = [];
        });
      }
    },
    updateQuery(query) {
      this.updateStateQuery(query);
    },
    toggleLabel(event) {
      let label = event.currentTarget.textContent;
      if (!this.selectedLabels.includes(label)) {
        this.selectedLabels.push(label);
        event.currentTarget.classList.add("selected-label");
        return;
      }
      let labelIndex = this.selectedLabels.indexOf(label);
      if (labelIndex !== -1) {
        this.selectedLabels.splice(labelIndex, 1);
        event.currentTarget.classList.remove("selected-label");
      }
    }
  },
  computed: {
    ...mapGetters(["latestNote", "notes"]),
    ...mapState(["notesQuery", "labels"])
  },
  watch: {
    selectedLabels() {
      this.commitSelectedLabels(this.selectedLabels);
    }
  },
  el: "#app",
  render() {
    const listeners = {
      on: {
        selectNote: this.selectNote,
        unSelectNote: this.unSelectNote
      }
    };
    return (
      <main class="container-fluid p-4">
        {this.showNoteModal ? (
          <create-edit-note
            onCloseModal={this.closeModal}
            mode={this.mode}
            labels={this.labels}
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
        <input
          type="text"
          class="form-control"
          placeholder="search notes"
          value={this.notesQuery}
          onInput={event => this.updateQuery(event.currentTarget.value)}
        />
        <section class="notes-section">
          <h3 class="text-center">Your notes</h3>
          <div style="float:left">
            <button
              onClick={this.launchAddNote}
              class="btn btn-success rounded"
            >
              +
            </button>
          </div>

          <div style="float:right" class="d-flex justify-content-end">
            <div>
              <button
                class="delete btn btn-danger btn-md"
                onClick={this.actOnMultipleNotes}
                disabled={!this.selectedNotes.length}
              >
                delete selected
              </button>
            </div>
          </div>
          <div style="width:100%;" class="clear"></div>
          <div class="card-deck my-3">
            {this.notes.map(note => (
              <note-summary
                note={note}
                {...listeners}
                key={note.title}
              ></note-summary>
            ))}
          </div>
          <span>Labels: </span>
          <ul class="d-inline-flex labels px-0 py-2 mr-2">
            {this.labels.map(label => (
              <li class="badge bg-warning p-2 mx-1" onClick={this.toggleLabel}>
                {label}
              </li>
            ))}
          </ul>
          <span
            class="py-2 px-2 bg-secondary mt-2 d-inline-block text-light add-label-trigger"
            onClick={() => (this.showCreateLabel = !this.showCreateLabel)}
          >
            +
          </span>
          <br></br>
          {this.showCreateLabel ? (
            <div>
              <input
                class="mr-2 p-1 border border-dark"
                id="label-input"
                type="text"
                value={this.newLabel}
                onInput={event => (this.newLabel = event.currentTarget.value)}
              ></input>
              <button
                class="btn btn-warning p-1"
                onClick={() => {
                  this.addLabel(this.newLabel);
                }}
                disabled={!this.newLabel}
              >
                add label
              </button>
            </div>
          ) : (
            ""
          )}
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
