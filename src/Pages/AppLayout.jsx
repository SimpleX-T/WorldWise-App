import { useEffect } from "react";
import Map from "../Components/Map";
import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
	useEffect(function () {
		document.title = "App - WorldWise";
		return () => {
			document.title = "WorldWise | Landing Page";
		};
	}, []);

	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			{/* <User /> */}
		</div>
	);
}
