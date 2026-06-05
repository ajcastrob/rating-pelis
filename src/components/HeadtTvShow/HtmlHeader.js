import styles from "./HeaderTvShows.css" with { type: "css" };

export class HtmlHeaderTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  obtaintvShowInfo(infoTv) {
    return {
      image: infoTv?.image,
      name: infoTv?.name,
    };
  }

  update(infoTv) {
    this.data = this.obtaintvShowInfo(infoTv);
    this.render();
  }

  render() {
    const error = `<div class="warning-badge" data-info="pulsing">No se encontró película</div>`;
    const headerTvShow = `
    <header>
      <img class="poster" width="210" height="295" decoding="async" alt="Póster de ${this.data.name}" src="${this.data.image}" />
      <h1>
          ${this.data.name}
      </h1>
    </header>
`;
    const content = this.data.name ? headerTvShow : error;
    this.shadowRoot.setHTMLUnsafe(`<div class="wrapper">${content}</div>`);
  }
}
