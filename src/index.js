import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import './index.css';
import App from './App';
import Vote from './components/vote';
import Poll from './components/poll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	  <Provider store={store}>
	  	<Router>
	  		<Routes>
	  			<Route path="/" element={<App/>}/>
	  			<Route path="vote" element={<Vote/>}/>
	  			<Route path="poll" element={<Poll/>}/>
	  		</Routes>
	  	</Router>
	  </Provider>
  </React.StrictMode>
);