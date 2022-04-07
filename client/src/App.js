import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store/store";
// state
import Alert from "./components/layout/alert.jsx";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<React.Fragment>
					<Navbar />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</React.Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
