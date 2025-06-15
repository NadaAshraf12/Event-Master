import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import EventDetails from './EventCardDetails';
import styles from './EventCard.module.css';
import ApiService from '../Api/ApiService';
import Swal from 'sweetalert2';

const EventCard = ({ event, onEventChange }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = new ApiService("https://localhost:7024/api");

  const handleAccept = async () => {
    setLoading(true);
    try {
      await api.post(`admin/approve-event/${event.eventID}`, {});
      onEventChange();
      Swal.fire('Approved!', 'Event has been approved', 'success');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await api.delete(`event/${event.eventID}`);
        onEventChange();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className={`panel panel-default ${styles.cardPanel}`}>
        <div className={`panel-body ${styles.cardBody}`}>
          <div className={`dropdown pull-right ${styles.dropdownContainer}`}>
            <button
              className="btn btn-default btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaEllipsisV />
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={() => setShowDetails(true)}
                >
                  View Details
                </button>
              </li>
              <li>
                <button 
                  className="dropdown-item text-danger" 
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </li>
            </ul>
          </div>

          <h4 className="text-primary">{event.title}</h4>
          <p><strong>Organizer:</strong> {event?.eventOrganizerDto?.name || 'N/A'}</p>
          <p className="text-muted">{new Date(event.eventDate).toLocaleDateString()}</p>

          <div className="btn-group">
            <button 
              className={`btn btn-sm ${styles.button}`} 
              onClick={handleAccept} 
              disabled={loading}
            >
              {loading ? 'Approving...' : 'Approve'}
            </button>
            <button 
              className={`btn btn-sm ${styles.button}`} 
              onClick={handleDelete} 
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Decline'}
            </button>
          </div>
        </div>
      </div>

      {showDetails && <EventDetails event={event} onClose={() => setShowDetails(false)} />}
    </>
  );
};

export default EventCard;