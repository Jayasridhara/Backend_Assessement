Project: Meeting Room Booking Service API

1. Introduction
   Purpose

The purpose of this system is to provide a REST API for managing meeting rooms and bookings.
It allows users to create rooms, book meeting rooms, cancel bookings, and retrieve booking information.

Scope

The system provides backend services for:

Creating meeting rooms

Listing rooms with filters

Creating bookings

Preventing overlapping bookings

Cancelling bookings

Maintaining idempotent booking requests

The system is implemented using Node.js, Express.js, and PostgreSQL.

2. System Architecture

The application follows a layered architecture.

Client
│
Routes
│
Controllers
│
Services
│
Database (PostgreSQL)

Project Structure:

project
│
├── controllers
│ roomController.js
│ bookingController.js
│
├── services
│ bookingService.js
│
├── routes
│ roomRoutes.js
│ bookingRoutes.js
│
├── db
│ db.js
│
├── app.js
└── server.js 3. Functional Requirements
Create Room
POST /api/rooms

Creates a meeting room with capacity, floor, and amenities.

List Rooms
GET /api/rooms

Optional filters:

/api/rooms?minCapacity=10
/api/rooms?amenity=projector
Create Booking
POST /api/bookings

Creates a booking for a meeting room.

Rules:

Start time must be before end time

Booking duration must be 15 minutes – 4 hours

Bookings cannot overlap

List Bookings
GET /api/bookings

Optional filter:

/api/bookings?roomId=1
Cancel Booking
POST /api/bookings/{id}/cancel

Rule:

Booking can only be cancelled more than 1 hour before start time.

4. Technologies Used

Node.js

Express.js

PostgreSQL

pg (Node PostgreSQL client)

Postman (API testing)

5. Conclusion

The Meeting Room Booking Service provides a scalable and reliable backend API for managing meeting rooms and reservations.
By enforcing validation rules and preventing conflicts, the system ensures efficient room scheduling and improved resource utilization.
