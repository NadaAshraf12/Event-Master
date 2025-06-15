import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../Api/ApiService';
import { getCookie } from '../../CookiesFunction';
import { useAuthorize } from '../../Api/useAuthorize';
import Swal from 'sweetalert2';

const Create = () => {
  const api = new ApiService("https://localhost:7024/api");
  const navigate = useNavigate();
  // const authorize = useAuthorize();

  const cookieData = getCookie('userData');
  const userData = cookieData ? JSON.parse(cookieData) : null;

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData == null || userData.role !== "EventOrganizer") {
      navigate('/');
    } else {
      setIsLoading(false);
    }
  }, [navigate, userData]);
  

  const initialState = {
    EventOrganizerID: userData?.id || "",
    Title: "",
    Description: "",
    Location: "",
    EventDate: "",
    TicketPrice: "",
    TicketsLeft: "",
    Image: null
  };

  const [event, setEvent] = useState(initialState);

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await authorize('EventOrganizer');
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       showError('You are not authorized to create events');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [authorize]);

  // useEffect(() => {
  //   if (!isLoading && !isAuthorized) {
  //     navigate('/notfound');
  //   }
  // }, [isLoading, isAuthorized, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!event.Title || !event.Description || !event.EventDate || 
          !event.TicketPrice || !event.TicketsLeft) {
        throw new Error('Please fill in all required fields');
      }

      if (Number(event.TicketPrice) <= 0 || Number(event.TicketsLeft) < 0) {
        throw new Error('Please enter valid numbers for price and tickets');
      }

      const formData = new FormData();
      Object.keys(event).forEach((key) => {
        if (event[key] !== null && event[key] !== '') {
          formData.append(key, event[key]);
        }
      });

      const result = await Swal.fire({
        title: 'Create Event?',
        text: 'Are you sure you want to create this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!'
      });

      if (!result.isConfirmed) {
        setIsSubmitting(false);
        return;
      }

      const response = await api.postFormData("event", formData);
      
      if (response.error) {
        throw new Error(response.message || 'Failed to create event');
      }

      await showSuccess('Event created successfully!');
      navigate("/EventOrganizerPage/EventList");
    } catch (err) {
      showError(err.message || 'An error occurred while creating the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "Image" ? files[0] : value,
    }));
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
    { label: "Title", type: "text", required: true },
    { label: "Description", type: "textarea", rows: 3, required: true },
    { label: "Location", type: "text", required: false },
    { label: "EventDate", type: "date", required: true },
    { label: "TicketPrice", type: "number", step: "0.01", min: "0.01", required: true },
    { label: "TicketsLeft", type: "number", min: "0", required: true },
  ];

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4 shadow">
          <h2 className="text-center mb-4">Create New Event</h2>
          <div className="mb-4">
            <Link className="btn btn-outline-secondary" to="/EventOrganizerPage/EventList">
              ← Back to Events
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            {formFields.map(({ label, ...inputProps }) => (
              <div className="mb-3" key={label}>
                <label className="form-label">
                  {label}
                  {inputProps.required && <span className="text-danger ms-1">*</span>}
                </label>
                {inputProps.type === "textarea" ? (
                  <textarea
                    className="form-control"
                    name={label}
                    rows={inputProps.rows}
                    value={event[label]}
                    onChange={handleChange}
                    required={inputProps.required}
                  />
                ) : (
                  <input
                    className="form-control"
                    name={label}
                    value={event[label]}
                    onChange={handleChange}
                    required={inputProps.required}
                    {...inputProps}
                  />
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label">Event Image</label>
              <input
                className="form-control"
                name="Image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="form-text">Recommended size: 1200x600 pixels</div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link className="btn btn-outline-danger me-md-2" to="/EventOrganizerPage/EventList">
                Cancel
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;