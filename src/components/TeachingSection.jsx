import { ways } from "../data"
import WayToTeach from "./WayToTeach"

export default function TeachingSection() {
	return (
		<section>
			<h3 style={{color:'#654', textAlign: 'center'}}>Learning is:</h3>
			<ul>
				{ways.map((way, index) => (
					<WayToTeach key={index} title={way.title} description={way.description} />
				))}
			</ul>
		</section>
	)
}