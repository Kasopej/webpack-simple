import { mapActions, mapMutations, mapState } from "vuex";
import SelectNoteLabels from "./SelectNoteLabels";

export default {
  name: "CreateEditNote",
  components: {
    SelectNoteLabels
  },
  model: {
    prop: "note",
    event: "change"
  },
  props: {
    note: {
      type: Object,
      default: () => {
        return { title: "", text: "", labels: [] };
      }
    },
    mode: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      localNote: JSON.parse(JSON.stringify(this.note))
    };
  },
  computed: {
    ...mapState(["labels"])
  },
  methods: {
    ...mapActions(["addNote", "editNote"]),
    ...mapMutations(["commitRemoveLabel"]),
    preventPropagation(event) {
      event.stopPropagation();
    },
    closeModal(event) {
      if (
        (this.localNote.title || this.localNote.text) &&
        this.mode === "create"
      ) {
        this.addNote(this.localNote);
      } else if (this.mode === "edit") {
        this.editNote(this.localNote);
      }
      event.stopPropagation();
      this.$emit("closeModal");
    },
    removeLabel(label) {
      this.localNote.labels.splice(this.localNote.labels.indexOf(label), 1);
    },
    onSubmit(event) {
      event.preventDefault();
    }
  },
  render() {
    return (
      <div
        class="modal bg-see-through"
        style="display:block;"
        onClick={this.closeModal}
      >
        <div
          onClick={this.preventPropagation}
          class="rounded modal-dialog bg-white note-modal"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{this.mode} note</h5>
              <button
                class="btn btn-danger"
                onClick={this.closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="title" class="col-sm-2 col-form-label">
                    title
                  </label>
                  {this.$scopedSlots.title ? (
                    this.$scopedSlots.title(this.localNote)
                  ) : (
                    <div class="col-sm-12">
                      <input
                        value={this.localNote.title}
                        name="title"
                        class="form-control"
                        id="title"
                        onInput={event => {
                          this.localNote.title = event.currentTarget.value;
                        }}
                      ></input>
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <label for="note-text" class="col-sm-2 col-form-label">
                    text
                  </label>
                  <div class="col-sm-12">
                    <textarea
                      class="form-control"
                      id="note-text"
                      value={this.localNote.text}
                      onInput={event => {
                        this.localNote.text = event.currentTarget.value;
                      }}
                    ></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 col-form-label">labels</label>
                  <div class="col-sm-12">
                    <div class="form-control">
                      {this.localNote.labels.map(label => (
                        <span
                          class="badge badge-warning mx-1 note-label"
                          onClick={() => this.removeLabel(label)}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-12">
                    <SelectNoteLabels
                      class="col-12"
                      options={this.labels}
                      onInput={event => (this.localNote.labels = event)}
                    ></SelectNoteLabels>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
