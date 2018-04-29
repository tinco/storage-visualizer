const { GluonElement, html } = require('gluonjs/gluon.umd')
require('./components/sv-drivelist.js') // WHY ./components??

class AppElement extends GluonElement {
  get template() {
    return html`
      <style>
        #views > * {
          display: none;
        }

        #views > .active {
          display: block;
        }
      </style>
      <div id="views">
        <sv-drivelist id="listDrives" class="active"></sv-drivelist>
        <div id="viewDrive"><h1>OMG viewDrive view</h1></div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('navigate', (e) => {
      this.handleNavigation(e.detail, e);
    });
  }

  handleNavigation(detail) {
    const action = detail.action;
    const params = detail.params;

    Array.from(this.$.views.children).forEach( e => e.classList.remove('active'));

    const target = this.$[action];
    Object.entries(params).forEach( (p) => target.setAttribute(p[0], p[1]) );
    target.classList.add("active");
  }
}

customElements.define(AppElement.is, AppElement)
