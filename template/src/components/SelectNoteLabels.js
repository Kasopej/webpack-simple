export default {
  name: "SelectNoteLabels",
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedValues: []
    };
  },
  methods: {
    updateSelectValue(event) {
      this.selectedValues = Array.from(event.currentTarget.selectedOptions).map(
        option => option.value
      );
      this.$emit("input", JSON.parse(JSON.stringify(this.selectedValues)));
    }
  },
  watch: {},
  computed: {
    optionsState() {
      return this.options.map(option => {
        return this.selectedValues.includes(option)
          ? { selected: true }
          : { selected: false };
      });
    }
  },
  render() {
    const selectElemListeners = {
      on: {
        change: this.updateSelectValue
      }
    };
    return (
      <select ref="selectElem" multiple {...selectElemListeners}>
        <option value={null} disabled>
          Add labels
        </option>
        {this.options.map((option, index) => (
          <option
            value={option}
            selected={
              JSON.stringify(this.optionsState[index].selected) === "true"
            }
          >
            {option}
          </option>
        ))}
      </select>
    );
  }
};
