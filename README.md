# 🎉 EventMaster

**EventMaster** is a powerful web application for planning and managing events like conferences, workshops, and community meetups. The system provides tailored interfaces and privileges for three types of users: **Admin**, **Event Organizer**, and **Participant**.

---

## 👥 User Roles

- **Admin**
  - Approves or rejects event organizer accounts.
  - Reviews and manages submitted events.

- **Event Organizer**
  - Can create, update, delete, and manage events (CRUD).
  - Uploads event materials (attachments).
  - Sends real-time updates to participants.

- **Participant**
  - Can view events without logging in.
  - Must log in to register or interact with events.
  - Can search by location or date.
  - Can register for events (if tickets are available), pay, and receive updates.
  - Can save favorite events and download materials.

---

## ✨ Key Features

- 🧾 **Event Details:** Organizer name, title, description, venue, date, price, available tickets, number of registered participants.
- 💸 **Ticket Booking:** Participants can book and pay for available tickets.
- 🔍 **Search Functionality:** Filter events by location or date.
- 🔔 **Real-Time Notifications:** Implemented using **real-time sockets**.
- 📎 **Attachments:** Upload/download materials related to events.
- 📧 **Updates:** Participants get instant updates and alerts.
- 🔐 **Authentication System** for all actors.

---

## 🗃️ Tech Stack

- **Frontend:** React.js
- **Backend:** ASP.NET Core Web API
- **Real-Time Communication:** SignalR (Sockets)
- **Database:** SQL Server (with relational DB schema design)
- **Authentication:** JWT or ASP.NET Identity

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/NadaAshraf12/Event-Master.git

# Navigate to the frontend
cd client

# Install dependencies
npm install

# Start the React app
npm start

# Backend instructions in /server folder (ASP.NET Core)
