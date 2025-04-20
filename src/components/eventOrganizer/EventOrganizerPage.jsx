// EventOrganizerPage.jsx
import React from "react";
import { OrgHeader } from "../eventOrganizer/OrgHeader";
import { OrgNavigation } from "../eventOrganizer/OrgNavigation";
import { EventList } from "../eventOrganizer/EventList";


export const EventOrganizerPage = () => {
  return (
    <div>
      <OrgHeader />
      <OrgNavigation />
      <EventList />
    </div>
  );
};


