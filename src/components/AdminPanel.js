import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Navheader from '../Navheader';

const AdminPanel = () => {
    const [cakes, setCakes] = useState([]);
    const [newCake, setNewCake] = useState({
        Id: '',  
        Name: '',
        Description: '',
        Price: '',
        Quantity: '',
      });
      
    const [selectedCakeId, setSelectedCakeId] = useState(null);
    const API_URL = "http://localhost:5106";
  
    useEffect(() => {
      refreshCakes();
    }, []);
  
    const refreshCakes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Cake/GetCakes`);
        const data = await response.json();
        setCakes(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const handleCreateCake = async () => {
        try {
          const formData = new FormData();
          formData.append('Id', newCake.Id); 
          formData.append('Name', newCake.Name);
          formData.append('Description', newCake.Description);
          formData.append('Picture', newCake.Picture);
          formData.append('Quantity', newCake.Quantity);
          formData.append('Price', newCake.Price);
      
      
          await axios.post(`${API_URL}/api/Cake/AddCakes`, formData);
          refreshCakes();
          setNewCake({
            Id: '',
            Name: '',
            Description: '',
            Picture: '',
            Quantity: '',
            Price: '',
          });
        } catch (error) {
          console.error('Error creating product:', error);
        }
      };
      
  
    const handleUpdateCake = async () => {
      try {
        const updatedCake = {
          Name: prompt('Enter updated name:', newCake.Name),
          Description: prompt('Enter updated description:', newCake.Description),
          Price: prompt('Enter updated price:', newCake.Price),
          Quantity: prompt('Enter updated quantity:', newCake.Quantity),
        };
  
        await axios.put(`${API_URL}/api/Cake/UpdateCake/${selectedCakeId}`, updatedCake);
        refreshCakes();
      } catch (error) {
        console.error('Error updating product:', error);
      } finally {
        setSelectedCakeId(null);
      }
    };



const handleDeleteCake = async (cakeId) => {
  try {
    console.log('Deleting cake with ID:', cakeId);
    await axios.delete(`${API_URL}/api/Cake/${cakeId}`);
    console.log('Cake deleted successfully');
    refreshCakes();
  } catch (error) {
    console.error('Error deleting cake:', error);
  }
};

  return (
    <Fragment>
      <Navheader />
      <div>
        <h2>Vendor Page</h2>

        {/* Create Product Form */}
<div className="form-container">
  <h3>Create New Product</h3>
  <label>Name:</label>
  <input className="form-input"
    type="text"
    value={newCake.Name}
    onChange={(e) => setNewCake({ ...newCake, Name: e.target.value })}
  />
  <label>Description:</label>
  <input className="form-input text-area"
    type="text"
    value={newCake.Description}
    onChange={(e) => setNewCake({ ...newCake, Description: e.target.value })}
  />
  <label>Price:</label>
  <input className="form-input"
    type="text"
    value={newCake.Price}
    onChange={(e) => setNewCake({ ...newCake, Price: e.target.value })}
  />
  <label>Quantity:</label>
  <input className="form-input"
    type="text"
    value={newCake.Quantity}
    onChange={(e) => setNewCake({ ...newCake, Quantity: e.target.value })}
  />
  <button className="button" onClick={handleCreateCake}>Create Product</button>
</div>


        {/* Update Product Form */}
        {selectedCakeId && (
          <div>
            <h3>Update Product</h3>
            <button onClick={handleUpdateCake}>Update Product</button>
          </div>
        )}

        {/* Product List */}
        <div>
          <h3>Product List</h3>
          <div className="cake-container">
            {cakes.map(cake => (
              <div key={cake.id} className="cake-card">
                <div>
                  <h1>{cake.Name}</h1>
                  <p>{cake.Description}</p>
                  <p>Price: {cake.Price}</p>
                  <p>Quantity: {cake.Quantity}</p>
                  <button className="add-to-cart-button" onClick={() => setSelectedCakeId(cake.id)}>Update</button>
                  <button className="delete-button"  onClick={() => handleDeleteCake(cake.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminPanel;
