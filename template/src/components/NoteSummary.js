import CreateEditNote from "./CreateEditNote";

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
    toggleSelect(e) {
      e.target.checked
        ? this.$emit("selectNote", this.note)
        : this.$emit("unSelectNote", this.note);
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
