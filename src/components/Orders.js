import React, { Component, Fragment } from 'react';
import Navheader from '../Navheader';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cakes: [],
      cart: [],
      orders: [],  
    };
  }

  API_URL = "http://localhost:5106"; 

  componentDidMount() {
    this.refreshCakes();
    this.refreshOrders();
  }

  refreshOrders = async () => {
    try {
      const response = await fetch(this.API_URL + "/api/Order/GetOrders");
      const data = await response.json();
      this.setState({
        orders: data,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  calculateTotalCost = () => {
    const { cart } = this.state;
    return cart.reduce((total, cake) => total + cake.Price, 0);
  };

  render() {
    const { orders } = this.state;

    return (
      <Fragment>
        <Navheader />

        <div>
          <h2>My Orders</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.Id}>
                  <td>{order.Id}</td>
                  <td>{order.OrderDate}</td>
                  <td>{order.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default Orders;
