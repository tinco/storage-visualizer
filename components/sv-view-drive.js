const {GluonElement, html} = require('gluonjs/gluon.umd')
const Drives = require('../lib/drives.js')

class SvViewDrive extends GluonElement {
  get template() {
    const device = this.getAttribute('device');
    const drive = Drives.getDrive(device);
    if (drive) {
      return html`
        <h1>View Drive ${device}</h1>
      `
    } else {
      return html`
        <h1>View Drive</h1>
      `
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  onLoad() {
    this.render()
  }
}

customElements.define(SvViewDrive.is, SvViewDrive)
