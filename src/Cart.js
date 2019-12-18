import React, { Component } from 'react';

class Cart extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id: '',
		};
	}

	syncChanges(property, value) {
		let state = {}
		state[property] = parseInt(value);
		this.setState(state)
	}

	addCart = () => {
		fetch('http://localhost:8081/add_cart/', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		}).then(res=>res.json()).then(res => console.log(res));
	}

	render() {
		return (
			<div>
				<h2>Carts</h2>
				<input 
					type="text" 
					name="idCart"
					onChange = {(ev) => { this.syncChanges('id', ev.target.value) }}
				/>
				<button type="submit" onClick={ this.addCart }>Añadir Carro</button>
			</div>
		);
	}
}

export default Cart;