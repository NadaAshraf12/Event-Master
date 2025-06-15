import React from "react";
import styles from "./Filter.module.css";

const Filter = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  selectedVenue,
  onVenueChange,
  availableVenues,
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={`row ${styles.filterRow}`}>
        <div className={`col-xs-12 col-sm-4 ${styles.filterCol}`}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or organizer..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className={`col-xs-12 col-sm-4 ${styles.filterCol}`}>
          <select
            className="form-control"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Sort by date</option>
            <option value="asc">Date: Oldest first</option>
            <option value="desc">Date: Newest first</option>
          </select>
        </div>

        <div className={`col-xs-12 col-sm-4 ${styles.filterCol}`}>
          <select
            className="form-control"
            value={selectedVenue}
            onChange={(e) => onVenueChange(e.target.value)}
          >
            <option value="">All Venues</option>
            {availableVenues.map((venue, index) => (
              <option key={index} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
