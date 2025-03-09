import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form-actions"
export default class extends Controller {
  static targets = ['actions']
  
  connect() {
  }

  cancel(){
    this.actionsTarget.classList.add('hidden')
  }

  showActionButtons() {
    this.actionsTarget.classList.remove('hidden')
  }
}
