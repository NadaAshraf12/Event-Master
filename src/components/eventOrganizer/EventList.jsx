import { Link } from "react-router-dom";
import "../eventOrganizer/EventList.css";
import React, { useState, useEffect } from "react";

export const EventList = () => {
  const [products, setProducts] = useState([]);

  function getProducts() {
    fetch("http://localhost:3000/events")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.EventID - b.EventID);
        setProducts(sortedData);
      })
      .catch((error) => {
        alert("Unable to get the events");
      });
  }

  useEffect(getProducts, []);

  function deleteProduct(EventID) {
    fetch(`http://localhost:3000/events/` + EventID, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        getProducts();
      })
      .catch((error) => {
        alert("unable to delete the product");
      });
  }

  return (
    <div className="container my-4 list">
      <h2 className="text-center mb-4"> Events </h2>
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-2"
            to="/eventOrganizer/crud/Create"
            role="button"
          >
            Create Event
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>EventID</th>
            <th>OrganizerID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Venue</th>
            <th>EventDate</th>
            <th>TicketPrice</th>
            <th>TicketsLeft</th>
            <th>ParticipantsCount</th>
            <th>IDT</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.EventID}</td>
              <td>{product.OrganizerID}</td>
              <td>{product.Title}</td>
              <td>{product.Description}</td>
              <td>{product.Venue}</td>
              <td>{product.EventDate}</td>
              <td>{product.TicketPrice}</td>
              <td>{product.TicketsLeft}</td>
              <td>{product.ParticipantsCount}</td>
              <td>{product.IDT}</td>
              <td>{product.Status}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Link
                  className="btn btn-primary btn-sm me-1"
                  to={`/eventOrganizer/crud/Update/${product.EventID}`}
                >
                  Update
                </Link>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.EventID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
