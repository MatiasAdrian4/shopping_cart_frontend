import React, { Component } from 'react';
import {render} from 'react-dom';
import './style.css'

import Cart from './Cart';

class App extends Component {
	constructor() {
		super();
		this.state = {
			name: 'React'
		};
	}

	render() {
		return (
			<div>
				<h1>Shopping Cart</h1>
				<Cart />
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'))