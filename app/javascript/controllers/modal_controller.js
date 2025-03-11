import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal"];

  open() {
    this.modalTarget.classList.remove("hidden");
  }

  close(event) {
    if (event.target === this.modalTarget || event.target.hasAttribute("data-action-close")) {
      this.modalTarget.classList.add("hidden");
    }
  }
}
