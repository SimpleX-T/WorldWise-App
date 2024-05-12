/* eslint-disable react/prop-types */
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	// useState,
} from "react";

const Provider = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = { cities: [], isLoading: false, currentCity: {} };

function reducer(state, action) {
	switch (action.type) {
		case "setCities":
			return { ...state, cities: action.payload };
		case "setIsLoading":
			return { ...state, isLoading: action.payload };
		case "setCurrentCity":
			return { ...state, currentCity: action.payload };
		default:
			throw new Error("Action not found");
	}
}

function CityProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState
	);
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				dispatch({ type: "setIsLoading", payload: true });
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "setCities", payload: data });
			} catch {
				alert("Error loading cities data");
			} finally {
				dispatch({ type: "setIsLoading", payload: false });
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			dispatch({ type: "setIsLoading", payload: true });
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "setCurrentCity", payload: data });
		} catch {
			alert("There was an error loading cities data");
		} finally {
			dispatch({ type: "setIsLoading", payload: false });
		}
	}

	async function addNewCity(newCity) {
		dispatch({ type: "setIsLoading", payload: true });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.text();
			dispatch({ type: "setCities", payload: [...cities, data] });
		} catch (error) {
			alert("There was an error adding city");
		} finally {
			dispatch({ type: "setIsLoading", payload: false });
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "setIsLoading", payload: true });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({
				type: "setCities",
				payload: cities.filter((city) => city.id !== id),
			});
			// setCities((cities) => cities.filter);
		} catch (error) {
			alert("There was an error deleting city");
		} finally {
			dispatch({ type: "setIsLoading", payload: false });
		}
	}

	return (
		<Provider.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				addNewCity,
				deleteCity,
			}}>
			{children}
		</Provider.Provider>
	);
}

function useCity() {
	const context = useContext(Provider);

	if (context === undefined)
		throw new Error("useCity is called outside of the CityProvider scope");
	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCity };
