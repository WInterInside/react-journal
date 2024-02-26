import { useState, useRef } from "react"
import Button from "./Button"

function StateRef() {
	const [inputValue, setInputValue] = useState('');
	const input = useRef()

	function handleEnter(event) {
		if (event.key === 'Enter') {
			setInputValue(input.current.value);
		}
	}

	return(
		<div className="form__field">

			<label htmlFor="refinput">Ref input: {inputValue}</label>

			<input
				onKeyDown={handleEnter}
				ref={input}
				type="text"
			/>

		</div>
	)
}

export default function Feedback() {

	const [name, setName] = useState('');
	const [option, setOption] = useState('');
	const [err, setError] = useState(false);

	function handleNameChange(event) {
		setName(event.target.value)
		setError(event.target.value.trim().length === 0);
	}

	function handleOptionChange(event) {
		setOption(event.target.value)
	}

	return(
		<section className="feedback">

			<h2>feedback section</h2>

			<form action="">
				<div className="form__field">
					<label htmlFor="name">Youe name</label>
					<input
						id="name"
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={handleNameChange}
						style={{
							// border: (name.trim().length >= 3 || name.trim().length === 0) ? null : '1px solid red'
							border: err ? '1px solid red' : null
						}}
					/>
				</div>

				<div className="form__field">
					<label htmlFor="options">What you want</label>
					<select id="options" value={option} onChange={handleOptionChange}>
						<option value=""> -- Please Select Option-- </option>
						<option value="err">Err!</option>
						<option value="help">Help!</option>
						<option value="all right">all right!</option>
					</select>
				</div>

				<pre>
					<br />
					name: {name}
					<br />
					<br />
					option: {option}
					<br />
					<br />
				</pre>

				<Button disabled={err} isActive={!err}>Send</Button>
			</form>

			<StateRef />
		</section>
	)
}