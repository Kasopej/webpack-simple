import CreateEditNote from "./CreateEditNote";
import { mapMutations } from "vuex";

const summaryLength = 20;
export default {
  name: "NoteSummary",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  components: { CreateEditNote },
  data() {
    return {
      mode: "edit",
      showEditButton: false,
      showNoteModal: false
    };
  },
  methods: {
    ...mapMutations(["commitEditTitle"]),
    toggleSelect(e) {
      e.target.checked
        ? this.$emit("selectNote", this.note)
        : this.$emit("unSelectNote", this.note);
    },
    changeNoteTitle(evt) {
      console.log("changing title");
      this.commitEditTitle({ note: this.note, title: evt.currentTarget.value });
    },
    launchEditNote() {
      this.showNoteModal = true;
    },
    closeModal() {
      this.showNoteModal = false;
      this.showEditButton = false;
    }
  },
  filters: {
    summarize(value) {
      if (value) {
        const summarizedInArray = value.split("");
        summarizedInArray.length = summaryLength;
        let summaryText = summarizedInArray.join("");
        return summaryText === value ? value : summaryText + "...";
      }
    }
  },
  template: "#note-summary-template",
  render() {
    const mouseMoveEditListeners = {
      on: {
        mouseenter: () => {
          this.showEditButton = true;
        },
        mouseleave: () => {
          this.showEditButton = false;
        }
      }
    };
    return (
      <div
        {...mouseMoveEditListeners}
        class="border border-secondary note-summary p-2 mt-2 card"
      >
        <div class="d-flex justify-content-end">
          <input
            type="checkbox"
            name="delete-note-check"
            id="delete-note-check"
            onClick={this.toggleSelect}
          ></input>
        </div>
        <div class="card-body">
          <input
            type="text"
            class="card-title d-block w-100"
            value={this.note.title}
            onChange={this.changeNoteTitle}
          />
          <p class="card-text">
            {this.$options.filters.summarize(this.note.text)}
          </p>
          {this.showEditButton ? (
            <button onClick={this.launchEditNote} class="btn btn-warning">
              edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div class="card-footer bg-transparent py-1">
          <span class="d-block">{this.note.labels.join(", ")}</span>
        </div>
        {this.showNoteModal ? (
          <create-edit-note
            mode={this.mode}
            note={this.note}
            onCloseModal={this.closeModal}
          ></create-edit-note>
        ) : (
          ""
        )}
      </div>
    );
  }
};
