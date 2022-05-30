import { mapActions } from "vuex";

export default {
  name: "CreateEditNote",
  props: {
    note: {
      type: Object,
      default: () => {
        return { title: "", text: "" };
      }
    },
    mode: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["addNote", "editNote"]),
    preventPropagation(event) {
      event.stopPropagation();
    },
    closeModal(event) {
      if ((this.note.title || this.note.text) && this.mode === "create") {
        this.addNote({ title: this.note.title, text: this.note.text });
      } else if (this.mode === "edit") {
        this.editNote({ title: this.note.title, text: this.note.text });
      }
      event.stopPropagation();
      this.$emit("closeModal");
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
          class="rounded text-center modal-dialog bg-white"
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
                  <label for="title">title</label>
                  {this.$scopedSlots.title ? (
                    this.$scopedSlots.title(this.note)
                  ) : (
                    <input
                      value={this.note.title}
                      name="title"
                      id="title"
                      onInput={event => {
                        this.note.title = event.currentTarget.value;
                      }}
                    ></input>
                  )}
                </div>
                <div class="form-group"></div>
                <label for="note-text">text</label>
                <textarea
                  value={this.note.text}
                  onInput={event => {
                    this.note.text = event.currentTarget.value;
                  }}
                ></textarea>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
