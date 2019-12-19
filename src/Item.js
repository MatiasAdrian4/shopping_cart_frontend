import React, { Component } from 'react';

class Item extends Component {

	constructor(props) {
		super(props)
		this.state = {
			items: [],
			id: '',
			detail: '',
			price: '',
		};
	}

	componentDidMount() {
		fetch('http://localhost:8081/list_items/', {
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

	syncChanges(property, value) {
		let state = {}
		if(property === "id") {
			state[property] = parseInt(value);
		} else if(property === "price"){
			state[property] = parseFloat(value);
		} else {
			state[property] = value;
		}
		this.setState(state)
	}

	addItem = () => {
		let body = {
			'id' : this.state.id,
			'detail' : this.state.detail,
			'price' : this.state.price
		}
		fetch('http://localhost:8081/add_item/', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		}).then(res=>res.json()).then(
			res => {
				let state = {}
				let items = this.state.items
				if (!items) {
					items = []
				}
				items.push(body)
				state['items'] = items
				this.setState(state)
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
			<div id="item" class="content-section">
				<h2 class="title-section">Items</h2>
				<div class="insert-section">
					<input 
						type="text" 
						name="idItem"
						placeholder="Id"
						onChange = {(ev) => { this.syncChanges('id', ev.target.value) }}
					/>
					<input 
						type="text" 
						name="detailItem"
						placeholder="Detail"
						onChange = {(ev) => { this.syncChanges('detail', ev.target.value) }}
					/>
					<input 
						type="text" 
						name="priceItem"
						placeholder="Price"
						onChange = {(ev) => { this.syncChanges('price', ev.target.value) }}
					/>
					<button type="submit" onClick={ this.addItem }>Añadir Item</button>
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

export default Item;