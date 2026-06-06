import { HtmlHeaderTvShows } from "./components/HeadtTvShow/HtmlHeader.js";
import { SeasonTvShows } from "./components/SeasonTvShow/HtmlTvShow.js";
import { FormTvShow } from "./components/FormTvShow/FormTvShow.js";
import { EvenControl } from "./utils/EventControl.js";
import { BadgeAlert } from "./components/BadgeAlert/BadgeAlert.js";
import { NavbarTvShow } from "./components/Navbar/NavbarTvShow.js";

customElements.define("nav-tv-show", NavbarTvShow);
customElements.define("header-tv-show", HtmlHeaderTvShows);
customElements.define("season-tv", SeasonTvShows);
customElements.define("form-tv-show", FormTvShow);
customElements.define("badge-alert", BadgeAlert);
new EvenControl();
