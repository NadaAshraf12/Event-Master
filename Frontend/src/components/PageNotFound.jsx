import React from "react";
import { Link } from "react-router-dom";
import BackNotFound from "./BackNotFound";

export default function PageNotFound() {
  return (
    <div className="container">
      <div className="caution-tape">
        <p className="caution-text">404 Page not found</p>
      </div>

      <BackNotFound />
      <p className="problem-text">Oops. Something went wrong.</p>

      <style jsx>{`
        :root {
          --cautionYellow: #608dfd;
          --danger: #5ca9fb;
        }

        body {
          background: #fff;
          font-family: "Bangers", cursive;
          text-transform: uppercase;
        }

        .back-button {
          background: var(--cautionYellow);
          border: 10px #fff solid;
          color: #fff !important;
          width: 200px;
          height: 60px;
          font-size: 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
          position: relative;
          top: 81px;
          cursor: pointer;
          font-family: "Bangers", cursive;
          transition: all 0.2s ease;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .back-button a {
          color: inherit;
          text-decoration: none;
          display: contents;
          width: 100%;
          height: 100%;
        }

        .back-button:hover {
          background: var(--danger);
          color: #fff;
          border: none;
        }

        .caution-text {
          font-weight: 900;
          color: #fff;
          text-align: center;
          font-size: 20px;
          margin-top: 40;
        }

        .container {
          text-align: center;
        }

        .caution-tape {
          font-size: 6rem;
          width: 100%;
          border-top: 50px #fff solid;
          border-bottom: 50px #fff solid;
          background: var(--cautionYellow);
          height: 250px;
          line-height: 80px;
          position: relative;
          top: 50%;
          transform: translateY(50%);
        }

        .problem-text {
          color: var(--cautionYellow);
          position: relative;
          top: 60px;
          font-size: 3rem;
          letter-spacing: 3px;
        }
      `}</style>
    </div>
  );
}
