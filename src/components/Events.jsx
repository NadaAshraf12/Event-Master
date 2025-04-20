import { Image } from "./image";
import React from "react";
import { Link } from "react-router-dom";

export const Events = (props) => {
  return (
    <div id="Events" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Events</h2>
          <p>
            Explore and join exciting events happening near you!
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d) => (
                  <div
                    key={`${d.title}-${d.id}`}  // Using d.id for uniqueness
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Link to={`/EventDetails/${d.id}`}>  {/* Using d.id */}
                      <Image
                        title={d.title}
                        largeImage={d.largeImage}
                        smallImage={d.smallImage}
                      />
                    </Link>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
