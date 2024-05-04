import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useProvider } from "./contexts/ContextProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useGeocoding } from "../hooks/useGeocoding";
import ReactCountryFlag from "react-country-flag";

function Map() {
	const [mapPosition, setMapPosition] = useState([40, -3.7]);
	const { cities } = useProvider();
	const [mapLat, mapLng] = useGeocoding();
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geolocationPosition) setMapPosition(geolocationPosition);
		},
		[geolocationPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your location"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => {
					const { lat, lng } = city.position;
					return (
						<Marker position={[lat, lng]} key={city.id}>
							<Popup>
								<span>
									<ReactCountryFlag
										countryCode={city.emoji}
										svg
									/>
								</span>
								<span>{city.cityName}</span>
							</Popup>
						</Marker>
					);
				})}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
