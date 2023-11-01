import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Navheader from '../Navheader';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { cakeId } = useParams();
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
  
      
  
    const handleUpdateCake = async (cakeId) => {
      try {
        console.log('Updating cake with ID:', cakeId);
    
        const updatedCake = {
          name: prompt('Enter updated name:', newCake.Name),
          description: prompt('Enter updated description:', newCake.Description),
          price: parseFloat(prompt('Enter updated price:', newCake.Price)),
          quantity: parseInt(prompt('Enter updated quantity:', newCake.Quantity)),
          picture: 'N/A',
        };
        
    
        await axios.put(`${API_URL}/api/Cake/${cakeId}`, updatedCake);
        refreshCakes();
      } catch (error) {
        console.error('Error updating product:', error);
      } finally {
        setSelectedCakeId(null);
      }
    };
    
    



   

    return (
      <Fragment>
        <Navheader />
        <div>
          <h2>Detail Page</h2>
  
          {/* Update Product Form */}
          {selectedCakeId && (
            <div>
              <h3>Update Product</h3>
              <label>Name:</label>
              <input
                className="form-input"
                type="text"
                value={newCake.Name}
                onChange={(e) => setNewCake({ ...newCake, Name: e.target.value })}
              />
              <label>Description:</label>
              <input
                className="form-input text-area"
                type="text"
                value={newCake.Description}
                onChange={(e) => setNewCake({ ...newCake, Description: e.target.value })}
              />
              <label>Price:</label>
              <input
                className="form-input"
                type="text"
                value={newCake.Price}
                onChange={(e) => setNewCake({ ...newCake, Price: e.target.value })}
              />
              <label>Quantity:</label>
              <input
                className="form-input"
                type="text"
                value={newCake.Quantity}
                onChange={(e) => setNewCake({ ...newCake, Quantity: e.target.value })}
              />
              <button onClick={handleUpdateCake}>Update Product</button>
            </div>
          )}
        </div>
      </Fragment>
  );
};

export default UpdateProduct;
