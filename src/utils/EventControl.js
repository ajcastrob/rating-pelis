import { getShowData } from "../services/api";
import { getEpisodeList } from "../services/api";

export class EvenControl {
  constructor() {
    this.headerEl = document.querySelector("header-tv-show");
    this.seasonEl = document.querySelector("season-tv");
    this.formTvShow = document.querySelector("form-tv-show");

    this.init();
  }

  init() {
    this.formTvShow.addEventListener("formtvshow: send", this);
  }

  async handleEvent(event) {
    const { name } = event.detail;

    const movie = await getShowData(name.toLowerCase());
    const episodes = await getEpisodeList(movie ? movie.id : null);

    this.headerEl.update(movie);
    this.seasonEl.update(episodes);
  }
}
