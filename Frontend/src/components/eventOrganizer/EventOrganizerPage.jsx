import React, { useEffect, useState } from "react";
import { OrgNavigation } from "../eventOrganizer/OrgNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthorize } from "../Api/useAuthorize";
import { getCookie } from "../CookiesFunction";

export const EventOrganizerPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  // const authorize = useAuthorize();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await authorize('EventOrganizer');
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       console.error("Authorization failed:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [authorize]);



  // if (!isAuthorized) {
  //   navigate('/notfound'); 
  // return;
  // }
  const userData = getCookie('userData')?JSON.parse(getCookie('userData')):null;
  if(userData==null || userData.role != "EventOrganizer")
        navigate('/');

  return (
    <div>
      <OrgNavigation />
      <Outlet />
    </div>
  );
};