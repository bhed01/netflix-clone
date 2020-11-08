import Row from './row/Row';
import Banner from './banner/Banner';
import Nav from './nav/Nav';
import Movie from './movie/Movie';

import { Route, Switch } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

function App({ netflixOriginals, movies, tvShows }) {
	const [ movie, setMovie ] = useState({});

	useEffect(
		() => {
			if (netflixOriginals && netflixOriginals.length > 0) {
				setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
			}
		},
		[ netflixOriginals ]
	);

	return (
		<Fragment>
			<Nav />
			<Switch>
				{netflixOriginals.map((m) => (
					<Route key={m.id} path={`/${m.id}`}>
						<Movie movie={m} type="tv" />
					</Route>
				))}
				{movies.map((m) => (
					<Route key={m.id} path={`/${m.id}`}>
						<Movie movie={m} type="movie" />
					</Route>
				))}
				{tvShows.map((m) => (
					<Route key={m.id} path={`/${m.id}`}>
						<Movie movie={m} type="tv" />
					</Route>
				))}
				<Route exact path="/">
					<Fragment>
						<Banner movie={movie} />
						<Row title="NETFLIX ORIGINALS" types={[ 'all', 'netflixOriginals' ]} isLargeRow={true} />
						<Row title="Trending Movies" types={[ 'movie', 'trending' ]} />
						<Row title="Top Rated Movies" types={[ 'movie', 'topRated' ]} />
						<Row title="Action Movies" types={[ 'movie', 'action' ]} />
						<Row title="Comedy Movies" types={[ 'movie', 'comedy' ]} />
						<Row title="Horror Movies" types={[ 'movie', 'horror' ]} />
						<Row title="Romance Movies" types={[ 'movie', 'romance' ]} />
						<Row title="Documentaries" types={[ 'movie', 'documentary' ]} />
					</Fragment>
				</Route>
				<Route path="/tv">
					<Fragment>
						<Banner movie={movie} />
						<Row title="NETFLIX ORIGINALS" types={[ 'all', 'netflixOriginals' ]} isLargeRow={true} />
						<Row title="Trending TV Shows" types={[ 'tv', 'trending' ]} />
						<Row title="Top Rated TV Shows" types={[ 'tv', 'topRated' ]} />
						<Row title="Action TV Shows" types={[ 'tv', 'action' ]} />
						<Row title="Comedy TV Shows" types={[ 'tv', 'comedy' ]} />
						<Row title="Horror TV Shows" types={[ 'tv', 'horror' ]} />
						<Row title="Romance TV Shows" types={[ 'tv', 'romance' ]} />
						<Row title="Documentary Shows" types={[ 'tv', 'documentary' ]} />
					</Fragment>
				</Route>
			</Switch>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	netflixOriginals: state.netflixOriginals,
	movies: Object.values(state.movie).flat(),
	tvShows: Object.values(state.tv).flat()
});

export default connect(mapStateToProps)(App);
