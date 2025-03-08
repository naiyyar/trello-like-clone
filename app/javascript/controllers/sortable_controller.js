import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'

// Connects to data-controller="sortable"
export default class extends Controller {
  static values = { group: String } 
  
  connect() {
    new Sortable(this.element, {
      group: this.groupValue,
      onEnd: this.onEnd.bind(this),
      onStart: this.onStart.bind(this)
    })
  }

  onEnd(ev){
    console.log(ev)
  }

  onStart(){
    this.element.style.cursor = 'grab'
  }
}
