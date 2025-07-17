# 🎉 EazyVenue – Venue Booking Platform

EazyVenue is a full-stack web application where users can search, book, and manage event venues. Admins (dealers) can add and edit venue listings with images, while clients can browse and book venues. This project was built as part of the **EazyVenue.com hiring assignment**.

---

## 🚀 Tech Stack

### Frontend:
- React.js
- Tailwind CSS 


### Backend:
- Node.js
- Express.js
- MongoDB 
- JWT (Authentication)
- Multer (for image uploads)
- Stripe (Payment Gateway)



## 🧩 Features

### 🧑 For Dealers (Admins):
- Sign in to dealer dashboard
- Add new venue with:
  - Name, location, address, price, capacity
  - Description, category
  - Upload venue images
- Edit or delete existing venues

### 👥 For Clients:
- Sign up / login
- Browse venue listings by category
- View venue details (with map & image preview)
- Book a venue (form or button)
- Book a venue and pay securely via Stripe



## 💳 Stripe Payment Integration

- Users can **make payments securely** using their debit/credit cards via **Stripe Checkout**.
- Payment success triggers backend booking logic.
- Payment history and receipt can be tracked (feature ready for extension).


## 🔐 Authentication

- **JWT-based authentication**
- Role-based middleware for route protection:
  - `dealerMiddleware` → restricts to dealer-only routes
  - `clientMiddleware` → restricts to client-only routes

---

## 🖼️ Image Upload

- Venue images are uploaded using `Multer` to a server `/uploads` directory
- Uploaded files are previewed in both Add and Edit venue forms

---

## 🌍 Map Integration

- Uses [PositionStack API](https://positionstack.com/) to fetch coordinates and show live map on the venue details page.



## 🚀 Future Enhancements (Ideation Task)

This section outlines potential advanced features to elevate the EazyVenue platform. These ideas focus on scalability, user insights, and administrative control.

---

### 📊 1. Capturing User Search Activity

**Goal:** Track what users are searching to recommend venues, improve UI/UX, and enable admins to make data-driven decisions.

**Approach:**
- Create a `searchLogs` collection in MongoDB.
- On each search query (by location, category, price range), capture:
  - User ID (if logged in)
  - Timestamp
  - Search keywords or filters
- Use Redux middleware or Axios interceptor to auto-log search requests.
- Optional: Integrate with an analytics tool like Mixpanel or Google Analytics for real-time insights.

**Benefit:** Enables personalized recommendations, heatmaps of popular searches, and improved search engine.

---

### 📈 2. Admin Analytics Dashboard

**Goal:** Give venue owners and admins insight into platform usage, booking trends, and financials.

**Approach:**
- Build a dashboard route `/admin/analytics`
- Backend route `/api/admin/analytics` to fetch data like:
  - Total bookings
  - Monthly revenue (using Stripe data)
  - Top-performing venues
  - Booking trends (daily, weekly, monthly)
- Use chart libraries (e.g., Recharts, Chart.js) for visualization.
- Protect with `adminMiddleware` for secure access.

**Benefit:** Helps owners optimize pricing, plan marketing campaigns, and monitor performance.

---

### 📅 3. Calendar View for Venue Availability

**Goal:** Help users visualize availability and avoid double bookings.

**Approach:**
- Store booking dates per venue in the `bookings` collection.
- On the venue detail page, render a calendar (e.g., `react-calendar`, `FullCalendar`) highlighting:
  - Booked dates (in red)
  - Available dates (in green)
- On venue creation/edit, allow dealers to block custom dates (e.g., maintenance).
- Validate new booking dates against this calendar on the backend.

**Benefit:** Enhances booking transparency, reduces conflicts, and improves user experience.

---

### 🔐 4. Basic Authentication for Admin and Venue Owners

**Goal:** Strengthen security and ensure only authorized users access specific functionality.

**Approach:**
- Already implemented basic JWT authentication with roles (`client`, `dealer`)
- Improve by:
  - Expiring JWTs automatically after fixed duration
  - Using refresh tokens stored securely (e.g., in HttpOnly cookies)
  - Adding multi-factor authentication (MFA) for dealer/admin login
- Optional: Add role-based dashboards using conditional rendering.

**Benefit:** Protects sensitive actions like payments, venue edits, and analytics from unauthorized access.

---
