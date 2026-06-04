import { infoMovie } from "../services/api";

export const getHtmlHeader = () => {
  const header = document.querySelector("header");

  //Creación de la etiqueta img
  const imgShow = document.createElement("img");
  imgShow.classList.add("poster");
  imgShow.src = infoMovie.image;
  header.append(imgShow);

  //Creación de la etiqueta h1.
  const titleShow = document.createElement("h1");
  titleShow.classList.add("title-show");
  titleShow.textContent = infoMovie.name;
  header.append(titleShow);
};
