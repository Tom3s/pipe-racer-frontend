import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Auth/LoginPage';
import { RegisterPage } from './Auth/RegisterPage';
import { Background } from './Elements/Background';

function App() {
	return (
		<BrowserRouter >
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} /> 
			</Routes>
			<Background />
		</BrowserRouter>
	);
}

export default App;
