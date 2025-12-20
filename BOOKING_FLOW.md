# Complete Booking Flow Documentation

## Overview
This document explains the complete booking flow from mobile app to web app, including how booking requests are created, sent, and managed.

---

## Architecture

### Two Backend Servers

1. **Main Backend** (Port 3000)
   - Handles: Bookings, Salons, Recommendations, Notifications
   - Socket.IO: Booking notifications, status updates
   - Location: `luci-backend/`

2. **Chat Backend** (Port 5001)
   - Handles: Chat messages, conversations, user registration for chat
   - Socket.IO: Real-time messaging
   - Location: `luci-backend/chat-backend/` or `thaimassageapp/chat-backend/`

---

## Complete Booking Flow

### Step 1: User Creates Booking Request (Mobile App)

**Location**: `thaimassageapp/src/Home/Homescreen.js`

**Trigger**: User swipes right on a studio card

**Process**:
1. `swipeRight()` function is called (line 539)
2. Calls `sendBookingRequest(currentStudio)` (line 571)
3. Function collects:
   - Current Firebase user UID
   - User profile data from Firestore (name, email)
   - Salon ID from studio object
   - Salon Owner ID (fetches from backend if not in studio object)

**Booking Data Sent**:
```javascript
{
  salonId: string,
  salonOwnerId: string,
  firebaseUID: string,
  name: string,
  email: string,
  requestedDateTime: ISO string (default: 1 hour from now),
  durationMinutes: number (default: 60),
  age: number (optional, default: 0),
  weightKg: number (optional, default: 0)
}
```

**API Endpoint**:
```
POST http://192.168.100.98:3000/api/v1/bookings/create-booking
```

---

### Step 2: Backend Receives and Processes Booking

**Location**: `luci-backend/controllers/booking.controller.js` → `createBookingRequest()`

**Process**:
1. Validates required fields
2. Creates booking in database with status: `"pending"`
3. Sends notification to salon owner via:
   - **SSE (Server-Sent Events)**: Stored in database for later retrieval
   - **Socket.IO**: Real-time notification if salon owner is online

**Socket Event Emitted**:
```javascript
emitBookingNotification(salonOwnerId, {
  type: "booking_request_received",
  booking: {
    id: booking._id,
    customerName: name,
    customerEmail: email,
    requestedDateTime: ...,
    durationMinutes: ...,
    status: "pending",
    customerBio: { age, weightKg }
  }
})
```

**Response**:
```json
{
  "success": true,
  "booking": { ... },
  "message": "Booking request created successfully"
}
```

---

### Step 3: Web App Receives Booking Notification

**Location**: `luci-web-app/app/components/Booking.jsx`

**Socket Connection**:
- Connects to main backend (port 3000) for booking notifications
- Uses `getBookingSocket()` from `lib/bookingSocket.js`
- Listens for `booking_notification` event

**Process**:
1. Component mounts and connects to Socket.IO
2. Listens for `booking_notification` event
3. When notification received:
   - Refreshes bookings list
   - Shows browser notification (if permission granted)
   - Updates UI in real-time

**Fetching Bookings**:
```
GET http://192.168.18.47:3000/api/v1/bookings/list?salonOwnerId={salonOwnerId}
```

---

### Step 4: Salon Owner Accepts/Rejects Booking

**Location**: `luci-web-app/app/components/Booking.jsx`

#### Accept Booking

**API Call**:
```
PUT http://192.168.18.47:3000/api/v1/bookings/{bookingId}/accept
Body: { salonOwnerId: string }
```

**Backend Process** (`acceptBooking()` → `patchBookingRequest()`):
1. Updates booking status to `"accepted"`
2. **Creates chat room** (if not exists):
   - Registers customer in chat system (if needed)
   - Registers salon owner in chat system (if needed)
   - Creates conversation between them
3. Emits notifications:
   - `booking_status_update` to customer (mobile app)
   - `chat_room_created` to both parties
4. Returns booking with conversation ID

**Response**:
```json
{
  "success": true,
  "booking": { ... },
  "conversation": { "id": "conversation_id" },
  "message": "Booking accepted successfully"
}
```

#### Reject Booking

**API Call**:
```
PUT http://192.168.18.47:3000/api/v1/bookings/{bookingId}/reject
Body: { salonOwnerId: string }
```

**Backend Process**:
1. Updates booking status to `"rejected"`
2. Emits `booking_status_update` to customer
3. Returns updated booking

---

### Step 5: Customer Receives Status Update (Mobile App)

**Location**: `thaimassageapp/src/utils/bookingSocket.js`

**Socket Events**:
- `booking_status_update`: When booking is accepted/rejected
- `chat_room_created`: When booking is accepted and chat room is created

**Process**:
1. Mobile app listens for these events
2. Updates local booking state
3. If accepted: Navigates to chat room (if implemented)

---

## API Endpoints Summary

### Booking Endpoints (Main Backend - Port 3000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/bookings/create-booking` | Create new booking request |
| GET | `/api/v1/bookings/list?salonOwnerId={id}` | Get all bookings for salon |
| GET | `/api/v1/bookings/:id` | Get booking by ID |
| PUT | `/api/v1/bookings/:id/accept` | Accept booking |
| PUT | `/api/v1/bookings/:id/reject` | Reject booking |

### Legacy Endpoints (Still Supported)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/bookings/request` | Create booking (new format) |
| POST | `/api/v1/bookings/patch-booking/:bookingId` | Update booking status |

---

## Socket.IO Events

### Main Backend (Port 3000) - Booking Events

**Client → Server**:
- `user_connected`: Connect user to socket with userId

**Server → Client**:
- `booking_notification`: New booking request received
  ```javascript
  {
    type: "booking_request_received",
    booking: { id, customerName, customerEmail, ... }
  }
  ```
- `booking_status_update`: Booking status changed
  ```javascript
  {
    bookingId: string,
    status: "accepted" | "rejected" | "pending",
    booking: { ... },
    conversationId: string | null
  }
  ```
- `chat_room_created`: Chat room created after booking acceptance
  ```javascript
  {
    conversationId: string,
    bookingId: string,
    customerId/customerName: string
  }
  ```

---

## Configuration

### Mobile App
- **Main Backend**: `API_BASE_URL = "http://192.168.100.98:3000"` (Homescreen.js line 58)
- **Chat Backend**: `CHAT_BACKEND_URL = "http://192.168.18.47:5001"` (chatConfig.js)

### Web App
- **Main Backend**: `NEXT_PUBLIC_API_URL = "http://192.168.18.47:3000"` (.env.local)
- **Chat Backend**: `NEXT_PUBLIC_CHAT_API_URL = "http://192.168.18.47:5001/api"` (.env.local)
- **Booking Socket**: Uses main backend (port 3000)
- **Chat Socket**: Uses chat backend (port 5001)

---

## Important Notes

1. **Two Separate Socket Connections**:
   - Booking notifications use main backend socket (port 3000)
   - Chat messages use chat backend socket (port 5001)

2. **Salon Owner ID**:
   - Must be set in web app (currently uses localStorage)
   - Should be fetched from user profile or auth context

3. **Real-time Updates**:
   - Both mobile and web apps receive real-time updates via Socket.IO
   - If user is offline, notifications are stored in database (SSE)

4. **Chat Room Creation**:
   - Automatically created when booking is accepted
   - Both parties receive `chat_room_created` event
   - Conversation ID is returned in accept response

---

## Troubleshooting

### Booking Not Appearing in Web App
1. Check if salon owner ID is correctly set
2. Verify Socket.IO connection is established
3. Check browser console for errors
4. Verify backend is running on port 3000

### Socket Not Connecting
1. Check CORS settings in `socketServer.js`
2. Verify correct port (3000 for bookings, 5001 for chat)
3. Check network connectivity
4. Verify user is authenticated

### Chat Room Not Created
1. Check if chat backend is running on port 5001
2. Verify both users are registered in chat system
3. Check backend logs for errors

