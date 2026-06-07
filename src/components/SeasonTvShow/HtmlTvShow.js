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

  getSeasonLengthHtml(seasons, seasonLength) {
    const seasonsHtml = seasonLength
      ? `<div class="seasons">${seasons.join("")}</div>`
      : "";
    return seasonsHtml;
  }

  obtainLegendHtml(seasonLength) {
    const legendHtml = seasonLength ? this.renderLegend() : "";
    return legendHtml;
  }

  render() {
    const seasons = this.data ? this.checkData() : [];
    const seasonLength = seasons.length;

    const seasonsHtml = this.getSeasonLengthHtml(seasons, seasonLength);

    const legendHtml = this.obtainLegendHtml(seasonLength);

    this.shadowRoot.setHTMLUnsafe(`${seasonsHtml}${legendHtml}`);
    this.hidden = false;
  }

  checkData() {
    return Object.values(this.data).map((season, index) =>
      this.getSeason(season, index + 1),
    );
  }

  obtainSeaonLabel(numberSeasons) {
    const seasonLabel =
      numberSeasons === 0
        ? "SPECIALS"
        : `SEASON ${String(numberSeasons).padStart(2, "0")}`;

    return seasonLabel;
  }

  obtainAverageRating(season) {
    const rated = season.filter((ep) => ep.rating?.average != null);
    const avg = rated.length
      ? rated.reduce((s, ep) => s + ep.rating.average, 0) / rated.length
      : null;
    const avgText = avg !== null ? `AVG ${avg.toFixed(1)}` : "AVG —";

    return avgText;
  }

  getSeason(season, index) {
    const seasonNum = season[0]?.season ?? index;
    const episodeCount = season.length;

    const seasonLabel = this.obtainSeaonLabel(seasonNum);

    const avgText = this.obtainAverageRating(season);

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
