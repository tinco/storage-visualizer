const {GluonElement, html} = require('gluonjs/gluon.umd')
const Drives = require('../lib/drives.js')

class SvDrive extends GluonElement {
  get template() {
    const device = this.getAttribute('device');

    if (device) {
      const drive = Drives.getDrive(device);
      return html`
        <div>
          <h3>Drive: ${drive.device} mounted on ${drive.mountpoint.path}</h3>
          <dl>
            <dt>Disk space total:</dt>
            <dd>${ drive.formattedSize }</dd>

            <dt>Disk space available:</dt>
            <dd>${ drive.formattedFree }</dd>

            <dt>Disk space used:</dt>
            <dd>${ drive.formattedUsed }</dd>
          </dl>
        </div>
      `
    } else {
      return html`<div>Loading..</div>`
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const device = this.getAttribute('device');
    Drives.getDriveUsage(device).then(this.render.bind(this));
  }
}

customElements.define(SvDrive.is, SvDrive)
