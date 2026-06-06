import style from "./BadgeAlert.css" with { type: "css" };

export class BadgeAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(style);
    this.render();
  }

  show(message) {
    const badge = this.shadowRoot.querySelector(".warning-badge");
    if (badge) {
      badge.textContent = message;
    }

    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  render() {
    const html = /*html*/ `<div class="warning-badge" role="status" data-info="pulsing">No se encontró TvShow</div>`;
    this.shadowRoot.setHTMLUnsafe(`<div class="wrapper">${html}</div>`);
    this.hidden = true;
  }
}
