import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ApiService from '../../Api/ApiService';
import Swal from 'sweetalert2';
import { getCookie } from '../../CookiesFunction';

const api = new ApiService("https://localhost:7024/api");

const Update = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({
    eventOrganizerID: 0,
    title: '',
    description: '',
    location: '',
    ticketPrice: 0,
    ticketsLeft: 0,
    eventDate: '',
    image: null 
  });

  const [searchParams] = useSearchParams();
  const eventID = searchParams.get('event');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getCookie('userData') ? JSON.parse(getCookie('userData')) : null;
    if (!userData || userData.role !== "EventOrganizer") {
      navigate('/');
    }
  }, [navigate]);

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  const showSuccessAlert = (message) => {
    return Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventID) {
        showErrorAlert('Event ID is missing');
        navigate("/EventOrganizerPage/EventList");
        return;
      }
      try {
        const data = await api.get(`event/${eventID}`);
        setEventData({
          eventOrganizerID: data.eventOrganizerID,
          title: data.title,
          description: data.description,
          location: data.location,
          ticketPrice: data.ticketPrice,
          ticketsLeft: data.ticketsLeft,
          eventDate: data.eventDate.split("T")[0],
          image: null
        });
      } catch (err) {
        showErrorAlert(err.message || 'Failed to load event data');
        navigate("/EventOrganizerPage/EventList");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventID, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.description || !eventData.eventDate || 
        !eventData.ticketPrice || !eventData.ticketsLeft) {
      showErrorAlert('Please fill in all required fields');
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Confirm Update',
        text: 'Are you sure you want to update this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });

      if (!result.isConfirmed) return;

      const updateData = {
        eventID: parseInt(eventID),
        eventOrganizerID: eventData.eventOrganizerID,
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        ticketPrice: parseFloat(eventData.ticketPrice),
        ticketsLeft: parseInt(eventData.ticketsLeft),
        eventDate: eventData.eventDate
      };

      setIsLoading(true);

      if (eventData.image) {
        const formData = new FormData();
        Object.entries(updateData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("ImageFile", eventData.image);

        await api.postFormData(`event/updatewithimage/${eventID}`, formData);
      } else {
        await api.put(`event/${eventID}`, updateData);
      }

      await showSuccessAlert('Event updated successfully');
      navigate("/EventOrganizerPage/EventList");
    } catch (error) {
      showErrorAlert(error.response?.data?.message || error.message || 'Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const formFields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "textarea", required: true },
    { label: "Location", name: "location", type: "text", required: false },
    { label: "Event Date", name: "eventDate", type: "date", required: true },
    { label: "Ticket Price", name: "ticketPrice", type: "number", step: "0.01", required: true },
    { label: "Tickets Left", name: "ticketsLeft", type: "number", required: true },
  ];

  return (
    <div className='container my-4'>
      <div className='row'>
        <div className='col-md-8 mx-auto rounded border p-4 shadow'>
          <h2 className='text-center mb-4'>Update Event</h2>
          <div className='mb-4'>
            <Link className="btn btn-outline-secondary" to="/eventOrganizerPage/EventList">
              ← Back to Events
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {formFields.map((field, idx) => (
              <div className='mb-3' key={idx}>
                <label className='form-label'>
                  {field.label}
                  {field.required && <span className="text-danger">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className='form-control'
                    name={field.name}
                    rows="4"
                    value={eventData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : (
                  <input
                    className='form-control'
                    name={field.name}
                    type={field.type}
                    step={field.step}
                    value={eventData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Link className="btn btn-outline-danger me-md-2" to="/EventOrganizerPage/EventList">
                Cancel
              </Link>
              <button type='submit' className='btn btn-primary' disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
