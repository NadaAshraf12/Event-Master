import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();  // Access the id from the URL
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchEventDetails = async () => {
    try {
      const res = await axios.get("/data/data.json");
      console.log(res.data);  
      const eventData = res.data.Events.find(event => event.id === parseInt(id));
      if (eventData) {
        setEvent(eventData);
      } else {
        setError("Event not found.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load event details.");
      setLoading(false);
    }
  };

  fetchEventDetails();
}, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="app">
      <div className="details">
        <div className="large-img-wrapper">
          <img src={event.largeImage} alt={event.title} className="large-img" />
        </div>

        <div className="box" >
          <h2>{event.title}</h2>
          <span>{event.date}</span>
          <p><span className="gradient-text">Location:</span> {event.location}</p>
          <p><span className="gradient-text">Organizer:</span> {event.organizer}</p>
          <p>{event.description}</p>

          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="add-to-cart"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
