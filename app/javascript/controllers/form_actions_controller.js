import { Controller } from "@hotwired/stimulus"
import { get } from "@rails/request.js"

// Connects to data-controller="form-actions"
export default class extends Controller {
  static targets = ['actions']
  
  connect() {
  }

  cancel(){
    this.actionsTarget.classList.add('hidden')
  }

  // close(e){
  //   e.preventDefault()
  //   window.data = e
  //   const url = e.currentTarget.getAttribute('data-url')
  //   console.log(url)
  //   get(url, {
  //     headers: {
  //       "Accept": "text/vnd.turbo_stream.html"
  //     }
  //   })
  //   .then(resp => resp.text())
  //   .then(html => Turbo.renderStreamMessage(html));
  // }

  showActionButtons() {
    this.actionsTarget.classList.remove('hidden')
  }
}
