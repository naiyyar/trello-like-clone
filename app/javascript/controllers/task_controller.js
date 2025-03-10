import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="task"
export default class extends Controller {
  //static targets = ['textarea']

  connect() {
  }

  displayEditForm(e){
    e.preventDefault()
    console.log(this.element)
  }

  setFocus(){
    window.data = this //.textAreaTarget
    //this.textareaTarget.focus() 
  }
}
