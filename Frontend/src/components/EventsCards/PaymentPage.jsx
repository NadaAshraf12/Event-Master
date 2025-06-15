import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../Api/ApiService"; 
import Swal from "sweetalert2";
import styles from './PaymentPage.module.css'; 

const PaymentPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);  
  const [selectedMethodId, setSelectedMethodId] = useState(null); 
  const [loading, setLoading] = useState(false);  
  const [cardNumber, setCardNumber] = useState("");  
  const [expiryDate, setExpiryDate] = useState("");  
  const [cvv, setCvv] = useState("");  
  const [nameOnCard, setNameOnCard] = useState("");  
  const [isVisaSelected, setIsVisaSelected] = useState(false);  

  const navigate = useNavigate();
  const api = new ApiService("https://localhost:7024/api");

  const registrationData = JSON.parse(localStorage.getItem('registrationData'));
  const purchasedEvent = JSON.parse(localStorage.getItem('purchasedEvent'));

  const eventId = purchasedEvent?.eventID;
  const title = purchasedEvent?.title;
  const ticketPrice = purchasedEvent?.ticketsLeft ? purchasedEvent?.ticketPrice : 0;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get("paymentMethod");
        setPaymentMethods(response);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        Swal.fire("Error", "Failed to load payment methods", "error");
      }
    };
    fetchPaymentMethods();
  }, []);

  const handlePaymentMethodChange = (e) => {
    const selectedId = e.target.value;
    setSelectedMethodId(selectedId);
    
    const selectedCard = paymentMethods.find(
      method => method.paymentMethodId == selectedId
    );
    
    const name = selectedCard?.paymentMethodName?.toLowerCase();
  
    const visaNames = ["visa", "master card"];
  
    setIsVisaSelected(
      !!name && visaNames.some(method => name.includes(method))
    );
  };
  

  const handlePayment = async () => {
    if (!selectedMethodId) {
      Swal.fire("Warning", "Please select a payment method", "warning");
      return;
    }

    if (isVisaSelected && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      Swal.fire("Warning", "Please fill in all Visa/Master Card details", "warning");
      return;
    }

    setLoading(true);
    try {
      registrationData.PaymentMethodId = selectedMethodId;
      console.log(registrationData);
      await api.post('registration',registrationData);
      Swal.fire({
        icon: 'success',
        title: 'Successfully registered!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/eventpage');
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.paymentContainer}`}>
      <h2>Payment</h2>
      <div className={styles.eventInfo}>
        <p className={styles.title}><strong>Event:</strong> {title}</p>
        <p className={styles.ticketPrice}><strong>Ticket Price:</strong> ${ticketPrice}</p>
      </div>

      <div className="form-group paymentMethod">
        <label>Select Payment Method:</label>
        <select
          className="form-control"
          value={selectedMethodId || ""}
          onChange={handlePaymentMethodChange}
        >
          <option value="">-- Select a Payment Method --</option>
          {paymentMethods.map((method) => (
            <option key={method.paymentMethodId} value={method.paymentMethodId}>
              {method.paymentMethodName}
            </option>
          ))}
        </select>
      </div>

      {isVisaSelected && (
        <div>
          <div className="form-group">
            <label>Name on Card:</label>
            <input
              type="text"
              className="form-control"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="Enter name on card"
            />
          </div>

          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your card number"
            />
          </div>

          <div className="form-group">
            <label>Expiry Date (MM/YYYY):</label>
            <input
              type="month"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>CVV:</label>
            <input
              type="password"
              className="form-control"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter CVV"
            />
          </div>
        </div>
      )}

      <button
        className={`btn ${styles.paymentButton}`}
        onClick={handlePayment}
        disabled={loading || !selectedMethodId || (isVisaSelected && (!cardNumber || !expiryDate || !cvv || !nameOnCard))}
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default PaymentPage;
