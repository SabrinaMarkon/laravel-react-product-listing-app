import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';

/* Our Main Component */
class Main extends Component {
    constructor() {
        super();
        /* Initialize our state. */
        this.state = {
            products: [],
            currentProduct: null
        }
        this.renderProducts = this.renderProducts.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            })
            .catch(error => {
                throw(error);
            });
    }
    /* maps a li to each product in the state. */
    renderProducts() {
        return this.state.products.map(product => {
            return (
                /* if we use a list we need a key attribute that is unique for each li */
                <li style={{color: 'red'}} key={ product.id } onClick={ () => this.handleClick(JSON.stringify(product)) }>
                    { product.title }
                </li>
            );
        });
    }
    /* if a product title is clicked. */
    handleClick(product) {
        this.setState({
            currentProduct: product
        });
    }
    /* renders the component to show the list of products. */
    render() {
        return(
            <div>
                <div>
                    <h3>All Products</h3>
                    <ul>
                        { this.renderProducts() }
                    </ul>
                </div>
                <div>{ this.state.currentProduct }</div>
                <Product product={ this.state.currentProduct } />
            </div>
        );
    }
}

export default Main;

/* The 'if' is needed to make sure we render the component on pages that have a div with id 'root' */
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}