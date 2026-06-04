import { getHtmlHeader } from "./modules/HtmlHeader";
import list from "./modules/HtmlTvShow";

getHtmlHeader();
const episodes = document.querySelector(".episodes");
episodes.append(...list);
