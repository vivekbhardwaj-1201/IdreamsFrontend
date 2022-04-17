import React, { useEffect, useState } from "react";
import { adminApi } from "./utils/admin.api";
import { notesApi } from "./utils/notes.api";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/common/actions/Preloaders/Preloader";

import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import MainHeader from "./components/common/Layout/Header/MainHeader/MainHeader";
import Register from "./components/pages/register/Register";
// import Profile from "./components/pages/profile/Profile";
// import NotesList from "./components/pages/notes/NotesList";

import Toast from "./components/common/actions/Toast/Toast";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);

	const notesHandler = async (title, description) => {
		console.log(loading);
		notesApi.createNote({ userId: localStorage.getItem("userId"), title, description })
			.then((res) => {
				console.log(res);
				if (res.data.isSuccess) {
					console.log(res.data.message);
					toast.success(res.data.message);
					setLoading(false);
					console.log(loading);
				} else {
					console.log("Something went wrong");
					console.log(res.data.message);
					toast.error(res.data.message);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
			});
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = async (email, password) => {
		try {
			const res = await adminApi.login({ email, password });
			if (res.data.isSuccess) {
				setIsLoggedIn(true);
				console.log(res);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("userId",res.data.Data);
				toast.success("Logged in Successfully");
				setLoading(false);
			} else {
				console.log(res.data.message);
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const registerHandler = async (userData) => {
		try {
			const res = await adminApi.register(userData);
			console.log(res);
			if (res.data.isSuccess) {
				toast.success(res.data.message);
				setLoading(false);
			} else {
				console.log(res.data.message);
				toast.error(res.data.message);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const logoutHandler = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		toast.success("Logged out Successfully");
	};

	return (
		<>
			<Toast />
			<Router>
				<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
				<main>
					<Preloader customLoading = {loading}/>
					<Routes>
						 <Route path="/register" element={!isLoggedIn ? <Register onRegister={registerHandler} /> : <Navigate to="/" />} />
						{/*<Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
						<Route path="/notes" element={isLoggedIn ? <NotesList /> : <Navigate to="/" />} /> */}
						<Route path="/" element={isLoggedIn ? <Home onAddNote={notesHandler} /> : <Login onLogin={loginHandler} />} exact />
					</Routes>
				</main>
			</Router>
		</>
	);
}

export default App;
