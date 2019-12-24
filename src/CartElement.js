import React, { Component } from 'react';

class CartElement extends Component {

	constructor(props) {
		super(props)
		this.state = {
            items: [],
			cart_id: '',
			item_id: '',
            quantity: '',
            actual_cart: '',
		};
	}

	syncChanges(property, value) {
		let state = {}
		if(property === "quantity") {
			state[property] = parseFloat(value);
		} else {
			state[property] = parseInt(value);
		}
		this.setState(state)
	}

	addCartElement = () => {
		let body = {
			'cart_id' : this.state.cart_id,
			'item_id' : this.state.item_id,
			'quantity' : this.state.quantity
		}
		fetch('http://localhost:8081/add_cart_element/', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		}).then(res=>res.json()).then(
			res => {}
		);
    }

    listItemsByCart = () => {
        let state = {}
        state['items'] = []
        this.setState(state)
        fetch('http://localhost:8081/list_items_by_cart/' + this.state.actual_cart, {
			method: 'get',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		}).then(res=>res.json()).then(
			res => {
				this.setState({
					items: res['items']
				})
			}
		);
    }
    
    renderTableHeader() {
		if(this.state.items) {
			if(this.state.items[0]) {
				let header = Object.keys(this.state.items[0])
				return header.map((key, index) => {
					return <th key={index}>{key.toUpperCase()}</th>
				})
			}
		}
	}

	renderTableData() {
		if(this.state.items) {
			return this.state.items.map((item, index) => {
				const { id, detail, price } = item
				return (
					<tr key={id}>
						<td>{id}</td>
						<td>{detail}</td>
						<td>{price}</td>
					</tr>
				)
			})
		}
	}

	render() {
		return (
			<div id="cart_element" class="content-section">
				<h2 class="title-section">Cart Elements</h2>
				<div class="insert-section">
					<input 
						type="text" 
						name="IdCart"
						placeholder="Cart Id"
						onChange = {(ev) => { this.syncChanges('cart_id', ev.target.value) }}
					/>
					<input 
						type="text" 
						name="IdItem"
						placeholder="Item Id"
						onChange = {(ev) => { this.syncChanges('item_id', ev.target.value) }}
					/>
					<input 
						type="text" 
						name="Quantity"
						placeholder="Quantity"
						onChange = {(ev) => { this.syncChanges('quantity', ev.target.value) }}
					/>
					<button type="submit" onClick={ this.addCartElement }>Add Cart Element</button>
                    <input
						type="text" 
						name="ActualCart"
						placeholder="Insert Cart Id"
						onChange = {(ev) => { this.syncChanges('actual_cart', ev.target.value) }}
					/>
                    <button type="button" onClick={ this.listItemsByCart }>List Items By Cart</button>
				</div>
				<table id="data-section">
                    <tr>{ this.renderTableHeader() }</tr>
					{ this.renderTableData() }
				</table>
			</div>
		);
	}
}

export default CartElement;