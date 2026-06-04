import { HtmlHeaderTvShows } from "./modules/HtmlHeader";
import list from "./modules/HtmlTvShow";

customElements.define("header-tv-show", HtmlHeaderTvShows);
const episodes = document.querySelector(".episodes");
episodes.append(...list);
