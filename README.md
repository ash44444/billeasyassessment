📚 Book Review API – Node.js + Express + MongoDB

Deployment link-https://billeasyassessment.onrender.com

A RESTful backend API for managing Books and Reviews with secure user authentication using JWT, built in Node.js, following professional structure for real-world projects.
🚀 Tech Stack

    Node.js + Express

    MongoDB with Mongoose

    JWT Authentication

    bcryptjs for password hashing

    dotenv, helmet, cors for environment and security

✅ Features

    🔐 JWT-based Signup/Login

    📚 CRUD: Add/Get Books

    🌟 Submit/Update/Delete Reviews

    📊 Average rating calculation per book

    🔍 Search by Title/Author (partial & case-insensitive)

    📄 Pagination support for books & reviews

📁 Folder Structure

book-review-api/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── bookController.js
│ └── reviewController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── Book.js
│ ├── Review.js
│ └── User.js
├── routes/
│ ├── authRoutes.js
│ ├── bookRoutes.js
│ └── reviewRoutes.js
├── utils/
│ └── generateToken.js
├── .env
├── server.js
├── package.json
└── README.md

🧪 How to Run Locally
✅ 1. Clone the Repository

git clone https://github.com/your-username/book-review-api.git
cd book-review-api

✅ 2. Install Dependencies

npm install

✅ 3. Configure .env

Create a .env file in root:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/book-review-db
JWT_SECRET=yourSuperSecretJWT

✅ 4. Start Server

npm run dev

Server runs at:
http://localhost:5000
📌 API Endpoints Summary
🔐 Auth
Method Endpoint Description
POST /api/auth/signup Register a user
POST /api/auth/login Login and get JWT
📘 Book
Method Endpoint Description
GET /api/books Get all books (pagination, filters)
GET /api/books/search?query= Search by title/author
GET /api/books/:id Get book + average rating + reviews
POST /api/books Add new book (auth required)
✍️ Review
Method Endpoint Description
POST /api/books/:id/reviews Add review (1/user/book)
PUT /api/reviews/:id Update own review
DELETE /api/reviews/:id Delete own review
📊 Example API Requests (Postman / Curl)
✅ Register

curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"ashish", "email":"ashish@example.com", "password":"123456"}'

✅ Login

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ashish@example.com", "password":"123456"}'

✅ Add Book

curl -X POST http://localhost:5000/api/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"title":"Harry Potter", "author":"J.K. Rowling", "genre":"Fantasy", "description":"Magic book"}'

✅ Search Books

curl http://localhost:5000/api/books/search?query=potter

🧠 Design Decisions & Notes

    Used Mongoose for schema enforcement and relationships.

    One review per user per book enforced by logic.

    All protected routes use middleware authMiddleware.js.

    Project uses modular folder-based architecture.

    Clean, consistent HTTP status codes.

📦 Future Improvements

    Add Swagger API Docs

    Admin Role for managing books/reviews

    User Profile Management

    Rate Limiting

🧑‍💻 Author

Ashish Maner – LinkedIn
