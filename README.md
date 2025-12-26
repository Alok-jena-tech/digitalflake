# Digitalflake -  Dashboard

A **Fullstack MERN** (MongoDB, Express.js, React.js, Node.js) project for managing categories, subcategories, and products in an  dashboard.


## Overview
Digitalflake is an admin dashboard application where users can manage categories, subcategories, and products. It includes features for **adding, editing, deleting**, and viewing all entities. Built using MERN stack, it demonstrates full CRUD functionality with a responsive UI.

---

## Features
- Admin login/logout
- Dashboard overview
- Add, edit, delete **Categories**
- Add, edit, delete **Subcategories**
- Add, edit, delete **Products**
- Data persistence using **MongoDB**
- RESTful APIs with **Express.js**
- Secure password handling with **bcrypt** 
- Dynamic React components and routing


---

## Tech Stack
- **Frontend:** React.js, CSS Modules, React Router, Context Api
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT 
- **Others:** bcrypt, dotenv,Multer,Nodemailer
----

## Installation


```bash
cd backend

npm install
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN
EMAIL_PASSWORD=your_email_smtp_password
EMAIL=your_email@example.com
PORT=5000
npm run dev


for Frontend

cd frontend
cd my-react-app
VITE_BASE_URL=backend url
npm install
npm run dev



