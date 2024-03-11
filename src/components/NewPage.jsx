import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

export default function NewPage() {
	const [destinationItems, setDestinationItems] = useState([]);
	const [showList2, setShowList2] = useState(false);
	const [lessonName, setLessonName] = useState('');
	const isLessonNameEmpty = lessonName.trim() === '';

	const createLesson = () => {
		setShowList2(true);
	};

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const { source, destination } = result;

		if (source.droppableId === 'droppable' && destination.droppableId === 'droppable') {
			const reorderedItems = Array.from(items);
			const [movedItem] = reorderedItems.splice(source.index, 1);
			reorderedItems.splice(destination.index, 0, movedItem);
			setItems(reorderedItems);
		} else if (source.droppableId === 'droppable' && destination.droppableId === 'droppable2') {
			const movedItem = items[source.index];
			setItems((prevItems) => prevItems.filter((_, index) => index !== source.index));
			setDestinationItems((prevDestItems) => [...prevDestItems, movedItem]);
		} else if (source.droppableId === 'droppable2' && destination.droppableId === 'droppable') {
			const movedItem = destinationItems[source.index];
			setDestinationItems((prevDestItems) => prevDestItems.filter((_, index) => index !== source.index));
			setItems((prevItems) => [...prevItems, movedItem]);
		} else if (source.droppableId === 'droppable2' && destination.droppableId === 'droppable2') {
			const reorderedDestinationItems = Array.from(destinationItems);
			const [movedItem] = reorderedDestinationItems.splice(source.index, 1);
			reorderedDestinationItems.splice(destination.index, 0, movedItem);
			setDestinationItems(reorderedDestinationItems);
		}
	};

	const [items, setItems] = useState(Array.from({ length: 10 }, (v, i) => i + 1));

	const handleAddItem = () => {
		const newItem = items.length + 1;
		setItems([...items, newItem]);
	};

	const handleResetOrder = () => {
		setItems(Array.from({ length: 10 }, (v, i) => i + 1));
		setDestinationItems(Array.from({ length: 0 }));
		setShowList2(false);
	};

	const handleDeleteItem = (index, list) => {
		const updatedDestinationItems = destinationItems.filter((item, i) => i !== index);
		setDestinationItems(updatedDestinationItems);
	};

	const saveLesson = () => {
		const lessonData = {
			llessonName: lessonName,
			items: destinationItems
		};

		fetch('https://eoacckeuq8twfkv.m.pipedream.net', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lessonData),
		})
		.then(response => {
			if (response.ok) {
				alert('Массив успешно отправлен на сервер');
				return response.json();
			} else {
				alert('Произошла ошибка при отправке массива на сервер');
			}
		})
		.then(data => {
			console.log('Данные, полученные сервером:', data);
		})
		.catch(error => {
			console.error('Ошибка:', error);
			alert('Произошла ошибка при отправке массива на сервер');
		});
	};

	return (
		<div>
			<h1>New Page</h1>

			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div className="list" ref={provided.innerRef} {...provided.droppableProps}>
							{items.length === 0 && <p>Добавь хотя бы 1 айтем</p>}
							{items.map((item, index) => (
								<Draggable key={index} draggableId={`item-${item}`} index={index}>
									{(provided, snapshot) => (
										<div
											className={`list__item ${snapshot.isDragging ? 'dragging' : ''}`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											>
											Item {item}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>

				{showList2 && (
				<Droppable droppableId="droppable2">
					{(provided) => (
					<div className="list2" ref={provided.innerRef} {...provided.droppableProps}>
						{destinationItems.length === 0 && <p>Перетащи сюда итемы из 1 списка что бы создать урок</p>}
						{destinationItems.map((item, index) => (
							<Draggable key={index} draggableId={`item-${item}`} index={index}>
							{(provided, snapshot) => (
							<div
								className={`list__item ${snapshot.isDragging ? 'dragging' : ''}`}
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								Item {item}
								<span onClick={() => handleDeleteItem(index, 'list2')}>x</span>
							</div>
							)}
						</Draggable>
						))}
						{provided.placeholder}
					</div>
					)}
				</Droppable>
				)}
			</DragDropContext>

			<div className="btns">
				<button className="list__btn" onClick={handleAddItem}>Add New Item</button>
				<button className="list__btn" onClick={createLesson}>Create New Lesson</button>
				<button className="list__btn" onClick={handleResetOrder}>Reset</button>

				{showList2 && (
					<div className="save-form">
						<div className="save-form-wrapper">
							{isLessonNameEmpty && destinationItems.length > 0 && (
								<span>Введите название урока</span>
							)}
							<input
								type="text"
								placeholder="название урока?"
								value={lessonName}
								onChange={(e) => setLessonName(e.target.value)}
							/>
						</div>
						<button
							className={`list__btn ${destinationItems.length === 0 || isLessonNameEmpty  ? 'disabled' : ''}`}
							onClick={saveLesson}>
								Save Lesson
						</button>
					</div>
				)}

			</div>

			<div className="result">
				<span>Cписок асан: </span>
				<p>{items.join(", ")}</p>
			</div>

			{showList2 && (
				<div className="result">
					<span>Новый урок: </span>
					<p>{destinationItems.join(", ")}</p>
				</div>
			)}

		</div>
	);
}