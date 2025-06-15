import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import styles from './NotificationSimulator.module.css';
import { getCookie } from '../CookiesFunction';
import axios from 'axios';
import ApiService from '../Api/ApiService';
import { Link } from 'react-router-dom';

const NotificationSimulator = () => {
  const userData = getCookie('userData') ? JSON.parse(getCookie('userData')) : null;
  const [notifications, setNotifications] = useState([]);
  const api = new ApiService('https://localhost:7024/api');

  const MarkAsRead = async (id)=>{
      let response = await api.post(`notification/${id}`);
      console.log(response);
  }


  useEffect(() => {
    
    const fetchNotifications = async () => {
      try {
        const allNotifications = await api.get(`notification/${userData.id}`);
        console.log(allNotifications);
        setNotifications(allNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!userData) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7024/notificationHub?userId=${userData.id}`)
      .withAutomaticReconnect()
      .build();

      connection.on('ReceiveNotification',async (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('SignalR Connection Error:', err));

    return () => {
      connection.stop();
    };
  }, [userData]);

  return (
    <div className="row" style={{ marginTop: '10rem' }}>
  <div className="col-xs-12">
    {notifications.length === 0 && <p>No notifications yet.</p>}
    {notifications.map((n) => (
      <Link
        key={n.notificationID}
        to="/eventOrganizerPage/EventList"
        onClick={() => MarkAsRead(n.notificationID)}
        style={{
          fontWeight: 400,
          color: '#241e1e',
          fontSize: '1.7rem',
          paddingInlineEnd: '3rem',
          textDecoration: 'none' // Optional, makes it look more like a div
        }}
      >
        <div className={styles.notificationBox}>
          {n.message}
          <small style={{"padding-inline-start":"2rem","color":"gray"}}>{new Date(n.timestamp).toLocaleString()}</small>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
};

export default NotificationSimulator;
