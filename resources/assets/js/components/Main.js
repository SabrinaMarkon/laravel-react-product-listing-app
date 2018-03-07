import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Our Main Component */
class Main extends Component {
    constructor() {
        super();
        /* Initialize our state. */
        this.state = {
            products: [],
        }
    }
    /* After the component renders, call the lifecycle method ComponentDidMount. */
    componentDidMount() {
        /* JS fetch() API promise to get the data */
        fetch('/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                /* store fetched product in state. */
                this.setState({ products });
            });
    }
    /* maps a li to each product in the state. */
    renderProducts() {
        return this.state.products.map(product => {
            return (
                /* if we use a list we need a key attribute that is unique for each li */
                <li key={ product.id } >
                    { product.title }
                </li>
            );
        });
    }
    /* renders the component to show the list of products. */
    render() {
        return(
            <div>
                <h3>All Products</h3>
                <ul>
                    { this.renderProducts() }
                </ul>
            </div>
        );
    }
}

export default Main;

/* The 'if' is needed to make sure we render the component on pages that have a div with id 'root' */
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}