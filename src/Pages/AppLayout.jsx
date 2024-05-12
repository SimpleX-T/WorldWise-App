import { useEffect } from "react";
import Map from "../Components/Map";
import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../Components/User";
import { useAuth } from "../Components/contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAuth();
	useEffect(
		function () {
			document.title = "App - WorldWise";

			if (!isAuthenticated || !user)
				navigate("/login", { replace: true });

			return () => {
				document.title = "WorldWise | Landing Page";
			};
		},
		[isAuthenticated, navigate, user]
	);

	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}
