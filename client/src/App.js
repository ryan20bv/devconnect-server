import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
	return (
		<React.Fragment>
			<Navbar />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</React.Fragment>
	);
};

export default App;
