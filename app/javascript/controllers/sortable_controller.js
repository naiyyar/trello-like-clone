import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'

// Connects to data-controller="sortable"
export default class extends Controller {
  connect() {
    console.log(this.element)
    new Sortable(this.element, {

    })
  }
}
