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

  hide() {
    this.hidden = true;
  }

  update(infoTv) {
    this.data = this.obtaintvShowInfo(infoTv);
    this.render();
  }

  render() {
    const headerTvShow = /*html*/ `
    <header>
      <img class="poster" width="210" height="295" decoding="async" alt="Póster de ${this.data.name}" src="${this.data.image}" />
      <h1>
          ${this.data.name}
      </h1>
    </header>
`;
    this.shadowRoot.setHTMLUnsafe(`<div class="wrapper">${headerTvShow}</div>`);
    this.hidden = false;
  }
}
