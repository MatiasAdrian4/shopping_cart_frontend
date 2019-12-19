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
				<h1 id="title">Shopping Cart</h1>
				<div id="general-section">
					<Cart />
				</div>
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'))