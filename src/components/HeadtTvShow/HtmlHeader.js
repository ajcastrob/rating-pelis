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
    this.data = infoMovie;
    this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/*html*/ `
    <header>
      <img class="poster" src="${this.data.image}" />
      <h1>
          ${this.data.name}
      </h1>
    </header>
`);
  }
}
