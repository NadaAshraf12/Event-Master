import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventsCards/EventCard';
import styles from './AdminEvents.module.css';
import ApiService from '../../components/Api/ApiService';
import Swal from 'sweetalert2';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService("https://localhost:7024/api");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await api.get('event/pending-events');
      setEvents(data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to load events. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-xs-12 col-sm-6 col-md-4">
            <EventCard event={event} onEventChange={fetchEvents} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;