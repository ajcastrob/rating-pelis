import { getShowData } from "../services/api";
import { getEpisodeList } from "../services/api";

export class EvenControl {
  constructor() {
    this.form = document.querySelector(".form");
    this.headerEl = document.querySelector("header-tv-show");
    this.seasonEl = document.querySelector("season-tv");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", this);
  }

  async handleEvent(event) {
    event.preventDefault();
    const datoFormulario = new FormData(this.form);
    const { name } = Object.fromEntries(datoFormulario.entries());
    if (!name || name.trim().length === 0) return;

    const movie = await getShowData(name.toLowerCase());
    const episodes = await getEpisodeList(movie ? movie.id : null);

    this.headerEl.update(movie);
    this.seasonEl.update(episodes);
    this.form.reset();
  }
}
