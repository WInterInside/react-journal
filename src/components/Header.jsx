import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return function cleanup() {
			clearInterval(timerID);
		};
	});

	const tick = () => {
		setDate(new Date());
	};

	const location = useLocation();
	const pageName = location.pathname.includes("NewPage") ? "home" : "Create Lesson";
	const linkTo = location.pathname.includes("NewPage") ? "/" : "/NewPage";

	return (
		<header>
		<h3>Winter Inside</h3>
		<Link to={linkTo}>{pageName}</Link>
		<span>Time: {date.toLocaleTimeString()}</span>
		</header>
	);
}