import styles from "./SeasonTvShows.css" with { type: "css" };

export class SeasonTvShows extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  hide() {
    this.hidden = true;
  }

  update(episodes) {
    this.data = episodes;
    this.render();
  }

  render() {
    const seasons = this.data ? this.checkData() : [];
    const seasonsHtml = seasons.length
      ? `<div class="seasons">${seasons.join("")}</div>`
      : "";
    const legendHtml = seasons.length ? this.renderLegend() : "";
    this.shadowRoot.setHTMLUnsafe(`${seasonsHtml}${legendHtml}`);
    this.hidden = false;
  }

  checkData() {
    return Object.values(this.data).map((season, index) =>
      this.getSeason(season, index + 1),
    );
  }

  getSeason(season, index) {
    const seasonNum = season[0]?.season ?? index;
    const seasonLabel =
      seasonNum === 0
        ? "SPECIALS"
        : `SEASON ${String(seasonNum).padStart(2, "0")}`;
    const episodeCount = season.length;
    const rated = season.filter((ep) => ep.rating?.average != null);
    const avg = rated.length
      ? rated.reduce((s, ep) => s + ep.rating.average, 0) / rated.length
      : null;
    const avgText = avg !== null ? `AVG ${avg.toFixed(1)}` : "AVG —";

    return `
      <section class="season">
        <header class="season__header">
          <h2 class="season__title">▮ ${seasonLabel}</h2>
          <div class="season__stats">
            <span class="season__count">${episodeCount} EP</span>
            <span class="season__sep" aria-hidden="true">/</span>
            <span class="season__avg">${avgText}</span>
          </div>
        </header>
        <div class="season__grid">
          ${this.createEpisode(season, seasonNum).join("")}
        </div>
      </section>
    `;
  }

  createEpisode(episode, seasonNum) {
    return episode.map((item, i) => {
      const r = item.rating?.average;
      const ratingClass = r != null ? `rating-${Math.floor(r)}` : "rating-na";
      const ratingText = r != null ? r.toFixed(1) : "—";
      const seasonText = String(seasonNum).padStart(2, "0");
      const numText = String(item.number ?? 0).padStart(2, "0");
      return `
        <div class="episode ${ratingClass}" style="--i: ${i}" tabindex="0" aria-label="Season ${seasonNum} episode ${item.number}, rating ${ratingText} of 10">
          <span class="episode__num">${numText}</span>
          <span class="episode__tip" aria-hidden="true">S${seasonText} · E${numText} · ${ratingText}/10</span>
        </div>
      `;
    });
  }

  renderLegend() {
    return `
      <footer class="legend">
        <span class="legend__caption">SCALE 0—10</span>
        <div class="legend__bar" aria-hidden="true">
          <span class="legend__marker" style="left: 0%">0</span>
          <span class="legend__marker" style="left: 50%">5</span>
          <span class="legend__marker" style="left: 100%">10</span>
        </div>
      </footer>
    `;
  }
}
