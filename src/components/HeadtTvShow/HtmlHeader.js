import { infoMovie } from "../../services/api.js";
import styles from "./HeaderTvShows.css" with { type: "css" };

export class HtmlHeaderTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.init();
  }

  init() {
    this.data = this.obtaintvShowInfo(infoMovie);
    this.render();
  }

  obtaintvShowInfo(infoTv) {
    return {
      image: infoTv?.image,
      name: infoTv?.name,
    };
  }

  render() {
    const error = `<div class="warning-badge" data-info="pulsing">No se encontró película</div>`;
    const headerTvShow = `
    <header>
      <img class="poster" src="${this.data.image}" />
      <h1>
          ${this.data.name}
      </h1>
    </header>
`;
    this.shadowRoot.setHTMLUnsafe(this.data.name ? headerTvShow : error);
  }
}
