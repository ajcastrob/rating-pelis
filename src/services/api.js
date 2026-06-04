const ID = "123";
const PLACEHOLDER_IMAGE = "htpps://placehold.co/210x295";
const URL_API = "https://api.tvmaze.com/shows";

const getShowData = async (id) => {
  const URL = `${URL_API}/${id}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) return;

    const data = await response.json();

    return {
      name: data.name,
      rating: data.rating,
      image: data.image?.medium ?? PLACEHOLDER_IMAGE,
    };
  } catch (error) {
    console.error(`Hubo un error: ${error}`);
  }
};

const getEpisodeList = async (id) => {
  const URL = `${URL_API}/${id}/episodes`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const episodeList = data.map((episode) => ({
      number: episode.number,
      season: episode.season,
      rating: episode.rating,
    }));

    //agrupar
    const episodeListBySeson = Object.groupBy(
      episodeList,
      (episode) => episode.season,
    );
    return episodeListBySeson;
  } catch (error) {
    console.error(error);
  }
};

const infoMovie = (await getShowData(ID)) ?? "Valor por defecto";
const infoEpisodes = (await getEpisodeList(ID)) ?? "Valor por defecto";

export { infoEpisodes, infoMovie };
