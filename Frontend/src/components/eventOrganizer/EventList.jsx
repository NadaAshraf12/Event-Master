import { Link, useNavigate } from "react-router-dom";
import "../eventOrganizer/EventList.css";
import React, { useState, useEffect } from "react";
import { getCookie } from "../CookiesFunction";
import ApiService from "../Api/ApiService";
import Swal from "sweetalert2";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizer, setOrganizer] = useState({
    eventOrganizerID: null,
    name: "",
    email: "",
    passwordHash: "",
    statusId: "",
    status: "",
    events: [],
    role: ""
  });

  const userData = JSON.parse(getCookie("userData"));
  const organizerID = userData.id;
  const api = new ApiService("https://localhost:7024/api");
  const navigate = useNavigate();
  
  if(userData==null || userData.role != "EventOrganizer")
    navigate('/');

  const fetchEvents = async () => {
    try {
      const response = await api.get(`event/allevents/${organizerID}`);
      setEvents(response.sort((a, b) => a.eventID - b.eventID));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to load events',
        text: error.message || 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizer = async () => {
    try {
      const res = await api.get(`eventOrganizer/${organizerID}`);
      setOrganizer(res);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to load organizer',
        text: error.message || 'Please try again later'
      });
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchOrganizer();
  }, []);

  const handleDeleteEvent = async (eventID) => {
    const result = await Swal.fire({
      title: 'Delete Event?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`event/${eventID}`);
        await fetchEvents();
        Swal.fire('Deleted!', 'Event was successfully deleted', 'success');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Delete failed',
          text: error.message || 'Could not delete event'
        });
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container my-4 list">
      <h2 className="text-center mb-4">My Events</h2>
      <Link className="btn btn-primary mb-3" to="/eventOrganizerPage">
        Back
      </Link>

      <div className="row mb-3">
        <div className="col">
          {organizer.statusId === 2 ? (
            <Link className="btn btn-primary float-end" to="/eventOrganizer/crud/Create">
              Create Event
            </Link>
          ) : (
            <div className="alert alert-warning">
              Account pending approval - cannot create events
            </div>
          )}
        </div>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : events.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Price</th>
                <th>Tickets</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.eventID}>
                  <td>{event.eventID}</td>
                  <td>{event.title}</td>
                  <td>{event.location}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td>${event.ticketPrice?.toFixed(2)}</td>
                  <td>{event.ticketsLeft}</td>
                  <td>
                    <span className={`badge bg-${event.status.statusName === 'Approved' ? 'success' : 'warning'}`}>
                      {event.status.statusName}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/eventOrganizer/crud/Update/event?event=${event.eventID}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(event.eventID)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4">
            <h4>No Events Found</h4>
            {organizer.statusId === 2 && (
              <Link className="btn btn-primary mt-2" to="/eventOrganizer/crud/Create">
                Create Your First Event
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};