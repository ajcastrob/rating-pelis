import { infoMovie } from "../services/api";

export class HtmlHeaderTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.init();
  }

  init() {
    this.data = infoMovie;
    this.render();
  }

  render() {
    this.setHTMLUnsafe(/*html*/ `
    <header>
      <img class="poster" src="${this.data.image}" />
      <h1>
          ${this.data.name}
      </h1>
    </header>
`);
  }
}
