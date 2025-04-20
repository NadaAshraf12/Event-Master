import React from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Fetch the events to get the current max id
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();
    const maxId = events.length > 0 ? Math.max(...events.map(e => e.id)) : 0;
    const newId = maxId + 1;

    const formattedProduct = {
      id: newId,  // Added this to ensure each new event gets a unique id
      Name: product.name,
      Description: product.description,
      Date: product.date,
      Time: product.time,
      Price: product.price
    };

    // Check if all fields are filled
    if (!formattedProduct.Name || !formattedProduct.Description || !formattedProduct.Date || !formattedProduct.Time || !formattedProduct.Price) {
      alert("Please fill out all the fields!");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProduct),  // Send JSON data
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/EventList");
      } else {
        alert("Unable to create the event");
      }
    } catch (error) {
      console.error('Error details:', error);
      alert("Unable to connect to the server. Please check your network or the server status.");
    }
  }

  return (
    <div className='container my-4'>
      <div className='row'>
        <div className='col-md-8 mx-auto rounded border p-4'>
          <h2 className='text-center mb-5'>Create Event</h2>

          <form onSubmit={handleSubmit}>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Name</label>
              <div className='col-sm-8'>
                <input className='form-control' name='name' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Description</label>
              <div className='col-sm-8'>
                <textarea className='form-control' name='description' rows="3"></textarea>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Date</label>
              <div className='col-sm-8'>
                <input className='form-control' name='date' type='date' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Time</label>
              <div className='col-sm-8'>
                <input className='form-control' name='time' type='time' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Price</label>
              <div className='col-sm-8'>
                <input className='form-control' name='price' type='number' step="0.01" min="1" />
              </div>
            </div>

            <div className='row'>
              <div className='offset-sm-4 col-sm-4 d-grid'>
                <button type='submit' className='btn btn-primary me-3'>Submit</button>
                <a className='btn btn-success ms-3' href='/EventList'>Cancel</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
