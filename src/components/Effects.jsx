import { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal"
import userInput from "../Hooks/userInput";

export default function Effects() {
	const [modal, setModal] = useState(false)
	const [load, setLoad] = useState(false)
	const [users, setUsers] = useState([])
	const input  = userInput()

	async function fetchUsers() {
		setLoad(true)
		const response = await fetch('https://jsonplaceholder.typicode.com/users')
		const data = await response.json()
		setUsers(data)
		setLoad(false)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	function openModal() {
		setModal(true)
	}

	return(
		<section>
			<h2>Effects Section</h2>

			<Button onClick={openModal}>Open Modal</Button>

			{load && <p>Load...</p>}

			{!load &&
				<div className="users">
					<input style={{marginTop: '2rem'}} type="text" {...input}/>
					<ul style={{color:'purple', textAlign: 'center', marginTop: '2rem'}}>
						{users.
							filter((user) => user.name.toLowerCase().includes(input.value.toLowerCase())).map((user, id) => (
							<li key={user.id}>
								<p>{user.name}</p>
								<p>{user.username}</p>
								<p>{user.email}</p>
							</li>
						))}
					</ul>
				</div>
			}

			<Modal open={modal}>
				<h2>Modal Modal</h2>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque quod qui ut sed ad, blanditiis dolorum temporibus suscipit recusandae quasi, ipsam veritatis quia, modi mollitia dolorem quisquam. Autem, adipisci corporis.
					Dolor dolorem, alias nesciunt non iste ducimus ea? Deleniti officia, quasi tempora iste saepe enim debitis explicabo fugiat tenetur maxime quos architecto cumque atque modi voluptatum. Accusamus, corporis blanditiis. Rerum.
					Voluptatum illum facere modi suscipit eaque sapiente beatae amet animi explicabo. Molestiae voluptas vitae consequuntur sunt nemo, dolorum ratione repellendus tenetur similique deleniti? Deserunt mollitia non optio nam! Nobis, vero?
				</p>
				<Button onClick={() => setModal(close)}>X</Button>
			</Modal>

		</section>
	)
}