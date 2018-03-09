import React, { Component } from 'react';

/* Stateless component otherwise known as a 'pure component'
{ product } syntax is the object destruction */

const Product = ([{product}]) => {
    //product = JSON.parse(JSON.stringify(product));
    product = JSON.stringify(product); // or product = Object.keys(product);
    //console.log(product); // problem undefined!!! But product itself IS defined!
    const divStyle = {
        // style goes here
    }
    /* return product doesn't exist if the props 'product' is null. */
    if (!product) {
        return(<div style={divStyle}>  Product Doesnt exist </div>);
    }

    /* else we display the product data. */
    return(
        <div style={ divStyle }>
            <h2>{ product.title }</h2>
            <p> { product.description }</p>
            <h3>Status: { product.availability ? 'Available' : 'Out of stock' }</h3>
            <h3>Price: { product.price }</h3>
        </div>
    );
};

export default Product;
