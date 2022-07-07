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
  template: "#note-summary-template"
};
