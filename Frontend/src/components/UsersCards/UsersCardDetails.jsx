import React from 'react';
import styles from './UserDetails.module.css';

const UserCardDetails = ({ item, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>{item.name}</h3>
        <p><strong>Role:</strong> event organizer</p>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Status:</strong> {item.status}</p>
        <button className={`btn btn-default ${styles.closeButton}`} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserCardDetails;