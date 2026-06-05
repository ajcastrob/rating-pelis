export const getShowData = async (id) => {
  const PLACEHOLDER_IMAGE = "htpps://placehold.co/210x295";
  const URL_API = "https://api.tvmaze.com/search/shows?q=";
  const URL = `${URL_API}${id}`;

  try {
    const response = await fetch(URL);

    const data = (await response.json())[0];

    return {
      id: data.show.id,
      name: data.show.name,
      rating: data.show.rating,
      image: data.show.image?.medium ?? PLACEHOLDER_IMAGE,
    };
  } catch (error) {
    return null;
  }
};

export const getEpisodeList = async (id) => {
  const URL_API = "https://api.tvmaze.com/shows";
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
    return null;
  }
};
