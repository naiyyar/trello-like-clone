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
    // ev.item.classList.remove('rotate-10')
  }

  onStart(ev){
    this.handleCursor('grab')
    // ev.item.classList.add('rotate-10')
  }

  updateSorting(ev){
    const sortableUrl = ev.item.dataset.sortableUrl
    put(sortableUrl, {
      body: JSON.stringify({row_order_position: ev.newIndex})
    })
  }

  handleCursor(type){
    this.element.style.cursor = type
  }
}
