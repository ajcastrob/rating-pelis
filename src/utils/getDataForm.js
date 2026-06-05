import { getShowData} from "../services/api";
import { getEpisodeList } from "../services/api";

export class EvenControl {
  constructor() {
    this.form = document.querySelector(".form");
    this.headerEl = document.querySelector("header-tv-show")
    this.seasonEl = document.querySelector("season-tv")

    this.init();
  }

  init() {
    this.form.addEventListener("submit", this);
  }

  async handleEvent(event) {
    event.preventDefault();
    const datoFormulario = new FormData(this.form);
    const { name } = Object.fromEntries(datoFormulario.entries());
    if (!name) return;

    const movie = await getShowData(name.toLocaleLowerCase())
    const episodes = await getEpisodeList(movie.id)

    this.headerEl.update(movie);
    this.seasonEl.update(episodes)
  }
}
