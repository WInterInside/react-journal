import articlePrev from '/articlePrev.jpg';
import { useState, useEffect } from 'react';

export default function Article({ title, body, onClick }) {
	const [likes, setLikes] = useState(10);
	const [liked, setLiked] = useState(false);
  
	const handleLikeClick = () => {
		if (liked) {
			setLikes(likes - 1);
			setLiked(false);
			localStorage.setItem('liked', 'false');
		} else {
			setLikes(likes + 1);
			setLiked(true);
			localStorage.setItem('liked', 'true');
		}
	};

	useEffect(() => {
		const initialLiked = localStorage.getItem('liked') === 'true';
		setLiked(initialLiked);
	}, []);

	useEffect(() => {
		localStorage.setItem('liked', liked);
	}, [liked]);

	const likeStyle = {
		color: liked ? 'white' : 'gray',
		backgroundColor: liked ? '#1D9E49' : 'transparent',
		fontWeight: liked ? 'bold' : 'normal',
	};
  
	return (
		<div className="article" onClick={onClick}>
			<img src={articlePrev} className="article__prev" alt="article prev" />
			<div className="article__content">
				<h2 className="article__title">{title}</h2>
				<p className="article__text">{body}</p>

				<div className="article__data">
					<div className="article__info">
						<span className="article__date">12 марта 2022</span>
						<span className="article__author">Константин Л.</span>
					</div>
					<div className="article__counters">
						<span className="article__comments">10</span>
						<span className="article__views">200</span>
						<span className="article__likes" onClick={handleLikeClick} style={likeStyle}>{likes}</span>
					</div>
				</div>

			</div>

		</div>
	)
}