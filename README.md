# E-Commerce Web Application

A full-stack e-commerce web application designed to deliver a smooth online shopping experience. The platform supports user authentication, product browsing, cart management, order processing, and includes a dedicated admin panel for managing products, users, and orders.

This project demonstrates real-world full-stack development using modern web technologies and deployment practices.

---

## Live Links

- Frontend: https://e-com-forever.onrender.com/
- Admin Panel: https://e-com-admin-8vop.onrender.com
- Backend API: https://e-com-backend-df0w.onrender.com

---

## Project Overview

This e-commerce application is built with a scalable architecture, separating frontend, backend, and admin functionalities into independent services. It focuses on clean UI, secure APIs, and maintainable code structure.

---

## Key Features

### User Module
- User registration and login
- Secure authentication using JWT
- Browse products by category
- Search and filter products
- Add and remove products from cart
- Place orders
- View order history

### Admin Module
- Admin authentication
- Add, update, and delete products
- Manage product categories
- View and manage customer orders
- Manage registered users

---

## Screenshots


Example:
![Homepage](https://i.postimg.cc/jSBNX1zf/Screenshot-2025-12-25-115715.png)
![Collections](https://i.postimg.cc/Bvx8CnZW/Screenshot-2025-12-25-115947.png)
![Admin Dashboard](https://i.postimg.cc/PJFNqLyH/Screenshot-2025-12-25-115921.png)

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- HTML5
- tailwind
- Axios

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)

### Deployment
- Render

---

## Project Structure

```
e-commerce-project/
├── backend/
├── frontend/
├── admin/

```

---

## Environment Variables

Backend `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Frontend/Admin `.env`:
```
VITE_API_URL=https://your-backend-url
```

---

## Local Setup

Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd frontend
npm install
npm run dev
```

Admin:
```
cd admin
npm install
npm run dev
```

---

## Future Enhancements

- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Email notifications

---

## Author

Lalit P

---

## License

MIT License
