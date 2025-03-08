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
    this.updateSorting(ev)
  }

  onStart(){
    this.handleCursor('grab')
  }

  updateSorting(ev){
    // put request
  }

  handleCursor(type){
    this.element.style.cursor = type
  }
}
