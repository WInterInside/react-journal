import React, { useEffect, useState } from "react";
import Article from "./Article";
import Slider from "react-slick";
import articlePrev from '/articlePrev.jpg';

export default function YogaJournal() {
	const [load, setLoad] = useState(false);
	const [allArticles, setAllArticles] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedArticle, setSelectedArticle] = useState(null);

	const sliderSettings = {dots: true,	infinite: true,	speed: 500,	slidesToShow: 3, slidesToScroll: 3};

	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 6;
	const totalPages = Math.ceil(allArticles.length / articlesPerPage);
	const indexOfLastArticle = currentPage * articlesPerPage;
	const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
	const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);

	const handleArticleClick = (article) => {
		setSelectedArticle(article);
		setModalOpen(true);
		console.log('open modal');
		document.querySelector('body').setAttribute('is-modal', 'true');
	};

	const closeModal = () => {
		setModalOpen(false);
		document.querySelector('body').removeAttribute('is-modal');
	};

	const handleNextPage = () => {
		if (indexOfLastArticle < allArticles.length) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	async function fetchArticles() {
		setLoad(true);
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		const data = await response.json();
		setAllArticles(data);
		setLoad(false);
	}

	useEffect(() => {
		fetchArticles();
	}, []);

	return (
		<section className="journal">
			<h1>Йога Журнал</h1>

			{load && <p>Load...</p>}

			<h2 className="journal__caption">Популярные статьи</h2>

			{!load && (
				<div className="journal__slider">
					<Slider {...sliderSettings}>
						{currentArticles.map((article, index) => (
							<Article
								key={index}
								title={article.title}
								body={article.body}
								onClick={() => handleArticleClick(article)}
							/>
						))}
					</Slider>
				</div>
			)}

			<h2 className="journal__caption">Статьи</h2>

			{!load && (
				<div className="journal__articles">
					{currentArticles.map((article, index) => (
						<Article
							key={index}
							title={article.title}
							body={article.body}
							onClick={() => handleArticleClick(article)}
						/>
					))}
				</div>
			)}

			<div className="pagination">
				<button onClick={handlePrevPage} disabled={currentPage === 1}>
					Prev
				</button>
				<div>
					Page {currentPage} of {totalPages}
				</div>
				<button onClick={handleNextPage} disabled={indexOfLastArticle >= allArticles.length}>
					Next
				</button>
			</div>

			{modalOpen && selectedArticle && (
				<div className="modal">
					<img src={articlePrev} className="article__prev" alt="article prev" />
					<h2>{selectedArticle.title}</h2>
					<p>{selectedArticle.body}</p>
					<p>{selectedArticle.body}</p>
					<p>{selectedArticle.body}</p>
					<button onClick={closeModal}>Закрыть</button>
				</div>
			)}

		</section>
	);
}