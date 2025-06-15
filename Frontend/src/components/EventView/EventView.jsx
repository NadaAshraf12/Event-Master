import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./EventView.module.css";
import Swal from "sweetalert2";

const EventView = ({ event }) => {
  const showImageError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Image Error',
      text: 'Failed to load event image',
      confirmButtonColor: '#3085d6'
    });
  };

  const {
    eventID,
    title,
    description,
    eventDate,
    ticketPrice,
    ticketsLeft,
    participantsCount,
    eventOrganizerDto
  } = event;

  const organizerName = eventOrganizerDto?.name || 'Unknown Organizer';
  const eventImage = event.image || "/default-event-image.jpg";

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <NavLink to={`/EventDetails/${eventID}`} className="text-decoration-none">
      <div className={`card ${styles.eventCard}`} >
        <img 
        style={{"height":"460px", "objectFit":"contain !important"}}
          src={eventImage} 
          className={styles.image} 
          alt={title}
          onError={showImageError}
        />
        <div className={styles.overlay}>
          <h5 className="text-uppercase"><strong>{title || 'Untitled Event'}</strong></h5>
          <p>{description || 'No description available'}</p>
          <p><strong>Organizer:</strong> {organizerName}</p>
          <p><strong>Date:</strong> {formatDate(eventDate)}</p>
          <p><strong>Ticket:</strong> ${ticketPrice?.toFixed(2) || '0.00'}</p>
          <p><strong>Tickets Left:</strong> {ticketsLeft ?? '0'}</p>
          <p><strong>Participants:</strong> {participantsCount ?? '0'}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default EventView;