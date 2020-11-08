import { Fragment, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './Movie.css';

import Banner from '../banner/Banner';
import Row from '../row/Row';

import { getGenres } from '../../movie';
import { fetchVideo } from '../../requests';
import axios from '../../axios';

function Movie({ movie, type }) {
	const [ videos, setVideos ] = useState([]);

	useEffect(
		() => {
			axios
				.get(fetchVideo(type, movie.id))
				.then((res) => {
					setVideos(res.data.results);
				})
				.catch((err) => console.log(err));
		},
		[ movie ]
	);

	return (
		<Fragment>
			<Banner movie={movie} fullDes />
			<div className="videos">
				<h2 className="videos__title">Videos</h2>
				<div className="videos__grid">
					{videos.map(({ id, key, name }) => (
						<div className="video" key={id}>
							<YouTube
								videoId={key}
								containerClassName="video__container"
								opts={{
									height: '200',
									width: '360'
								}}
							/>
							<h4 className="video__title">{name}</h4>
						</div>
					))}
				</div>
			</div>
			{getGenres(movie).map(({ id, name }) => <Row key={id} title={`More ${name}`} types={[ type, id ]} />)}
		</Fragment>
	);
}

export default Movie;
