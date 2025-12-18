# Simple Setup Guide

## Step 1: Configure Backend Port

Your backend needs to run on port **3000**.

Edit `/Users/hammadsiddiq/Downloads/chat-backend/server.js` line 553:

```javascript
const PORT = process.env.PORT || 3000;  // Change 5000 to 3000
```

## Step 2: Start Backend

```bash
cd /Users/hammadsiddiq/Downloads/chat-backend
node server.js
```

You should see: `📡 Port: 3000`

## Step 3: Start Frontend

Open a NEW terminal:

```bash
cd /Users/hammadsiddiq/Documents/GitHub/luci-web-app
npm install
npm run dev -- -p 3001
```

**Note:** We use port 3001 for frontend to avoid conflict with backend on 3000.

## Step 4: Test

1. Open browser: `http://localhost:3001`
2. Navigate to the chat page
3. Check browser console (F12) - should see no errors
4. Chat should automatically create a user and connect

## That's It! 🎉

If you see errors, check:
- Backend is running on port 3000
- Frontend is running on port 3001
- MongoDB is connected (check backend console)
