import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Dashboard from "./components/layout/dashboard";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store/store";
// state
import authToken from "./utilities/authToken";
import { loadUserAction } from "./redux/actions/authAction";
// import PrivateRoute from "./components/routing/privateRoute";

const Register = React.lazy(() => import("./components/auth/Register"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"));

if (localStorage.token) {
	authToken(localStorage);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUserAction());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<React.Fragment>
					<Navbar />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route
							path='/register'
							element={
								<React.Suspense fallback={<>...</>}>
									<Register />
								</React.Suspense>
							}
						/>
						<Route
							path='/login'
							element={
								<React.Suspense fallback={<>...</>}>
									<Login />
								</React.Suspense>
							}
						/>
						<Route
							path='/dashboard'
							element={
								<React.Suspense fallback={<>...</>}>
									<Dashboard />
								</React.Suspense>
							}
						/>
					</Routes>
				</React.Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
