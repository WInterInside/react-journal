import { differences } from "../data"
import Button from "./Button"

export default function Differences({ contentType, handleClick }) {
	
	return (
		<section>
			<h3 style={{color:'#654', textAlign: 'center'}}>Difference:</h3>
			<div className="nav">
				<Button isActive={contentType === 'way'} onClick={() => handleClick('way')}>How?</Button>
				<Button isActive={contentType === 'easy'} onClick={() => handleClick('easy')}>Users</Button>
				<Button isActive={contentType === 'program'} onClick={() => handleClick('program')}>Content</Button>
			</div>
			{contentType ? <p>{differences[contentType]}</p> : <p>нажми на кнопку</p>}
		</section>
	)
}