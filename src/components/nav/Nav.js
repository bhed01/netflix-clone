import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import tmdb_logo from './tmdb_logo.svg';
import './Nav.css';

function Nav() {
	const [ show, handleShow ] = useState(false);

	function addBg() {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', addBg);
		return () => {
			window.removeEventListener('scroll', addBg);
		};
	}, []);

	return (
		<nav className={`nav ${show && 'nav--background'}`}>
			<div className="nav__left">
				<img className="nav__logo" src={logo} alt="Netflix Logo" />
				<div className="nav__elements">
					<Link to="/">Movies</Link>
					<Link to="/tv">TV Shows</Link>
				</div>
			</div>
			<img className="nav__logo" src={tmdb_logo} alt="TMDB Logo" />
		</nav>
	);
}

export default Nav;
