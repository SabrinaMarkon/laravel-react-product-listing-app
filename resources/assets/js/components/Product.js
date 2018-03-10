import React, { Component } from 'react';

/* Stateless component otherwise known as a 'pure component'
{ product } syntax is the object destruction */

const Product = ({product}) => {

    const divStyle = {
      //  backgroundColor: '#f0f0f0'
    }

    /* return product doesn't exist if the props 'product' is null. */
    if (!product) {
        return(<div style={divStyle} className="card"><div className="card-body">  Product Doesnt exist </div></div>);
    }

    /* else we display the product data. */

    /* product is passed as a string to the Product component with JSON.stringify(product) in the Main component. Otherwise we get the error: "Uncaught Error: Objects are not valid as a React child onclick". Thus, we must change product back into an object here in order to display the item's values. */
    let productObject = JSON.parse(product);

    return(
        <div className="card">
            <div style={{ divStyle }} className="card-body">
                <h2>{ productObject.title }</h2>
                <p> { productObject.description }</p>
                <h3>Status: { productObject.availability ? 'Available' : 'Out of stock' }</h3>
                <h3>Price: { productObject.price }</h3>
            </div>        
        </div>
    );
};

export default Product;
