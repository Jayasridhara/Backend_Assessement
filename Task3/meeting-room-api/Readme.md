After Testing Routes in Postman
https://documenter.getpostman.com/view/41728894/2sBXietZwH

# Meeting Room Booking Service API

This project is a **backend REST API** for a Meeting Room Booking system.  
It allows users to create meeting rooms, book rooms, cancel bookings, and retrieve booking information.

The project is built using:

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg (PostgreSQL client)**

---

# 📌 Features

✔ Create meeting rooms  
✔ List rooms with filters (capacity & amenities)  
✔ Create room bookings  
✔ Prevent overlapping bookings  
✔ Cancel booking with business rule validation  
✔ Idempotent booking requests  
✔ PostgreSQL database integration

API Endpoints

Base URL

http://localhost:5000/api
1️⃣ Create Room
POST /api/rooms
Request Body
{
"name": "Conference Room A",
"capacity": 10,
"floor": 2,
"amenities": ["projector","whiteboard"]
}
2️⃣ Get All Rooms
GET /api/rooms

Optional filters:

GET /api/rooms?minCapacity=8
GET /api/rooms?amenity=projector
3️⃣ Create Booking
POST /api/bookings
Headers
Idempotency-Key: abc123
Body
{
"roomId": 1,
"title": "Team Meeting",
"organizerEmail": "john@example.com",
"startTime": "2026-03-12T10:00:00",
"endTime": "2026-03-12T11:00:00"
}
4️⃣ Get Bookings
GET /api/bookings

Optional filter

GET /api/bookings?roomId=1
5️⃣ Cancel Booking
POST /api/bookings/{id}/cancel

Example

POST /api/bookings/1/cancel
