import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';

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
        this.handleAddProduct = this.handleAddProduct.bind(this);
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
                /* If some cataclysm happens. */
                throw(error);
            });
    }
    /* maps a li to each product in the state. */
    renderProducts() {
        return this.state.products.map(product => {
            return (
                /* if we use a list we need a key attribute that is unique for each li. Also, change the product object to a string so it can be sent to the child component, Product (otherwise we get error and clicking doesn't work. */
                <li style={{listStyleType: 'none'}} key={ product.id } onClick={ () => this.handleClick(JSON.stringify(product)) }>
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

    /* if we submitted the form to add a new product, it is added with this method. In the props for the AddProduct component, handleAddProduct is called onAdd. */
    handleAddProduct(product) {
        /* New product object with four properties, 'title', 'description', 'price', 'availability' */
        //console.log(product);
        product.price = Number(product.price); // make sure price is a number (again - I used a type="number" field anyway)

        /* JS fetch() API promise to post the data */
        fetch('products/', {
            method: 'post',
            /* we need to send headers */
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            /* update the state of the products array and the currentProduct state */
            this.setState(prevState => ({
                products: prevState.products.concat(data),
                currentProduct: data
            }));
        })
        .catch(error => {
            /* If some nightmare happens. */
            throw error;
        })
    }

    /* renders the component to show the list of products. */
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <h3>All Products</h3>
                    </div>           
                </div>
                <div className="row">
                    <div className="col-lg card mb-3 border-secondary">
                        <ul className="card-body">
                            { this.renderProducts() }
                        </ul>
                    </div>
                    <div className="col-lg">
                        <Product product={ this.state.currentProduct } />
                        <br />
                        <AddProduct onAdd={this.handleAddProduct} />
                    </div>       
                </div>
            </div>
        );
    }
}

export default Main;

/* The 'if' is needed to make sure we render the component on pages that have a div with id 'root' */
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}