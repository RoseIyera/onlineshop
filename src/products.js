import React, { Component, Fragment } from 'react';
import Navheader from './Navheader';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cakes: [],
      cart: [],
    };
  }

  API_URL = "http://localhost:5106";

  componentDidMount() {
    this.refreshCakes();
  }

  refreshCakes = async () => {
    try {
      const response = await fetch(this.API_URL + "/api/Cake/GetCakes");
      const data = await response.json();
      this.setState({
        cakes: data,
      });
    } catch (error) {
      console.error('Error fetching cakes:', error);
    }
  };

  handleAddToCart = async (cakeId) => {
    try {
      const response = await fetch(this.API_URL + `/api/Cake/AddToCart/${cakeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Quantity: 1 }), // Adjust quantity as needed
      });
  
      if (response.ok) {
        const addedCake = await response.json();
  
        // Check the structure of addedCake and adjust accordingly
        if (addedCake && addedCake.Name && addedCake.Quantity && addedCake.Price) {
          // Use the callback form of setState to ensure correct state update
          this.setState(prevState => ({
            cart: [...prevState.cart, addedCake],
          }));
        } else {
          console.error('Invalid cake data returned from server:', addedCake);
        }
      } else {
        console.error('Failed to add cake to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding cake to cart:', error);
    }
  };
  
  

  handleCheckout = async () => {
    const { cart } = this.state;
  
    try {
      const response = await fetch(this.API_URL + '/api/Cake/CreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
        }),
      });
  
      if (response.ok) {
        this.setState({
          cart: [],
        });
  
        this.props.history.push('/orders');
      } else {
        console.error('Failed to create order:', response.statusText);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  

  calculateTotalCost = () => {
    const { cart } = this.state;
    return cart.reduce((total, cake) => total + cake.Price, 0);
  };

  render() {
    const { cakes, cart } = this.state;
    const totalCost = this.calculateTotalCost();

    return (
      <Fragment>
        <Navheader />
        <div>
          <h2>Product List</h2>
          <div className="cake-container">
            {cakes.map(cake => (
              <div key={cake.Id} className="cake-card">
                <h1 className="cake-title">{cake.Name}</h1>
                <p className="cake-description">{cake.Description}</p>
                <p className="cake-price">R{cake.Price}</p>
                <p className="cake-quantity">Quantity: {cake.Quantity}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => this.handleAddToCart(cake.Id)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div>
            <h2>Shopping Cart</h2>
            <div className="cake-container">
              {cart.map(cartItem => (
                <div key={cartItem.Id} className="cake-card">
                  <div>
                    <h1 className="cake-title">{cartItem.Name}</h1>
                    <p className="cake-price">Price: R{cartItem.Price}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>Total Cost: R{totalCost.toFixed(2)}</p>
            <button className="button" onClick={this.handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Products;
