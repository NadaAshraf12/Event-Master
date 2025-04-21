import React from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());


    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();
    const maxId = events.length > 0 ? Math.max(...events.map(e => e.EventID)) : 0;
    const newId = maxId + 1;
   

    const formattedProduct = {
      EventID: newId, 
      OrganizerID: product.OrganizerID,
      Title: product.Title,
      Description: product.Description,
      Venue: product.Venue,
      EventDate: product.EventDate,
      TicketPrice: product.TicketPrice,
      TicketsLeft: product.TicketsLeft,
      ParticipantsCount: product.ParticipantsCount,
      IDT: product.IDT,
      Status: product.Status
    };

    
    if (!formattedProduct.OrganizerID || !formattedProduct.Title || !formattedProduct.Description || !formattedProduct.Venue || !formattedProduct.EventDate || !formattedProduct.TicketPrice || !formattedProduct.TicketsLeft || !formattedProduct.ParticipantsCount || !formattedProduct.IDT || !formattedProduct.Status ) {
      alert("Please fill out all the fields!");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProduct),  
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
              <label className='col-sm-4 col-form-label'>OrganizerID</label>
              <div className='col-sm-8'>
                <input className='form-control' name='OrganizerID' type='number' />
              </div>
            </div>
            

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Title</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Title' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Description</label>
              <div className='col-sm-8'>
                <textarea className='form-control' name='Description' rows="3"></textarea>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Venue</label>
              <div className='col-sm-8'>
              <input className='form-control' name='Venue' type='text' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>EventDate</label>
              <div className='col-sm-8'>
                <input className='form-control' name='EventDate' type='date' />
              </div>
            </div>


            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>TicketPrice</label>
              <div className='col-sm-8'>
                <input className='form-control' name='TicketPrice' type='number' step="0.01" min="1" />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>TicketsLeft</label>
              <div className='col-sm-8'>
                <input className='form-control' name='TicketsLeft' type='number' />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>ParticipantsCount</label>
              <div className='col-sm-8'>
                <input className='form-control' name='ParticipantsCount' type='number' min='1'/>

              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>IDT</label>
              <div className='col-sm-8'>
                <input className='form-control' name='IDT' type='number'/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Status</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Status' type='text' defaultValue='Pending'/>
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