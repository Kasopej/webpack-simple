export default {
  name: "CreateEditNote",
  props: {
    note: {
      type: Object
    },
    mode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    preventPropagation(event) {
      event.stopPropagation();
    },
    closeModal(event) {
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
                  {this.$scopedSlots.title({ title: this.note.title }) ? (
                    this.$scopedSlots.title({ title: this.note.title })
                  ) : (
                    <input
                      value={this.note.title}
                      name="title"
                      id="title"
                    ></input>
                  )}
                </div>
              </form>
              <h1>{this.$slots.heading}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
