import { useNavigate } from "react-router-dom";
import ApiService from "./ApiService";

export function useAuthorize() {
  const navigate = useNavigate();
  const api = new ApiService('https://localhost:7024/api');

  return async (requiredRole) => {
    try {
      // First check if we have user data in cookies
      const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData'));
      
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }

      // Verify token with backend
      const response = await api.get("/Authentication/check-auth");
      
      if (!response || !response.role) {
        throw new Error("Invalid authentication response");
      }
      
      // Check role match (case insensitive)
      if (response.role.toLowerCase() !== requiredRole.toLowerCase()) {
        throw new Error(`Unauthorized: Required ${requiredRole} but got ${response.role}`);
      }
      
      return response; 
    } catch (error) {
      console.error("Authorization error:", error);
      // Clear auth data and redirect
      localStorage.removeItem('userData');
      sessionStorage.removeItem('userData');
      navigate('/login');
      throw error;
    }
  };
}