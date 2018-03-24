import React, { Component } from 'react';

/* Stateless component otherwise known as a 'pure component'
{ product } syntax is the object destruction */

const Product = (props) => {

    const divStyle = {
      backgroundColor: '#f7f7f7'
    }

    /* return product doesn't exist if the props 'product' is null. */
    if (!props.product) {
        return(<div style={divStyle} className="card mb-3 border-secondary"><div className="card-body">  Product doesn't exist </div></div>);
    }

    /* else we display the product data. */

    /* product is passed as a string to the Product component with JSON.stringify(product) in the Main component. Otherwise we get the error: "Uncaught Error: Objects are not valid as a React child onclick". Thus, we must change product back into an object here in order to display the item's values. */

    //console.log(typeof props.product);

    let productObject = JSON.parse(props.product);

    //console.log(JSON.parse(props.product));

    return(
        <div style={{ divStyle }} className="card mb-3 border-secondary">
            {props.editform === true ? <input type="text" size="50" maxLength="50" defaultValue={productObject.title} onChange={(e) => props.onInputChange(productObject.id, 'title', e)} /> : 
            <h2 className="card-header bg-light border-secondary">{ productObject.title }</h2>}
            <div className="card-body">
                {props.editform === true ? <textarea rows="5" cols="60"  wrap="hard" defaultValue={productObject.description} onChange={(e) => props.onInputChange(productObject.id, 'description', e)}></textarea> : 
                <p> { productObject.description } with ID {productObject.id}</p>
                }
                <h3>Status: { productObject.availability ? 'Available' : 'Out of stock' }</h3>
                <h3>Price: { productObject.price }</h3>
                <button onClick={() => props.onDelete(productObject.id)}>Delete</button>
                <button onClick={() => props.onEdit(productObject.id)}>Edit</button>
                <button onClick={() => props.onUpdate(productObject)}>Update</button>
            </div>        
        </div>
    );
};

export default Product;
