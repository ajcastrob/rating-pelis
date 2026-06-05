import { HtmlHeaderTvShows } from "./components/HeadtTvShow/HtmlHeader.js";
import { SeasonTvShows } from "./components/SeasonTvShow/HtmlTvShow.js";
import { EvenControl } from "./utils/EventControl.js";

customElements.define("header-tv-show", HtmlHeaderTvShows);
customElements.define("season-tv", SeasonTvShows);
new EvenControl();
