import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Row.css';

import { getLandscapePoster, getName, getPortraitPoster } from '../../movie';
import { setMovies } from '../../action';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, types, movies, setMovies, isLargeRow }) {
	const rowRef = useRef(null);
	const leftBtn = useRef(null);
	const rightBtn = useRef(null);

	useEffect(
		() => {
			setMovies(types);
		},
		[ types[0] ]
	);

	useEffect(() => {
		const row = rowRef.current;
		function handleScrollBtn() {
			if (row.scrollLeft === 0) {
				leftBtn.current.classList.add('op-0');
			} else {
				leftBtn.current.classList.remove('op-0');
			}
			if (row.scrollLeft === row.scrollLeftMax) {
				rightBtn.current.classList.add('op-0');
			} else {
				rightBtn.current.classList.remove('op-0');
			}
		}
		row.addEventListener('scroll', handleScrollBtn);
		return () => {
			row.removeEventListener('scroll', handleScrollBtn);
		};
	}, []);

	function scrollRight() {
		rowRef.current.scrollLeft += Math.floor(rowRef.current.offsetWidth * 0.6);
	}
	function scrollLeft() {
		rowRef.current.scrollLeft -= Math.floor(rowRef.current.offsetWidth * 0.6);
	}

	return (
		<div className="row">
			<h2 className="row__title">{title}</h2>
			<div className="row__content">
				<button onClick={scrollLeft} ref={leftBtn} className="scrollBtn scroll--left op-0">
					<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path fill="currentColor" d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" />
					</svg>
				</button>
				<div ref={rowRef} className="row__posters">
					{movies.map((movie) => (
						<div className="movie" key={movie.id}>
							<Link to={`/${movie.id}`}>
								<img
									className={`movie__poster ${isLargeRow && 'movie__poster--large'}`}
									src={base_url + (isLargeRow ? getPortraitPoster(movie) : getLandscapePoster(movie))}
									alt={getName(movie)}
								/>
							</Link>
							{isLargeRow ? '' : <h4 className="movie__title">{getName(movie)}</h4>}
						</div>
					))}
				</div>
				<button onClick={scrollRight} ref={rightBtn} className="scrollBtn scroll--right">
					<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path fill="currentColor" d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" />
					</svg>
				</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	if (ownProps.types[1] === 'netflixOriginals')
		return {
			movies: state.netflixOriginals
		};
	else if (state[ownProps.types[0]][ownProps.types[1]])
		return {
			movies: state[ownProps.types[0]][ownProps.types[1]]
		};
	else
		return {
			movies: []
		};
};

export default connect(mapStateToProps, { setMovies })(Row);
