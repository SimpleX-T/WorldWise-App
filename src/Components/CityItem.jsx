/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useProvider } from "./contexts/ContextProvider";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

export default function CityItem({ city }) {
	const { cityName, emoji, date, id, position } = city;
	const { lng, lat } = position;

	const { currentCity } = useProvider();

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					currentCity.id === id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${lat}&lng=${lng}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
}
