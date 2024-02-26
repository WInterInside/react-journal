export default function ModalArticle(props) {
	return(
		<div className="article__modal">
			<button className="close-button" onClick={props.onClose}>Закрыть</button>
			<h2 className="article__title">{props.title}</h2>
			<p className="article__text">{props.body}</p>
			<p className="article__main-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat aliquam debitis temporibus modi impedit ut sequi veniam nihil. Voluptate consectetur temporibus deserunt impedit quisquam enim expedita fugiat ab eum quam.</p>
			<p className="article__main-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores natus quidem laudantium at quis ratione quae rerum quam autem modi, nostrum, quod molestiae inventore aliquid eos voluptatem? Veniam, repudiandae ipsa?</p>
		</div>
	)
}