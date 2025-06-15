import React from "react";

export const OrgHeader = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container" style={{"margin-top":"5rem"}}>
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                      <h2 style={{"color":"white"}}>
                       Event Organizer Dashboard        
                      </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
