const { GluonElement, html } = require('gluonjs/gluon.umd')
require('./components/sv-drivelist.js') // WHY ./components??
require('./components/sv-view-drive.js') // WHY ./components??


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
      <button on-click=${ (e) => this.navigate("listDrives") }>Back</button>
      <div id="views">
        <sv-drivelist id="listDrives" class="active"></sv-drivelist>
        <sv-view-drive id="viewDrive"><sv-view-drive>
      </div>
    `
  }

  navigate(target, params) {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        composed: true,
        bubbles: true,
        detail: {
          action: target,
          params: params
        }
      }
    ));
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
    Object.entries(params || {}).forEach( (p) => target.setAttribute(p[0], p[1]) );
    target.classList.add("active");
    target.onLoad()
  }
}

customElements.define(AppElement.is, AppElement)
