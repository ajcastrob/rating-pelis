import styles from "./SeasonTvShows.css" with { type: "css" };

export class SeasonTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  checkData() {
    return !this.data
      ? ""
      : Object.values(this.data).map((season, index) =>
          this.getSeason(season, index + 1),
        );
  }

  update(episodes) {
    this.data = episodes;

    const html = this.checkData();

    this.render(html);
  }

  render(html) {
    const htmlRender = html ? html.join("") : "";
    this.shadowRoot.setHTMLUnsafe(htmlRender);
  }

  getSeason(season, index) {
    const html = `<section class="season">
        <header class="season-header">T${index}</header>
        ${this.createEpisode(season).join("")}
        </section>        
        `;
    return html;
  }

  createEpisode(episode) {
    return episode.map((item) => {
      const div = `
      <div class="episode episode-${item.number} rating-${Math.floor(item.rating.average)}">${item.number}</div>
      `;
      return div;
    });
  }
}
