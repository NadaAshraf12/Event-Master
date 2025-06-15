import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "./components/Login";
import Signup from './components/signup';

import EventDetails from "./components/EventDetails";
import EventsPage from "./Pages/EventPage";
 
import PaymentPage from "./components/EventsCards/PaymentPage";

import { EventOrganizerPage } from "./components/eventOrganizer/EventOrganizerPage";
import { OrgHeader } from "./components/eventOrganizer/OrgHeader";
import { EventList } from "./components/eventOrganizer/EventList";
import Create from "./components/eventOrganizer/crud/Create";
import Update from "./components/eventOrganizer/crud/Update";


import AdminLayout from "./Layouts/AdminLayout";
import Admin from "./Pages/Admin/Admin";
import AdminUsers from "./Pages/AdminUsers/AdminUsers";
import AdminEvents from "./Pages/AdminEvents/AdminEvents";


import PageNotFound from "./components/PageNotFound";
import NotificationSimulator from "./components/Notification/NotificationSimulator";


const dummyAdmin = {
  name: "Mohamed Emad",
  role: "System Administrator",
  image: "https://i.pravatar.cc/150?img=12",
  about: "Dedicated and experienced system admin with a passion for technology and innovation. Skilled in managing servers, users, and maintaining security protocols.",
  skills: ["Linux", "Networking", "Firewall Configuration", "Shell Scripting", "AWS"],
  email: "mohamed.emad@example.com",
  phone: "+20 101 234 5678",
  location: "Cairo, Egypt",
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/eventpage",
    element: <EventsPage />,
  },
 
  {
    path: "/eventdetails/:id",
    element: <EventDetails />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  
  
   {
     path: "/eventorganizerpage",
     element: <EventOrganizerPage />,
     children: [
       {
         index: true,
         element: <OrgHeader />,
       },
       {
         path: "eventlist",
         element: <EventList />,
       },
       {
         path:"notifications",
         element:<NotificationSimulator />
       }
     ],
   },
  {
    path: "/eventorganizer/crud/create",
    element: <Create />,
  },
  {
    path: "/eventorganizer/crud/update/:EventID",
    element: <Update />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "events",
        element: <AdminEvents />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
