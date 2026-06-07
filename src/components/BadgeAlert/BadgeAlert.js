import style from "./BadgeAlert.css" with { type: "css" };

export class BadgeAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(style);
    this.render();
  }

  show(message) {
    const msg = this.shadowRoot.querySelector("[data-message]");
    if (msg) {
      msg.textContent = message;
    }
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  render() {
    const html = /*html*/ `
      <div class="wrapper">
        <div class="warning-badge" role="status" data-info="pulsing">
          <span class="warning-badge__code">ERR 404 · NO SIGNAL</span>
          <span class="warning-badge__msg" data-message>No se encontró TvShow</span>
        </div>
      </div>
    `;
    this.shadowRoot.setHTMLUnsafe(html);
    this.hidden = true;
  }
}
