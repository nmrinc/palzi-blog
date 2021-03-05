import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';
import Posts from './Posts';
import Todos from './Todos';

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="global_margin">
			<Route exact path="/" component={Users} />
			<Route exact path="/todos" component={Todos} />
			<Route exact path="/posts/:key" component={Posts} />
		</div>
	</BrowserRouter>
);

export default App;
