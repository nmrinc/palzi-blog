import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import Users from './Users';
import Posts from './Posts';

library.add(faEye);

const Tasks = () => <div>Tasks</div>;

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="global_margin">
			<Route exact path="/" component={Users} />
			<Route exact path="/tasks" component={Tasks} />
			<Route exact path="/posts/:key" component={Posts} />
		</div>
	</BrowserRouter>
);

export default App;
