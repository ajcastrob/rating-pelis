import style from "./FormTvShow.css" with { type: "css" };

export class FormTvShow extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(style);
    this.init();
  }

  connectedCallback() {
    this.userConfirm();
  }

  init() {
    this.render();
  }

  userConfirm() {
    this.shadowRoot.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const { name } = Object.fromEntries(formData.entries());
      if (!name || !name.trim()) return;

      const options = {
        detail: { name: name.trim() },
        bubbles: true,
        composed: true,
      };

      this.dispatchEvent(new CustomEvent("formtvshow: send", options));
      e.target.reset();
    });
  }

  render() {
    const html = /*html*/ `
      <form class="form">
        <div class="form__row">
          <span class="form__prefix" aria-hidden="true">▸ CH</span>
          <input
            class="form__input"
            type="text"
            name="name"
            required
            placeholder="star wars, lost, friends..."
            aria-label="Nombre de la serie"
          />
          <button class="form__submit" type="submit">
            <span class="form__submit-label">SCAN</span>
            <span class="form__submit-icon" aria-hidden="true">▶</span>
          </button>
        </div>
      </form>
    `;
    this.shadowRoot.setHTMLUnsafe(html);
  }
}
