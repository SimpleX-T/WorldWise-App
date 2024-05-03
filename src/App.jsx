// import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ContextProvider } from "./Components/contexts/ContextProvider";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import NotFoundPage from "./Pages/NotFoundPage";
import Login from "./Pages/Login";
import AppLayout from "./Pages/AppLayout";
import Form from "./Components/Form";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";

export default function App() {
	return (
		<ContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='product' element={<Product />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='/app' element={<AppLayout />}>
						<Route
							index
							element={<Navigate replace to='cities' />}
						/>
						<Route path='cities' element={<CityList />} />
						<Route path='cities/:id' element={<City />} />
						<Route path='countries' element={<CountryList />} />
						<Route path='form' element={<Form />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFoundPage />} />
					<Route index element={<Homepage />} />
				</Routes>
			</BrowserRouter>
		</ContextProvider>
	);
}
