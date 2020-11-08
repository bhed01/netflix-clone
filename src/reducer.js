import { SET_MOVIES, SET_NETFLIX_ORIGINALS } from './action';

const initialState = {
	netflixOriginals: [],
	movie: {},
	tv: {}
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_NETFLIX_ORIGINALS:
			return {
				...state,
				netflixOriginals: action.payload
			};
		case SET_MOVIES:
			return {
				...state,
				[action.subTypes[0]]: {
					...state[action.subTypes[0]],
					[action.subTypes[1]]: action.payload
				}
			};
		default:
			return state;
	}
}

export default reducer;
