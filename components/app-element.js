const G = require('gluonjs/gluon.umd')
require('./components/sv-drivelist.js') // WHY ./components??

class AppElement extends G.GluonElement {
  get template() {
    return G.html`
      <h1>Hello from Gluon</h1>
      <sv-drivelist></sv-drivelist>
    `
  }
}

customElements.define(AppElement.is, AppElement)
