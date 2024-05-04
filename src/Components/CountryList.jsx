/* eslint-disable react/prop-types */
import { useProvider } from "./contexts/ContextProvider";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList() {
	const { cities, isLoading } = useProvider();

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [
				...arr,
				{
					country: city.country,
					emoji: city.emoji,
					// countryCode: city.con
				},
			];
		else return arr;
	}, []);

	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}
