# 🌍 Wanderlust Booking App  
A full-stack vacation rental web application built with **Node.js**, **Express**, and **MongoDB**, inspired by platforms like Airbnb.  
Users can browse, review, and share unique places to stay.  

![Wanderlust Banner](https://via.placeholder.com/1000x300?text=Wanderlust+Booking+App) <!-- Replace with your screenshot/banner -->

---

## 📌 Table of Contents  
- [📜 Project Overview](#-project-overview)  
- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [🚀 Getting Started](#-getting-started)  
- [📸 Screenshots](#-screenshots)  
- [📂 Project Structure](#-project-structure)  
- [📌 Project Status](#-project-status)  
- [📬 Contact](#-contact)  

---

## 📜 Project Overview  

Wanderlust is a dynamic and responsive web platform where users can browse a wide variety of property listings. The application follows the MVC (Model-View-Controller) architecture and is built from the ground up, featuring RESTful routing and a clean, modern user interface.  

---

## ✨ Features  

### Implemented Features:  
- **Browse Listings:** View all available properties on a clean, responsive grid.  
- **View Listing Details:** Click on any property to see more details, including description, price, and location.  
- **Create Listings:** Add new properties to the platform through a simple and intuitive form.  
- **Edit Listings:** Update the information for any existing property.  
- **Delete Listings:** Remove properties from the database.  
- **Review System:** Users can add, edit, and delete reviews for listings.  
- **Sessions & Cookies:** Persistent interaction data using `express-session` and cookies.  
- **Flash Messages:** Instant feedback for actions using `connect-flash`.  
- **Error Handling:** Centralized handling with a custom `ExpressError` class.  
- **EJS-Mate Templates:** DRY and reusable layouts for consistent UI.  
- **Modular Express Router:** Clean separation of routes for scalability.  

### Upcoming Features:  
- **User Authentication:** Secure user sign-up and login functionality.  
- **Authorization & Permissions:** Ensure users can only edit or delete their own listings.  
- **Database & Schema Validation:** Implement robust server-side validation to ensure data integrity.  
- **Image Uploads:** Store user-uploaded images in the cloud.  

---

## 🛠 Tech Stack  

![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)  
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)  
![EJS](https://img.shields.io/badge/EJS-8C8C8C?logo=javascript&logoColor=white)  

**Backend:** Node.js, Express.js  
**Frontend:** HTML, CSS, JavaScript, EJS  
**Database:** MongoDB + Mongoose ODM  
**Styling:** Bootstrap 5  
**Templating:** EJS-Mate  
**Utilities:** Method-Override, Connect-Flash, Express-Session  

---

## 🚀 Getting Started  

### Prerequisites  
- [Node.js](https://nodejs.org/en/)  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/)  

### Installation  
```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/wanderlust-booking-app.git

# 2️⃣ Navigate to project directory
cd wanderlust-booking-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start MongoDB server

# 5️⃣ Run the application
node app.js

📂 Project Structure
wanderlust-booking-app/
│── models/          # Mongoose Schemas  
│── routes/          # Express Routers (Listings, Reviews)  
│── views/           # EJS Templates  
│── public/          # Static Files (CSS, JS, Images)  
│── app.js           # Main Entry Point  
│── utils/           # Error Handlers, Middleware  
│── package.json  
│── README.md  

📌 Project Status

🚧 In Development

✅ Recently added: Review system, sessions, cookies, flash messages, ExpressError handling, modular routing.

🔜 Upcoming: Authentication, image uploads, advanced validation.

📬 Contact:-

👤 R.Mourya
📧 Email: mourya7537@gmail.com
🔗 GitHub: https://github.com/MouryaRaviKumar