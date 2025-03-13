import { Controller } from "@hotwired/stimulus"
import {post} from "@rails/request.js"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal", 'nameInput', 'form'];

  open() {
    this.modalTarget.classList.remove("hidden");
  }

  closeAfterSubmit(event){
    if(this.nameInputTarget.value != ''){
      setTimeout(() => {
        this.modalTarget.classList.add("hidden");
        this.nameInputTarget.value = ''
      }, 10000)
    }
  }

  submit(e){
    e.preventDefault()
    const form = this.formTarget
    
    if(this.nameInputTarget.value != '') {
      post(form.action, {
        method: form.method,
        body: JSON.stringify({name: this.nameInputTarget.value }),
        headers: {
          "Accept": "text/vnd.turbo-stream.html"
        }
      }).then(resp => {
        if(!resp.response.ok){
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.text
      }).then(html => {
        form.reset();
        this.modalTarget.classList.add("hidden")
      })
      .catch(error => console.error("Form submission error:", error));
    }
  }

  close(event) {
    if (event.target === this.modalTarget || event.target.hasAttribute("data-action-close")) {
      this.modalTarget.classList.add("hidden");
    }
  }
}
