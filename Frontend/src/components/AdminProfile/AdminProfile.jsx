import React, { useState } from "react";
import styles from "./AdminProfile.module.css";
import EditProfileDialog from "./EditProfile";
import ApiService from "../Api/ApiService";
import Swal from "sweetalert2";

const AdminProfile = ({ admin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const apiService = new ApiService();

  const handleEditProfile = () => {
    setIsDialogOpen(true);
  };

  const handleSaveProfile = async (updatedAdmin) => {
    setIsSaving(true);
    try {
      const result = await Swal.fire({
        title: 'Confirm Changes',
        text: 'Are you sure you want to update your profile?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });

      if (!result.isConfirmed) {
        setIsSaving(false);
        return;
      }

      await apiService.put("admin", updatedAdmin);
      
      await Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      setIsDialogOpen(false);
    } catch (err) {
      await Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to save profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.shadow_2xl} rounded ${styles.fadeIn} p-4`}>
      <div className="text-center mb-4">
        <h1 className="h4 mt-3">{admin.username}</h1>
        <p className="text-muted">{admin.role}</p>
        <button
          className={`${styles.button} rounded-pill mt-2 px-4 py-2 border-0`}
          onClick={handleEditProfile}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            'Edit Profile'
          )}
        </button>
      </div>

      <div>
        <h5>Contact Information</h5>
        <ul className={styles.contactList}>
          <li>Email: {admin.email || "Not provided"}</li>
          <li>Username: {admin.username || "Not provided"}</li>
          <li>Role: {admin.role || "Not provided"}</li>
        </ul>
      </div>

      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        admin={admin}
        onSave={handleSaveProfile}
        isLoading={isSaving}
      />
    </div>
  );
};

export default AdminProfile;