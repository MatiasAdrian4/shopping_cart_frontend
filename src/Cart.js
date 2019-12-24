import React, { Component } from 'react';

class Cart extends Component {

	constructor(props) {
		super(props)

		this.state = {
			carts: [],
			id: '',
		};
	}

	componentDidMount() {
		fetch('http://localhost:8081/list_carts/', {
			method: 'get',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		}).then(res=>res.json()).then(
			res => {
				this.setState({
					carts: res['carts']
				})
			}
		);
	}

	syncChanges(property, value) {
		let state = {}
		state[property] = parseInt(value);
		this.setState(state)
	}

	addCart = () => {
		let body = {
			'id' : this.state.id
		}
		fetch('http://localhost:8081/add_cart/', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		}).then(res=>res.json()).then(
			res => {
				let state = {}
				let carts = this.state.carts
				if (!carts) {
					carts = []
				}
				carts.push(body)
				state['carts'] = carts
				this.setState(state)
			}
		);
	}

	renderTableHeader() {
		if(this.state.carts) {
			if(this.state.carts[0]) {
				let header = Object.keys(this.state.carts[0])
				return header.map((key, index) => {
					return <th key={index}>{key.toUpperCase()}</th>
				})
			}
		}
	}

	renderTableData() {
		if(this.state.carts) {
			return this.state.carts.map((cart, index) => {
				const { id } = cart
				return (
					<tr key={id}>
						<td>{id}</td>
					</tr>
				)
			})
		}
	}

	render() {
		return (
			<div id="cart" class="content-section">
				<h2 class="title-section">Carts</h2>
				<div class="insert-section">
					<input 
						type="text" 
						name="idCart"
						placeholder="Id"
						onChange = {(ev) => { this.syncChanges('id', ev.target.value) }}
					/>
					<button type="submit" onClick={ this.addCart }>Add Cart</button>
				</div>
				<table id="data-section">
					<tbody>
						<tr>{ this.renderTableHeader() }</tr>
						{ this.renderTableData() }
					</tbody>
				</table>
			</div>
		);
	}
}

export default Cart;