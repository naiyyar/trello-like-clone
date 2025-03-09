import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="task"
export default class extends Controller {
  connect() {
  }

  displayEditForm(e){
    e.preventDefault()
    console.log(this.element)
  }
}
