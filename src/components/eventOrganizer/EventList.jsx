import { Link } from 'react-router-dom';
import '../eventOrganizer/EventList.css';
import React, { useState, useEffect } from 'react';

export const EventList = () => {
  const [products, setProducts] = useState([]);

  function getProducts() {
    fetch("http://localhost:3000/events")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => a.id - b.id); 
        setProducts(sortedData);
      })
      .catch(error => {
        alert("Unable to get the events");
      });
  }

  useEffect(getProducts, [])

  function deleteProduct(id){
    fetch(`http://localhost:3000/events/` + id,{
       method: "DELETE"
    })
    .then(response=>{
      if(!response.ok){
        throw new Error()
      }
      getProducts()
    })
    .catch(error=>{
      alert("unable to delete the product")
    })
    }
    


  return (
    <div className='container my-4 list'>
      <h2 className='text-center mb-4'> Events </h2>
      <div className='row mb-3'>
        <div className='col'>
          <Link className='btn btn-primary me-2' to='/eventOrganizer/crud/Create' role='button'>
            Create Event
          </Link>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.Name}</td>
              <td>{product.Description}</td>
              <td>{product.Date}</td>
              <td>{product.Time}</td>
              <td>{product.Price}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
              <Link className='btn btn-primary btn-sm me-1' to={`/eventOrganizer/crud/Update/${product.id}`}>
  Update
</Link>

                <button type='button' className='btn btn-danger btn-sm'
                onClick={()=>deleteProduct(product.id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


