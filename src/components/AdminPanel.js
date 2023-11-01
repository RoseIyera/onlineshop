import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Navheader from '../Navheader';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
    const navigate = useNavigate();
    const [cakes, setCakes] = useState([]);
    const [cakeId, setCakeId] = useState('');
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
          const newCakeWithAutoId = {
            ...newCake,
            Id: generateUniqueId(),
          };

          const formData = new FormData();
          formData.append('Id', newCakeWithAutoId.Id); 
          formData.append('Name', newCakeWithAutoId.Name);
          formData.append('Description', newCakeWithAutoId.Description);
          formData.append('Picture', newCakeWithAutoId.Picture);
          formData.append('Quantity', newCakeWithAutoId.Quantity);
          formData.append('Price', newCakeWithAutoId.Price);
      
      
          await axios.post(`${API_URL}/api/Cake/AddCakes`, formData);
          refreshCakes();
          setNewCake({
            Id:'',
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

      const generateUniqueId = () => {
        const min = 9;
        const max = 999999; // You can adjust the maximum value as needed
        const numericId = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('Generated ID:', numericId);
        return numericId;
      };
      
  
      const handleUpdateCake = async (cakeId) => {
        try {
          // Use navigate to redirect to the update page with the cakeId
          // navigate(`/update-product/${cakeId}`);
          
          // Rest of your code for updating the cake
          const updatedCake = {
            name: prompt('Enter updated name:', newCake.Name),
            description: prompt('Enter updated description:', newCake.Description),
            price: prompt('Enter updated price:', newCake.Price),
            quantity: prompt('Enter updated quantity:', newCake.Quantity),
          };
      
          await axios.put(`${API_URL}/api/Cake/${cakeId}`, updatedCake);
          refreshCakes();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };
      



    const handleDeleteCake = async (cakeId) => {
      try {
        const response = await axios.delete(`${API_URL}/api/Cake/DeleteCake?id=${cakeId}`);
        
        if (response.status === 200) {
          console.log('Cake deleted successfully!');
          // Add any additional logic or state updates here
        } else {
          console.log('Cake not found with the given ID');
          // Handle error or update state accordingly
        }
      } catch (error) {
        console.error('Error:', error.response.data);
        // Handle error or update state accordingly
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
                  <button className="add-to-cart-button" onClick={() => handleUpdateCake(cake.Id)}>Update</button>
                  <button className="delete-button" onClick={() => handleDeleteCake(cake.Id)}>Delete</button>
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
