import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [eventData, setEventData] = useState({
    Name: '',
    Description: '',
    Date: '',
    Time: '',
    Price: ''
  });
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        console.error("ID is missing or invalid");
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/events/` + id);
        if (!res.ok) {
          throw new Error(`Failed to fetch event with ID: ${id}. Status: ${res.status}`);
        }
        const data = await res.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event:', error.message);
        alert('Event not found or an error occurred.');
      }
      
    };

    fetchEvent();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedEvent = Object.fromEntries(formData.entries());

    // Validate form fields
    if (!updatedEvent.Name || !updatedEvent.Description || !updatedEvent.Date || !updatedEvent.Time || !updatedEvent.Price) {
      alert("Please fill out all the fields!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/events/` + id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,  
          Name: updatedEvent.Name,
          Description: updatedEvent.Description,
          Date: updatedEvent.Date,
          Time: updatedEvent.Time,
          Price: updatedEvent.Price
        }),
      });

      if (response.ok) {
        navigate("/EventList");
      } else {
        alert("Unable to update the event");
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
          <h2 className='text-center mb-5'>Update Event</h2>

          <form onSubmit={handleSubmit}>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Name</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Name' value={eventData.Name} onChange={(e) => setEventData({ ...eventData, Name: e.target.value })} />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Description</label>
              <div className='col-sm-8'>
                <textarea className='form-control' name='Description' rows="3" value={eventData.Description} onChange={(e) => setEventData({ ...eventData, Description: e.target.value })}></textarea>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Date</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Date' type='date' value={eventData.Date} onChange={(e) => setEventData({ ...eventData, Date: e.target.value })} />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Time</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Time' type='time' value={eventData.Time} onChange={(e) => setEventData({ ...eventData, Time: e.target.value })} />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Price</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Price' type='number' step="0.01" min="1" value={eventData.Price} onChange={(e) => setEventData({ ...eventData, Price: e.target.value })} />
              </div>
            </div>

            <div className='row'>
              <div className='offset-sm-4 col-sm-4 d-grid'>
                <button type='submit' className='btn btn-primary me-3'>Update</button>
                <button type='button' className='btn btn-success ms-3' onClick={() => navigate('/EventList')}>Cancel</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
