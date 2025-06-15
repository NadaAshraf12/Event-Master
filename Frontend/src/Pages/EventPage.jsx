import React, { useState, useEffect } from "react";
import EventView from "../components/EventView/EventView";
import Filter from "../components/Filter/Filter";
import NotificationSimulator from "../components/Notification/NotificationSimulator";
import styles from "../components/EventView/EventView.module.css";
import ApiService from "../components/Api/ApiService";
import useFetch from "../components/Api/useFetch";

const EVENTS_PER_PAGE = 9;

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const api = new ApiService("https://localhost:7024/api");
  const { data: events, loading, error } = useFetch(() => api.get("event/acceptedEvents"), []);

  const dummyData = [
    { id: 1, title: "AI Innovations Conference", venue: "Cairo", date: "2025-05-10", ticketPrice: 150, ticketsLeft: 25 },
    { id: 2, title: "Frontend Mastery Bootcamp", venue: "New Cairo", date: "2025-05-15", ticketPrice: 90, ticketsLeft: 10 },
  ];

  const eventsToDisplay = events || dummyData;

  const availableVenues = [...new Set(eventsToDisplay.map((e) => e.venue))];

  const filteredEvents = eventsToDisplay.filter((event) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      (event.title.toLowerCase().includes(lowerSearch) || event.eventOrganizerDto.name?.toLowerCase().includes(lowerSearch)) &&
      (selectedVenue === "" || event.venue === selectedVenue)
    );
  });

  if (sortOption === "asc") {
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortOption === "desc") {
    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const indexOfLast = currentPage * EVENTS_PER_PAGE;
  const indexOfFirst = indexOfLast - EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <Filter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
        selectedVenue={selectedVenue}
        onVenueChange={setSelectedVenue}
        availableVenues={availableVenues}
      />

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && (
        <>
          <div className="row g-4">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <div className="col-sm-6 col-md-4" key={event.id}>
                  <EventView event={event} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted">No events match your criteria.</div>
            )}
          </div>

          <nav className={styles.paginationWrapper}>
            <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>

            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
              className="form-control"
              style={{ width: "60px", textAlign: "center" }}
            />

            <span> / {totalPages}</span>

            <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </nav>
        </>
      )}

      <NotificationSimulator />
    </div>
  );
};

export default EventsPage;
