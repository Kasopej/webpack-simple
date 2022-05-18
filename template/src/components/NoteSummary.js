export default {
  name: "NoteSummary",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mode: "Edit"
    };
  },
  methods: {
    toggleSelect(e) {
      e.target.checked
        ? this.$emit("selectNote", this.note)
        : this.$emit("unSelectNote", this.note);
    }
  },
  template: "#note-summary-template"
};
