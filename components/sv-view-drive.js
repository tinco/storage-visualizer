const {GluonElement, html} = require('gluonjs/gluon.umd')
const Drives = require('../lib/drives.js')

class SvViewDrive extends GluonElement {
  get template() {
    return html`<h1>View Drive ${this.getAttribute('device')}</h1>`
  }

  connectedCallback() {
    super.connectedCallback();
  }

  onLoad() {
    this.render()
  }
}

customElements.define(SvViewDrive.is, SvViewDrive)
