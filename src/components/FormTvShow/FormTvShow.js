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
        bubles: true,
        composed: true,
      };

      const event = new CustomEvent("formtvshow: send", options);
      this.dispatchEvent(event);
      e.target.reset();
    });
  }

  render() {
    const html = /*html*/ `<form class="form">
        <div class="container-form">
          <input
            type="text"
            name="name"
            required
            placeholder="Star Wars, Lost, Friends..."
          />
          <button class="btn-search" type="submit"></button>
        </div>
      </form>
`;
    this.shadowRoot.setHTMLUnsafe(html);
  }
}
