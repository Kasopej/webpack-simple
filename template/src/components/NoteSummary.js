export default {
  name: "NoteSummart",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  template: "#note-summary-template"
};
