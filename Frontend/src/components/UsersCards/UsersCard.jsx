import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import UserCardDetails from "./UsersCardDetails";
import styles from './Card.module.css';
import ApiService from '../Api/ApiService';
import Swal from 'sweetalert2';

const Card = ({ item, onCardChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const api = new ApiService("https://localhost:7024/api");

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      await api.post(`admin/approve-organizer/${item.eventOrganizerID}`, {});
      await showSuccess('Organizer approved successfully');
      onCardChange();
    } catch (err) {
      showError(err.message || 'Failed to approve organizer');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this organizer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await api.delete(`eventOrganizer/${item.eventOrganizerID}`);
        await showSuccess('Organizer deleted successfully');
        onCardChange();
      } catch (err) {
        showError(err.message || 'Failed to delete organizer');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`panel panel-default ${styles.cardPanel}`}>
      <div className={`panel-body ${styles.cardBody}`}>
        <div className={styles.dropdownContainer}>
          <div className="dropdown">
            <button
              className={`btn btn-default btn-sm ${styles.dropdownButton}`}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaEllipsisV />
            </button>
            {isDropdownOpen && (
              <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowDetails(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Details
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className={styles.cardContent}>
          <h4 className={styles.userName}>{item.name}</h4>
          <p className={`text-muted ${styles.role}`}>Event Organizer</p>
          <div className={`btn-group ${styles.buttonGroup}`}>
            <button
              className={`btn btn-sm ${styles.button}`}
              onClick={handleAccept}
              disabled={loading}
            >
              {loading ? 'Accepting...' : 'Accept'}
            </button>
            <button
              className={`btn btn-sm ${styles.button}`}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Decline'}
            </button>
          </div>
        </div>
      </div>
      {showDetails && <UserCardDetails item={item} onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default Card;