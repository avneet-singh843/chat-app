# React Native Group Chat App

A real-time, lightweight group chat application built with React Native and Node.js. This project demonstrates a clean, functional, and scalable approach to building real-time mobile applications.

## 📺 Demo & Screenshots

(Leave this section for your screen recordings and screenshots. A short GIF of the app in action is highly effective!)

**Join Screen**  
**Chat Screen (My Message)**  
**Chat Screen (Other's Message)**

![JoinScreen.tsx](Insert Screenshot of JoinScreen.tsx)  
![ChatScreen.tsx](Insert Screenshot of ChatScreen.tsx)  
![ChatScreen.tsx](Insert Screenshot of ChatScreen.tsx)

---

## 🎯 Problem Statement

The goal of this assignment was to develop a basic real-time group chat application that enables multiple users to communicate within a shared chat room. The primary focus was on implementing core functionality, maintaining clean and modular code, and ensuring a reliable real-time messaging.

---

## ✨ Features

### Core Features

- **User Join Flow:** Securely prompts the user for a username before entering the chat room.
- **Single Group Chat Room:** All users connect to a single, shared chat room.
- **Real-Time Messaging:** Messages are sent and received instantly by all connected users using WebSockets.
- **Message History:** The server persists the last 20 messages in memory, which are shown to new users immediately upon joining.
- **Message Metadata:** Each message is clearly marked with the sender's username and a formatted timestamp (e.g., 10:30 PM).
- **Graceful Error Handling:** The UI prevents users from submitting empty usernames or messages.

### Optimizations & UX Improvements

- **Real-Time Connection Status:** The UI provides clear feedback to the user, indicating the current connection status ("Connecting...", "Connection lost..."). The input field is disabled when disconnected.
- **Auto-Scroll to Latest Message:** The message list automatically scrolls to the bottom to display the newest message as it arrives.
- **"Read More" for Long Messages:** Messages exceeding a character limit are truncated with a "Read More" button.
- **Modern UI Components:** Replaced standard Button components with Pressable for better styling control and feedback.
- **Environment-Managed Configuration:** The server uses a `.env` file to manage configuration like PORT settings.

---

## 🛠️ Tech Stack

- **Frontend:** React Native (TypeScript)
- **Backend:** Node.js, Express.js
- **Real-Time Communication:** Socket.IO
- **Navigation:** React Navigation

---

## 📂 Project Structure

The project is organized into two main parts: the client (React Native app) and the server (Node.js backend).

```
group-chat-app/
├── client/      # The React Native application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── constants/  # enum for screen route names
│   │   ├── screens/    # Top-level screen components
│   │   └── types/      # TypeScript type definitions
│   ├── .env            # Environment variables - IP(SERVER_URL)
│   └── App.tsx         # Main app component with navigation
└── server/             # The Node.js WebSocket server
    ├── index.js        # Main server logic
    ├── .env            # Environment variables - PORT
    └── package.json
```

---

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js installed on your machine
- A mobile device or emulator for running the React Native app

### 1. Clone the Repository

```bash
git clone - https://github.com/avneet-singh843/chat-app.git
cd chat-app
```

### 2. Setup the Backend Server

```bash
# Navigate to the server directory
cd server

# Install NPM packages
npm install

# Start the server
node index.js
```

The server should now be running on `http://localhost:3001`.

### 3. Setup the React Native Client

```bash
# Navigate to the client directory from the root folder
cd client

# Install NPM packages
npm install

# (For iOS only) Install pods
cd ios && pod install && cd ..
```

### 4. Configure the Server URL

> **This is a critical step.**

1. Find your computer's local network IP address.

   - On macOS: `ifconfig | grep "inet "`
   - On Windows: `ipconfig` (Look for the IPv4 Address)

2. Open the file `ChatAppClient/src/screens/ChatScreen.tsx`.
3. Change the `SERVER_URL` constant to your computer's IP address.

```ts
// Example
const SERVER_URL = "http://192.168.1.12:3001";
```

### 5. Run the App

```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

---

## 🔮 Future Scope

This project provides a solid foundation that can be extended with several professional-grade features:

- **Multiple Chat Rooms:** Refactor the backend to support distinct rooms, allowing users to join or create different conversations.
- **Typing Indicators:** Implement a "User is typing..." feature.
- **Read Receipts:** Show when a message has been delivered and read.
- **Push Notifications:** Use Firebase Cloud Messaging (FCM) for background notifications.
- **User Authentication:** Implement secure authentication (e.g., JWT-based login).

---
