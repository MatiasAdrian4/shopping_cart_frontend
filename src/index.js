import React, { Component } from 'react';
import {render} from 'react-dom';
import './style.css'

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
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'))