/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/contexts/FakeAuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate("/login");
		},
		[isAuthenticated, navigate]
	);
	return isAuthenticated ? children : null;
}
