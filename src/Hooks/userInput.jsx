import { useState } from "react";

export default function userInput(defaultValue = '') {
	const [value, setValue] = useState(defaultValue)
	return {
		value,
		onChange: (event) => setValue(event.target.value),
	}
}