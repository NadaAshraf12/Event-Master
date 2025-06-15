import React, { useState, useEffect } from "react";
import AdminProfile from "../../components/AdminProfile/AdminProfile";
import styles from "./Admin.module.css";
import { getCookie } from "../../components/CookiesFunction";
import ApiService from "../../components/Api/ApiService";
import { useNavigate } from "react-router-dom";
import { useAuthorize } from "../../components/Api/useAuthorize";
import Swal from "sweetalert2";

const Admin = () => {
  const [adminDetails, setAdminDetails] = useState({
    id: "",
    username: "",
    email: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api = new ApiService("https://localhost:7024/api");
  const [isAuthorized, setIsAuthorized] = useState(false);
  // const authorize = useAuthorize();

  const adminDetailsDummy = {
    name: "Jane Doe",
    role: "Chief Technology Officer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "A passionate leader in technology with a focus on innovation and team empowerment.",
    skills: ["Leadership", "React", "Node.js", "Cloud Computing", "Project Management"],
    email: "janedoe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await authorize('admin'); // استخدام lowercase للتوحيد
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       console.error("Authorization error:", error);
  //       Swal.fire({
  //         title: 'Unauthorized',
  //         text: 'You are not authorized to view this page',
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         navigate('/login');
  //       });
  //     }
  //   };

  //   checkAuth();
  // }, [authorize, navigate]);

  useEffect(() => {
      const userData = getCookie('userData')?JSON.parse(getCookie('userData')):null;
      if(userData==null || userData.role != "Admin")
            navigate('/');
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const userData = getCookie("userData");
        if (!userData) {
          throw new Error("No user data found");
        }
        
        const parsedData = JSON.parse(userData);
        const AdminID = parsedData.id;
        
        const data = await api.get(`admin/${AdminID}`);
        setAdminDetails({
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role
        });
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
        Swal.fire({
          title: 'Warning',
          text: 'Using demo data as server is unavailable',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        setAdminDetails(adminDetailsDummy);
      } finally {
        setLoading(false);
      }
    };

      fetchAdminData();
    
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
    <div className={`${styles.container} ${styles.marginLeftDesktop}`}>
      <AdminProfile admin={adminDetails} />
    </div>
  );
};

export default Admin;