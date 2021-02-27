import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import reducers from './reducers';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const store = createStore(
	reducers, //@o Reducers
	{}, //@o Initial state
	applyMiddleware(reduxThunk) //@o Middle wares and Thunk
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
