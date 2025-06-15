import React, { useEffect, useState } from 'react';
import Card from '../../components/UsersCards/UsersCard';
import styles from './AdminUsers.module.css';
import ApiService from '../../components/Api/ApiService';
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyData = [
    { id: 1, name: 'John Doe', role: 'Administrator', image: 'https://randomuser.me/api/portraits/men/1.jpg', email: 'johndoe@example.com', status: 'Pending' },
    { id: 2, name: 'Jane Smith', role: 'Editor', image: 'https://randomuser.me/api/portraits/women/1.jpg', email: 'janesmith@example.com', status: 'Pending' },
    { id: 3, name: 'Emily Johnson', role: 'Viewer', image: 'https://randomuser.me/api/portraits/women/2.jpg', email: 'emilyjohnson@example.com', status: 'Pending' },
  ];

  const apiService = new ApiService("https://localhost:7024/api");

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('eventOrganizer/pending-organizers');
      setCards(data);
    } catch (error) {
      Swal.fire({
        title: 'Connection Error',
        text: 'Using demo data. Server might be unavailable.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      setCards(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={`row ${styles.cardRow}`}>
        {cards.map((card) => (
          <div key={card.id} className="col-xs-12 col-sm-6 col-md-4">
            <Card item={card} onCardChange={fetchCards} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;