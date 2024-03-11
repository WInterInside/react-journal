import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const pageNames = {
	"/NewPage": "Create Lesson",
	"/NewLargePage": "New Large Page"
};

export default function Header() {
	const [date, setDate] = useState(new Date());
	const location = useLocation();

	useEffect(() => {
		const intervalId = setInterval(() => {
		setDate(new Date());
	}, 1000);

	return () => clearInterval(intervalId);
	}, [date]);

	return (
		<header>
			<a className="logo" href="/">Winter Inside</a>

			{Object.keys(pageNames).map((path) => (
				<Link
					className={location.pathname === path ? "current" : ""}
					key={path}
					to={path}>{pageNames[path]}
				</Link>
			))}

			<span>Time: {date.toLocaleTimeString()}</span>
		</header>
	);
}