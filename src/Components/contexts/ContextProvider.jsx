/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const Provider = createContext();

const BASE_URL = "http://localhost:3000";

function ContextProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert("Error loading cities data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("Error loading cities data");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Provider.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
			}}>
			{children}
		</Provider.Provider>
	);
}

function useProvider() {
	const context = useContext(Provider);

	if (context === undefined)
		throw new Error(
			"useProvider is called outside of the ContextProvider scope"
		);
	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useProvider };
