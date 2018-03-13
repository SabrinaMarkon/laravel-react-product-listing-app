import React, { Component } from 'react';

/* AddProduct child component for adding a new product/item to the database */

class AddProduct extends Component {
    constructor(props) {
        super(props);
        /* Initialize the state. This component's state holds the form data */
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }
        /* Bind methods with 'this' */
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* Dynamically store inputs in the state.
        'key' is the property of the object that is being edited ie. 'title', 'description', 'price', or 'availability' and calling the handleInput method.
    */
    handleInput(key, e) {
        /* Duplicate then update the state.
            Object.assign in ES6 copies teh values from one or more source objects to a target object. The target object is the first parameter, and below, it is a new empty object. The next parameter is where newProduct is placed into that new empty object.
            state[key] is like state['title'] etc.
        */
        let state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({
            newProduct: state
        });
    }

    /* User submitted the form */
    handleSubmit(e) {
        e.preventDefault(); // we don't want the page to reload.
    
        /* Callback to the onAdd props with the current state passed as a parameter. In Main.js this will be set by the handleAddProduct method. This is how we communicate with the parent component! */
        this.props.onAdd(this.state.newProduct);
    }

    render() {
        const divStyle = {
            backgroundColor: '#f7f7f7'
        }
        return(
            <div>
                <h2>Add a new product</h2>
                <div style={divStyle}>
                {/* when the submit button is clicked by the user, the control is passed to the handleSubmit method above, which also prevents the default page reload. */}
                <form onSubmit={this.handleSubmit}>
                    <label>Title:
                        {/* On every keystroke that changes an input field, the handleInput method is invoked. */}
                        <input type="text" onChange={(e) => this.handleInput('title', e)} />
                    </label>
                    <label>Description:
                        <input type="text" onChange={(e) => this.handleInput('description', e)} />
                    </label>
                    <label>Price:
                        <input type="number" min="0.00" step="any"  value="0.00" onChange={(e) => this.handleInput('price', e)} />
                    </label>
                    <label>Availability:
                        <input type="text" onChange={(e) => this.handleInput('availability', e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </div>
            </div>
        );
    }
}

/*
The component basically renders an input form, and all the input values are stored in the state (this.state.newProduct). 

Then, on form submission, handleSubmit() method gets invoked. 

***But AddProduct needs to communicate the information back to the parent, and we do this using a callback.*** This is why we need callbacks!
*/

export default AddProduct;