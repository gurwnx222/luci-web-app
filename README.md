This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Backend Server

First, start the chat backend server (located at `/Users/hammadsiddiq/Downloads/chat-backend/`):

```bash
cd /Users/hammadsiddiq/Downloads/chat-backend
npm install  # if not already installed
```

**Important:** The backend needs to run on port 3000. You can either:

1. **Set environment variable** (recommended):
   ```bash
   PORT=3000 node server.js
   ```

2. **Or modify server.js** line 553 to use port 3000:
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

Then start the server:
```bash
node server.js
```

The backend server should run on `http://localhost:3000`.

### Frontend Web App

1. Install dependencies (including `socket.io-client`):

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. (Optional) Create a `.env.local` file to configure the backend URL (defaults to port 3000):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

3. Run the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

**Note:** If Next.js tries to use port 3000 (same as backend), it will ask to use a different port (like 3001). That's fine - the frontend will still connect to the backend on port 3000.

Open the URL shown in the terminal (usually `http://localhost:3000` or `http://localhost:3001`) with your browser.

**Important:** Make sure the backend server is running on port 3000 before using the chat features.

## Chat Integration

The chat system is fully integrated with the backend:

- **Real-time messaging** via Socket.IO
- **User management** - automatically creates/loads salon owner user
- **Conversations** - loads existing conversations or creates new ones
- **Message history** - loads previous messages from database
- **Image uploads** - supports sending images in chat
- **Online status** - shows online/offline status for users
- **Message status** - shows sent/delivered/read status

## Testing the Integration

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

### Quick Test Steps:

1. **Start backend:** `cd /Users/hammadsiddiq/Downloads/chat-backend && PORT=3000 node server.js`
2. **Start frontend:** `npm run dev`
3. **Open browser** and navigate to the chat page
4. **Check browser console** (F12) for any errors
5. **Verify Socket.IO connection** in Network tab → WS (WebSocket)
6. **Test sending a message** - it should appear immediately

### Common Issues:

- **Port conflict:** If Next.js uses port 3000, use `npm run dev -- -p 3001` for frontend
- **Connection errors:** Verify backend is running and MongoDB is connected
- **CORS errors:** Backend CORS should allow all origins (already configured)

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
