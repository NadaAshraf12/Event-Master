import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const Update = () => {
  const [eventData, setEventData] = useState({
    OrganizerID: '',
    Title: '',
    Description: '',
    Venue: '',
    EventDate: '',
    TicketPrice: '',
    TicketsLeft: '',
    ParticipantsCount: '',
    IDT: '',
    Status: '',
  });
  const { EventID } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!EventID) {
        console.error("EventID is missing or invalid");
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/events/` + EventID);
        if (!res.ok) {
          throw new Error(`Failed to fetch event with ID: ${EventID}. Status: ${res.status}`);
        }
        const data = await res.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event:', error.message);
        alert('Event not found or an error occurred.');
      }
      
    };

    fetchEvent();
  }, [EventID]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedEvent = Object.fromEntries(formData.entries());

    // Validate form fields
    if (!updatedEvent.OrganizerID || !updatedEvent.Title || !updatedEvent.Description || 
      !updatedEvent.Venue || !updatedEvent.EventDate || !updatedEvent.TicketPrice || 
      !updatedEvent.TicketsLeft || !updatedEvent.ParticipantsCount || 
      !updatedEvent.IDT || !updatedEvent.Status) {
    alert("Please fill out all the fields!");
    return;
  }
  

    try {
      const response = await fetch(`http://localhost:3000/events/` + EventID, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          EventID, 
          OrganizerID: updatedEvent.OrganizerID, 
          Title: updatedEvent.Title,
          Description: updatedEvent.Description,
          Venue: updatedEvent.Venue,    
          EventDate: updatedEvent.EventDate,
          TicketPrice: updatedEvent.TicketPrice,
          TicketsLeft: updatedEvent.TicketsLeft,
          ParticipantsCount: updatedEvent.ParticipantsCount,
          IDT: updatedEvent.IDT,
          Status: updatedEvent.Status
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
              <label className='col-sm-4 col-form-label'>OrganizerID</label>
              <div className='col-sm-8'>
                <input className='form-control' name='OrganizerID' type='number' value={eventData.OrganizerID} onChange={(e) => setEventData({ ...eventData, OrganizerID: e.target.value })}/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Title</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Title' value={eventData.Title} onChange={(e) => setEventData({ ...eventData, Title: e.target.value })}/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Description</label>
              <div className='col-sm-8'>
                <textarea className='form-control' name='Description' rows="3" value={eventData.Description} onChange={(e) => setEventData({ ...eventData, Description: e.target.value })}></textarea>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Venue</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Venue' value={eventData.Venue} onChange={(e) => setEventData({ ...eventData, Venue: e.target.value })}/>
              </div>
            </div>


            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>EventDate</label>
              <div className='col-sm-8'>
                <input className='form-control' name='EventDate' type='date' value={eventData.EventDate} onChange={(e) => setEventData({ ...eventData, EventDate: e.target.value })} />
              </div>
            </div>


            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>TicketPrice</label>
              <div className='col-sm-8'>
                <input className='form-control' name='TicketPrice' type='number' step="0.01" min="1" value={eventData.TicketPrice} onChange={(e) => setEventData({ ...eventData, TicketPrice: e.target.value })} />
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>TicketsLeft</label>
              <div className='col-sm-8'>
                <input className='form-control' name='TicketsLeft' type='number' value={eventData.TicketsLeft} onChange={(e) => setEventData({ ...eventData, TicketsLeft: e.target.value })}/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>ParticipantsCount</label>
              <div className='col-sm-8'>
                <input className='form-control' name='ParticipantsCount' type='number' value={eventData.ParticipantsCount} onChange={(e) => setEventData({ ...eventData, ParticipantsCount: e.target.value })}/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>IDT</label>
              <div className='col-sm-8'>
                <input className='form-control' name='IDT' type='number' value={eventData.IDT} onChange={(e) => setEventData({ ...eventData, IDT: e.target.value })}/>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Status</label>
              <div className='col-sm-8'>
                <input className='form-control' name='Status'  value={eventData.Status} onChange={(e) => setEventData({ ...eventData, Status: e.target.value })}/>
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