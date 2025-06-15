import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiService from "./Api/ApiService";
import useFetch from "./Api/useFetch";
import { getCookie } from "./CookiesFunction";
import { Navigation } from "./navigation";
import Swal from 'sweetalert2';

export default function EventDetails() {
  const { id } = useParams();
  const [registrationForm, setRegistrationForm] = useState({
    ParticipantID: null,
    EventID: null,
    PaymentMethodId: null,
  });

  const api = new ApiService("https://localhost:7024/api");
  const navigate = useNavigate();
  const cookieData = getCookie('userData');
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const ParticipantID = userData?.id;

  const {
    data: event,
    loading,
    error,
  } = useFetch(() => api.get(`event/${id}`), [id]);
    console.log(event);
    
  async function handleRegister() {
    if (!userData) {
      navigate("/login");
      return;
    }

    const newRegistrationForm = {
      ParticipantID: ParticipantID,
      EventID: id,
      PaymentMethodId: null,
    };

    setRegistrationForm(newRegistrationForm);

    localStorage.setItem("registrationData",JSON.stringify(newRegistrationForm));
    localStorage.setItem("purchasedEvent",JSON.stringify(event));
    
    navigate('/payment');
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navigation />
      <section className="app">
        <div className="details">
          <div className="large-img-wrapper">
            <img src={event.image} alt={event.title} className="large-img" />
          </div>
          <div className="box">
            <h2>{event.title}</h2>
            <span>{event.eventDate}</span>
            <p><span className="gradient-text">Location:</span> {event.location}</p>
            <p><span className="gradient-text">Organizer:</span> {event.eventOrganizerDto?.name || "N/A"}</p>
            <p><span className="gradient-text">Ticket Price:</span> {event.ticketPrice || "N/A"} $</p>
            <h2 style={{"marginTop":"3rem","fontSize":"2.5rem","fontFamily":"sans-serif","fontWeight":"600"}}>Event Description</h2>
            <p style={{"color":"gray",
            "fontSize": "2rem",
            "letterSpacing": "2px",
            "marginInlineStart": "1.6rem"
            }}>{event.description}</p>
            <button
              className="add-to-cart"
              onClick={handleRegister}
              rel="noopener noreferrer"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
