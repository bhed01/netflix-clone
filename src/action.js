import axios from './axios';
import { fetchByGenre, fetchNetflixOriginals, fetchTopRated, fetchTrending } from './requests';

export const SET_MOVIES = 'SET_MOVIES';
export const SET_NETFLIX_ORIGINALS = 'SET_NETFLIX_ORIGINALS';

const genreToIdMap = {
	action: 28,
	comedy: 35,
	horror: 27,
	romance: 10749,
	documentary: 99
};

export const setMovies = (types) => (dispath) => {
	let url = '';
	let originals = false;
	switch (types[1]) {
		case 'netflixOriginals':
			url = fetchNetflixOriginals;
			originals = true;
			break;
		case 'trending':
			url = fetchTrending(types[0]);
			break;
		case 'topRated':
			url = fetchTopRated(types[0]);
			break;
		default:
			if (typeof types[1] === 'number') url = fetchByGenre(types[0], types[1]);
			else url = fetchByGenre(types[0], genreToIdMap[types[1]]);
	}
	axios
		.get(url)
		.then((res) => {
			if (originals)
				dispath({
					type: SET_NETFLIX_ORIGINALS,
					payload: res.data.results
				});
			else
				dispath({
					type: SET_MOVIES,
					payload: res.data.results,
					subTypes: types
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
