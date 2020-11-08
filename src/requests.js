const API_KEY = 'IMDB_API_KEY';

export const fetchNetflixOriginals = `/discover/tv?api_key=${API_KEY}&with_networks=213`;

export const fetchTrending = (type) => `/trending/${type}/week?api_key=${API_KEY}&language=en-US`;
export const fetchTopRated = (type) => `/${type}/top_rated?api_key=${API_KEY}&language=en-US`;

export const fetchByGenre = (type, genre) => `/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`;
export const fetchVideo = (type, id) => `${type}/${id}/videos?api_key=${API_KEY}`;
