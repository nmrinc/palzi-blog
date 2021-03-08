import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';
import Posts from './Posts';
import Todos from './Todos';
import Save_todo from './Todos/Save_todo';

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="global_margin">
			<Route exact path="/" component={Users} />
			<Route exact path="/todos" component={Todos} />
			<Route exact path="/todos/save_todo" component={Save_todo} />
			<Route exact path="/todos/save_todo/:userId/:todoId" component={Save_todo} />
			<Route exact path="/posts/:key" component={Posts} />
		</div>
	</BrowserRouter>
);

export default App;
