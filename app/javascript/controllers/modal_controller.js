import { Controller } from "@hotwired/stimulus"
import { post, put } from "@rails/request.js"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal", 'nameInput', 'form', 'invitationModal'];

  open(e) {
    if(e.target.dataset.buttonType == 'invitation'){
      this.modalTarget.classList.add("hidden");
      this.invitationModalTarget.classList.remove("hidden");
    }else{
      this.invitationModalTarget.classList.add("hidden");
      this.modalTarget.classList.remove("hidden");
    }
  }

  submit(e){
    e.preventDefault()
    const form = this.formTarget
    
    if(this.nameInputTarget.value != '' && e.target.type == 'submit') {
      if(form.dataset.method == 'put'){
        this.sendPut(form)
      } else {
        this.sendPost(form)
      }
    }
  }

  sendPut(form){
    put(form.action, this.requestOptions(form)).then(resp => {
      if(!resp.response.ok){
        throw new Error(`HTTP error! Status: ${resp.statusCode}`);
      }
      return resp.text
    }).then(html => {
      form.reset();
      this.hideForm()
    })
    .catch(error => console.error("Form submission error:", error));
  }

  sendPost(form){
    post(form.action, this.requestOptions(form)).then(resp => {
      if(!resp.response.ok){
        throw new Error(`HTTP error! Status: ${resp.statusCode}`);
      }
      return resp.text
    }).then(html => {
      form.reset();
      this.hideForm()
    })
    .catch(error => console.error("Form submission error:", error));
  }

  requestOptions(form){
    return {
      method: form.method,
      body: JSON.stringify({name: this.nameInputTarget.value }),
      headers: {
        "Accept": "text/vnd.turbo-stream.html"
      }
    }
  }

  hideForm(){
    this.modalTarget.classList.add("hidden")
    this.invitationModalTarget.classList.add("hidden");
  }

  close(event) {
    if (event.target === this.modalTarget || event.target.hasAttribute("data-action-close")) {
      this.modalTarget.classList.add("hidden");
      this.invitationModalTarget.classList.add("hidden");
    }
  }
}
