import React, { useState } from "react";
import styles from './EditProfileDialog.module.css';
import Swal from 'sweetalert2';

const EditProfileDialog = ({ isOpen, onClose, admin, onSave, isLoading }) => {
  const [editedAdmin, setEditedAdmin] = useState(admin);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!editedAdmin.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!editedAdmin.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(editedAdmin.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin({
      ...editedAdmin,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      await Swal.fire({
        title: 'Validation Error',
        text: 'Please fix the errors in the form',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await onSave(editedAdmin);
    } catch (error) {
     
      return;
    }
  };

  return (
    isOpen && (
      <div className={`${styles.modalOverlay} ${styles.fadeIn}`}>
        <div className={`${styles.modalBox}`}>
          <h4 className="text-center" style={{ color: '#3D2B1F' }}>Edit Profile</h4>

          {["name", "email", "role", "phone", "location"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field} className={styles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {(field === 'name' || field === 'email') && <span className="text-danger"> *</span>}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={editedAdmin[field] || ''}
                onChange={handleChange}
                className={`${styles.input} ${errors[field] ? styles.inputError : ''}`}
                placeholder={`Enter your ${field}`}
                disabled={isLoading}
              />
              {errors[field] && (
                <div className={styles.errorText}>{errors[field]}</div>
              )}
            </div>
          ))}

          <div className={styles.buttonGroup}>
            <button 
              onClick={onClose} 
              className="btn btn-default"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-warning text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfileDialog;