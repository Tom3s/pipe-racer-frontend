import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Auth/LoginPage';
import { RegisterPage } from './Auth/RegisterPage';
import { Background } from './Elements/Background';
import { ProfilePage } from './User/ProfilePage';
import { Home } from './Home';
import { TrackList } from './Track/TrackList';
import { TrackPage } from './Track/TrackPage';
import { NavigationBar } from './Elements/NavigationBar';
import { ConfirmPage } from './User/ConfirmPage';
import { RankList } from './User/RankList';
import { refreshSessionDetails } from './Global/SessionManager';

// ($env:HTTPS = "true") -and (npm start)  

function App() {

	refreshSessionDetails();

	return (
		<BrowserRouter >
			<NavigationBar />
			<Routes>
				<Route path='/' element={<Navigate to="/home" />} />
				<Route path='/home' element={<Home />} /> 
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} /> 
				<Route path='/profile' element={<ProfilePage />} /> 
				<Route path='/tracks' element={<TrackList />} /> 
				<Route path='/track' element={<TrackPage />} />
				<Route path='/confirm' element={<ConfirmPage />} /> 
				<Route path='/ranks' element={<RankList />} />
			</Routes>
			<Background />
		</BrowserRouter>
	);
}

export default App;
