import { infoEpisodes } from "../services/api.js";

const createEpisodeHtml = (episode) => {
  return episode.map((item) => {
    const div = document.createElement("div");

    div.classList.add(
      "episode",
      `episode-${item.number}`,
      `rating-${Math.floor(item.rating.average)}`,
    );

    div.textContent = item.number;

    return div;
  });
};

function createSeasonHtml(data, number) {
  const seasonDiv = document.createElement("article");

  seasonDiv.classList.add("season");

  const headerEpisode = document.createElement("header");
  headerEpisode.classList.add("season-header");
  headerEpisode.textContent = `T${number}`;
  seasonDiv.append(headerEpisode);

  const episodes = createEpisodeHtml(data);
  episodes.forEach((element) => seasonDiv.append(element));

  return seasonDiv;
}

const list = Object.values(infoEpisodes).map((season, index) =>
  createSeasonHtml(season, index + 1),
);

export default list;
