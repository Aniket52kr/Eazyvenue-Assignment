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



