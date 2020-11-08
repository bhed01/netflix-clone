export const getLandscapePoster = ({ backdrop_path, poster_path }) => backdrop_path || poster_path || '';

export const getPortraitPoster = ({ backdrop_path, poster_path }) => poster_path || backdrop_path || '';

export const getName = ({ title, name, original_name, original_title }) =>
	title || name || original_name || original_title || '';

export const getYear = ({ release_date, first_air_date }) =>
	release_date ? release_date.substr(0, 4) : first_air_date ? first_air_date.substr(0, 4) : '';

export const genres_record = {
	12: 'Adventure',
	14: 'Fantasy',
	16: 'Animation',
	18: 'Drama',
	27: 'Horror',
	28: 'Action',
	35: 'Comedy',
	36: 'History',
	37: 'Western',
	53: 'Thriller',
	80: 'Crime',
	99: 'Documentary',
	878: 'Science Fiction',
	9648: 'Mystery',
	10402: 'Music',
	10749: 'Romance',
	10751: 'Family',
	10752: 'War',
	10759: 'Action & Adventure',
	10762: 'Kids',
	10763: 'News',
	10764: 'Reality',
	10765: 'Sci-Fi & Fantasy',
	10766: 'Soap',
	10767: 'Talk',
	10768: 'War & Politics',
	10770: 'TV Movie'
};

export const getGenres = ({ genre_ids, genres }) => {
	if (genre_ids) {
		return genre_ids.map((id) => ({ id: id, name: genres_record[id] }));
	} else if (genres) {
		return genres;
	} else {
		return [];
	}
};
