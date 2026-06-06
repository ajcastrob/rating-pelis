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
      id: infoTv?.id,
      image: infoTv?.image,
      name: infoTv?.name,
      rating: infoTv?.rating?.average ?? null,
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
    const { name, image, rating } = this.data;
    const channelNum = String(((this.data.id ?? 0) % 99) + 1).padStart(2, "0");
    const ratingText = rating?.toFixed?.(1) ?? "—";
    const dataTarget = rating ?? 0;

    const headerTvShow = /*html*/ `
      <article class="card">
        <div class="card__poster">
          <img class="card__img" width="210" height="295" decoding="async" alt="Póster de ${name}" src="${image}" />
        </div>
        <div class="card__info">
          <div class="card__channel">// CH ${channelNum}</div>
          <h1 class="card__title">${name}</h1>
          <div class="card__meta">
            <span class="card__rating-label">RATING</span>
            <span class="card__rating-value" data-target="${dataTarget}">${ratingText}</span>
            <span class="card__rating-max">/ 10</span>
          </div>
        </div>
      </article>
    `;
    this.shadowRoot.setHTMLUnsafe(`<div class="wrapper">${headerTvShow}</div>`);
    this.hidden = false;
    this.animateRating();
  }

  animateRating() {
    const el = this.shadowRoot.querySelector(".card__rating-value");
    if (!el) return;
    const target = parseFloat(el.dataset.target);
    if (!Number.isFinite(target) || target <= 0) {
      el.textContent = "—";
      return;
    }
    const duration = 800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(1);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(1);
    };
    requestAnimationFrame(step);
  }
}
