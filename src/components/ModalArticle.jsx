import articlePrev from '/articlePrev.jpg';
export default function ModalArticle(props) {
	const handleClose = () => {
		props.onClose();
		document.body.setAttribute('is-modal', 'false');
	};
	return(
		<div className="article__modal">
			<button className="close-button" onClick={handleClose}>Закрыть</button>
			<img src={articlePrev} className="article__modal-prev" alt="article prev" />
			<h2>{props.title}</h2>
			<p>{props.body}</p>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat aliquam debitis temporibus modi impedit ut sequi veniam nihil. Voluptate consectetur temporibus deserunt impedit quisquam enim expedita fugiat ab eum quam.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores natus quidem laudantium at quis ratione quae rerum quam autem modi, nostrum, quod molestiae inventore aliquid eos voluptatem? Veniam, repudiandae ipsa?</p>
		</div>
	)
}