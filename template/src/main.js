import Vue from 'vue'
//import App from './App.vue'
import NoteSummary from './components/NoteSummary'

new Vue({
  data: {
    msg: "Hello Worl!",
    notes: [
      {
        title: "A new note",
        summary: "Summary of the new note"
      }
    ]
  },
  components: {
    "note-summary": NoteSummary
  },
  //template: `<h1>{{msg}}</h1>`,
  el: '#app',
  render(){
    return (
      <main class="container-fluid text-center px-4">
        <input type="text" class="form-control" placeholder="search notes"/>
        <section class="notes-section">
          <h3>Your notes</h3>
          {this.notes.map(note => (<note-summary note={note}></note-summary>))}
          <div class="d-flex"></div>
          <span>Labels: </span>
          <ul class="d-flex"></ul>
        </section>
      </main>
    )
  }
  //render: h => h(App)
})
