# E-Commerce Platform

A full-stack, responsive e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and modern web technologies. This project features secure authentication, state management, payment processing with Stripe, and real-time session handling with Redis.

## 🤔 Why This Platform?

**Why do we need this platform?**
In today's fast-paced digital world, businesses need robust, scalable, and blazingly fast e-commerce solutions to provide a seamless shopping experience. Traditional platforms can be clunky, slow, or lack the flexibility needed to scale easily. 

This platform was built to solve these problems by utilizing modern, high-performance tools:
- **Speed & Caching:** Upstash Redis is used to heavily cache frequent queries and manage session tokens, delivering millisecond response times.
- **Scalability & Separation of Concerns:** A fully decoupled REST API (Node/Express) and a modern frontend (React/Vite) mean your shop can easily scale or be replaced without affecting the other layer.
- **Secure by Default:** It leverages best-in-class security patterns—like HttpOnly cookies for JWTs and fully integrated Stripe for PCI-compliant checkout—keeping both the store owners and the customers safe.

## 🚀 Features

- **User Authentication:** Secure signup and login using JWT (JSON Web Tokens) stored securely in HttpOnly cookies.
- **State Management:** Modern state management on the frontend using Zustand.
- **Real-Time Data Handling:** Fast caching and refresh token management via Upstash Redis.
- **Payment Gateway:** Seamless checkout and payment processing integrated with Stripe.
- **Responsive UI:** Beautiful, responsive, and accessible user interface built with Tailwind CSS and Framer Motion for animations.
- **Product Management:** Browse, view, and manage product catalogs efficiently.

## 💻 Tech Stack

**Frontend:**
- React 19 (via Vite)
- Tailwind CSS (v4)
- Zustand (State Management)
- Framer Motion (Animations)
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Redis (ioredis)
- JWT (Authentication)
- Stripe (Payments)
- Cloudinary (Image storage/management)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- A MongoDB cluster or local instance
- A Redis instance (e.g., Upstash)

## ⚙️ Setup and Installation

1. **Install Dependencies**
   
   Install backend dependencies from the root directory:
   ```bash
   npm install
   ```
   
   Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the root directory and add the following keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   UPSTASH_REDIS_URL=your_redis_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

3. **Running the Application**

   You can run both the frontend and backend servers simultaneously.
   
   **To start the backend (Port 5000):**
   ```bash
   npm run dev
   ```
   
   **To start the frontend (Port 5173):**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the App**
   
   Open your browser and navigate to `http://localhost:5173`.

## 📜 License
This project is licensed under the ISC License.
