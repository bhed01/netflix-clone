import './Banner.css';
import React, { Fragment } from 'react';

import { getGenres, getLandscapePoster, getName, getYear } from '../../movie';
import { Link } from 'react-router-dom';

function Banner({ fullDes, movie }) {
	function truncate(str, n) {
		return str ? (str.length > n ? str.substr(0, n - 1) + '...' : str) : str;
	}

	return (
		<header
			className="banner"
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url(https://image.tmdb.org/t/p/original${getLandscapePoster(movie)})`,
				backgroundPosition: 'center center'
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">{getName(movie)}</h1>
				<div className="description--short">
					<span>{getYear(movie)}</span>
					<span className="ageGroup">{movie.adult ? '18+' : '13+'}</span>
					{getGenres(movie).map(({ id, name }) => <span key={id}>{name}</span>)}
				</div>
				{fullDes ? (
					<p className="description--full">{movie.overview}</p>
				) : (
					<Fragment>
						<p className="description--full">{truncate(movie.overview, 150)}</p>
						<div className="banner__btns">
							<Link to={`/${movie.id}`} className="banner__btn">
								Play
							</Link>
							<button className="banner__btn">My List</button>
						</div>
					</Fragment>
				)}
			</div>

			<div className="banner--fadeBottom" />
		</header>
	);
}

export default Banner;
