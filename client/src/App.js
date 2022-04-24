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
const CreateProfile = React.lazy(() =>
	import("./components/profile-form/CreateProfile.jsx")
);
const EditProfile = React.lazy(() =>
	import("./components/profile-form/EditProfile.jsx")
);
const AddExperience = React.lazy(() =>
	import("./components/profile-form/addExperience.jsx")
);
const AddEducation = React.lazy(() =>
	import("./components/profile-form/addEducation.jsx")
);
const Profiles = React.lazy(() =>
	import("./components/dashboard/Profiles.jsx")
);
const DevProfile = React.lazy(() =>
	import("./components/dashboard/DevProfile.jsx")
);
const Posts = React.lazy(() => import("./components/dashboard/Posts.jsx"));
const Post = React.lazy(() =>
	import("./components/dashboard/postsPage/Post.jsx")
);

const MyPost = React.lazy(() =>
	import("./components/dashboard/postsPage/MyPost.jsx")
);

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
						<Route
							path='/profiles'
							element={
								<React.Suspense fallback={<>...</>}>
									<Profiles />
								</React.Suspense>
							}
						/>
						<Route
							path='/devprofile/:userId'
							element={
								<React.Suspense fallback={<>...</>}>
									<DevProfile />
								</React.Suspense>
							}
						/>
						<Route
							path='/create-profile'
							element={
								<React.Suspense fallback={<>...</>}>
									<CreateProfile />
								</React.Suspense>
							}
						/>
						<Route
							path='/edit-profile'
							element={
								<React.Suspense fallback={<>...</>}>
									<EditProfile />
								</React.Suspense>
							}
						/>
						<Route
							path='/add-experience'
							element={
								<React.Suspense fallback={<>...</>}>
									<AddExperience />
								</React.Suspense>
							}
						/>
						<Route
							path='/add-education'
							element={
								<React.Suspense fallback={<>...</>}>
									<AddEducation />
								</React.Suspense>
							}
						/>
						<Route
							path='/posts'
							element={
								<React.Suspense fallback={<>...</>}>
									<Posts />
								</React.Suspense>
							}
						/>
						<Route
							path='/post/:postId'
							element={
								<React.Suspense fallback={<>...</>}>
									<Post />
								</React.Suspense>
							}
						/>
						<Route
							path='/mypost'
							element={
								<React.Suspense fallback={<>...</>}>
									<MyPost />
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
