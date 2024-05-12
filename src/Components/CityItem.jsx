/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "./contexts/CityProvider";
import ReactCountryFlag from "react-country-flag";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

export default function CityItem({ city }) {
	const { cityName, emoji, date, id, position } = city;

	const { currentCity, deleteCity } = useCity();

	function handleDeleteCity(e) {
		e.preventDefault();
		if (window.confirm("Are you sure you want to delete this city?"))
			deleteCity(id);
		else return;
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					currentCity.id === id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
				<span className={styles.emoji}>
					<ReactCountryFlag countryCode={emoji} svg />
				</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleDeleteCity}>
					&times;
				</button>
			</Link>
		</li>
	);
}
