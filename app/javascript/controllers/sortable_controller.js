import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { put } from '@rails/request.js'

// Connects to data-controller="sortable"
export default class extends Controller {
  static values = { group: String, url: String }
  
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
    // target = ev.item
    console.log(this)
    // put(this.urlValue, JSON.strigify({row_order_positions: event.index}))
  }

  handleCursor(type){
    this.element.style.cursor = type
  }
}
