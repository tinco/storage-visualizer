const { GluonElement, html } = require('gluonjs/gluon.umd')
const Drives = require('../lib/drives.js')
require('./sv-drive.js')

class SvDrivelist extends GluonElement {
  constructor() {
    super()
    this.drives = []
  }

  get template() {
    if (this.drives.length) {
      return html`
        ${
          this.drives.map( (drive) => html`<sv-drive device$=${drive.device}></sv-drive>`)
        }
      `;
    } else {
      return html`"Loading"`
    }
  }

  onLoad() {
    this.render()
  }

  connectedCallback() {
    super.connectedCallback()
    Drives.list().then(this.updateDrives.bind(this))
  }

  updateDrives(drives) {
    this.drives = drives
    this.render()
  }
}

customElements.define(SvDrivelist.is, SvDrivelist)
