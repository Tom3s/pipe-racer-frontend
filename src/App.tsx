import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Auth/LoginPage';
import { RegisterPage } from './Auth/RegisterPage';
import { Background } from './Elements/Background';
import { ProfilePage } from './User/ProfilePage';
import { Home } from './Home';

function App() {
	return (
		<BrowserRouter >
			<Routes>
				<Route path='/' element={<Navigate to="/home" />} />
				<Route path='/home' element={<Home />} /> 
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} /> 
				<Route path='/profile' element={<ProfilePage />} /> 
			</Routes>
			<Background />
		</BrowserRouter>
	);
}

export default App;
