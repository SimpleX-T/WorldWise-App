// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useGeocoding } from "../hooks/useGeocoding";
import Message from "./Message";
import Spinner from "./Spinner";
import { useProvider } from "./contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

// export function convertToEmoji(countryCode) {
// 	const codePoints = countryCode
// 		.toUpperCase()
// 		.split("")
// 		.map((char) => 127397 + char.charCodeAt());
// 	return String.fromCodePoint(...codePoints);
// }

function Form() {
	const [lat, lng] = useGeocoding();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const { addNewCity, isLoading } = useProvider();
	const navigate = useNavigate();

	// creating more states. P.S: may be a lil bit confusing in the future though😉
	const [emoji, setEmoji] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeolocation] = useState(false);
	const [errorGeocoding, setErrorGeocoding] = useState("");
	// const newCityPosition  =useSearchParams
	const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

	// Fetching the cities data from the reverse geocoding api
	useEffect(
		function () {
			if (!lat && !lng) return;
			async function getGeoCity() {
				try {
					setIsLoadingGeolocation(true);
					setErrorGeocoding("");
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error(
							"That doesn't seem to be a city, click on another city😏"
						);

					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(data.countryCode);
				} catch (err) {
					setErrorGeocoding(err.message);
				} finally {
					setIsLoadingGeolocation(false);
				}
			}
			getGeoCity();
		},
		[lat, lng]
	);

	async function handleSubmit() {
		// if (!cityName || !date) return;

		const newCity = {
			position: { lat, lng },
			cityName,
			country,
			emoji,
			notes,
			date,
		};

		await addNewCity(newCity);
		navigate("/app/cities");
	}

	if (errorGeocoding) return <Message message={errorGeocoding} />;

	if (!lat && !lng) return;

	if (isLoadingGeocoding) return <Spinner />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>
					<ReactCountryFlag countryCode={emoji} svg />
				</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<DatePicker
					selected={date}
					onChange={(date) => setDate(date)}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>
					Notes about your trip to {cityName}
				</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type='primary'>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
