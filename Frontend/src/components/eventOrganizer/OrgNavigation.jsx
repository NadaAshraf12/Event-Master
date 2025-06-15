import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../CookiesFunction";
import Swal from "sweetalert2";
import * as signalR from "@microsoft/signalr";
import ApiService from "../Api/ApiService";

export const OrgNavigation = () => {
  const navigate = useNavigate();
  const [isMessagesFound, setIsMessagesFound] = useState(false);
  const userData = getCookie("userData") ? JSON.parse(getCookie("userData")) : null;
  const api = new ApiService("https://localhost:7024/api");

  useEffect(() => {
    if (!userData) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7024/notificationHub?userId=${userData.id}`)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", async (data) => {
      if (data) setIsMessagesFound(true);
    });

    connection
      .start()
      .then(() => console.log("SignalR Connected"))
      .catch((err) => console.error("SignalR Connection Error:", err));

    return () => {
      connection.stop();
    };
  }, [userData]);

  // Initial fetch to check if user has unread notifications
  useEffect(() => {
    const fetchReadStatus = async () => {
      if (!userData) return;

      try {
        const isAllRead = await api.get(`notification/isAllRead/${userData.id}`);
        if (isAllRead === false) {
          setIsMessagesFound(true);
        }
      } catch (err) {
        console.error("Error checking read status:", err);
      }
    };

    fetchReadStatus();
  }, [userData]);

  // Logout handler with SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You'll need to log in again to access your account",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
      background: "#f8f9fa",
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("userData");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out",
          icon: "success",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/signup");
        });
      }
    });
  };

  // Optional: Clear notification dot on click
  const handleNotificationsClick = (id) => {
    api.post(`notification/allRead/${id}`);
    setIsMessagesFound(false);
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/eventOrganizerPage">
            Event Master
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/eventOrganizerPage/EventList">EventList</Link>
            </li>
            <li>
              <Link
                to="notifications"
                onClick={()=>handleNotificationsClick(userData.id)}
                style={{ position: "relative" }}
              >
                Notifications
                {isMessagesFound && (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "0",
                      insetInlineStart: "-12px",
                      backgroundColor: "red",
                      opacity: "60%",
                    }}
                  ></div>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="logout-link"
                style={{
                  color: "#d9534f",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#c9302c")}
                onMouseLeave={(e) => (e.target.style.color = "#d9534f")}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
