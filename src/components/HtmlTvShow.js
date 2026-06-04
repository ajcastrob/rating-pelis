import { infoEpisodes } from "../services/api.js";

export class SeasonTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.init();
  }

  init() {
    this.data = infoEpisodes;
  }

  connectedCallback() {
    const html = Object.values(this.data).map((season, index) =>
      this.getSeason(season, index + 1),
    );
    this.render(html.join(""));
  }

  render(html) {
    this.setHTMLUnsafe(html);
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
