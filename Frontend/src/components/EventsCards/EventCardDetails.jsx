import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EventDetails.module.css";

const EventDetails = ({ event, onClose }) => {
  const navigate = useNavigate();

  const handleBuyTicket = () => {
    navigate("/payment", {
      state: { eventId: event.eventID, eventName: event.title, ticketPrice: event.ticketPrice },
    });
  };

  return (
    <div className={`modal ${styles.modal} ${styles.fadeIn}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{event?.title || "Event Details"}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Organizer:</strong> {event?.eventOrganizerDto.name}</p>
            <p><strong>Description:</strong> {event?.description}</p>
            <p><strong>Date:</strong> {event?.eventDate}</p>
            <p><strong>Ticket Price:</strong> ${event?.ticketPrice}</p>
            <p><strong>Tickets Left:</strong> {event?.ticketsLeft}</p>
            <p><strong>Participants:</strong> {event?.participantCount}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleBuyTicket}>
              Register
            </button>
            <button className="btn btn-default" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
