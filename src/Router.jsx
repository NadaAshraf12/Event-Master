import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/signup";
import EventDetails from "./components/EventDetails";
import PageNotFound from "./components/PageNotFound";
import { EventOrganizerPage } from "./components/eventOrganizer/EventOrganizerPage";
import { EventList } from "./components/eventOrganizer/EventList";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/EventDetails/:id", // Define the event details route with an id parameter
    element: <EventDetails />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/EventOrganizerPage",
    element: <EventOrganizerPage />,
  },
  {
    path: "/EventList",
    element: <EventList />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
