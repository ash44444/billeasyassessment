# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to register/login, add books, submit reviews, and search books — with JWT authentication and robust validation.

Deployment link-https://billeasyassessment.onrender.com/

## 🛠️ Project Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ash44444/billeasyassessment.git
cd billeasyassessment

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the root folder with:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/book-review-db
JWT_SECRET=yourStrongJWTSecretHere

4. Run the development server

npm run dev

The server will start at: http://localhost:5000
🚀 How to Run Locally

    Make sure MongoDB is running locally or use a cloud MongoDB URI.

    Use tools like Postman or curl for API testing.

    Securely keep your .env file and never commit secrets to GitHub.

📌 API Endpoints Overview
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login and receive JWT
Books
Method	Endpoint	Description
POST	/api/books	Add new book (auth required)
GET	/api/books	Get all books with pagination & optional filters
GET	/api/books/:id	Get book by ID with average rating & reviews
GET	/api/books/search?query=	Search books by title or author (case-insensitive, partial matches)
Reviews
Method	Endpoint	Description
POST	/api/books/:id/reviews	Submit a review (auth required)
PUT	/api/reviews/:id	Update your own review
DELETE	/api/reviews/:id	Delete your own review
📊 Example API Requests
Signup new user

curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"ashish","email":"ashish@example.com","password":"123456"}'

Login and get JWT token

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ashish@example.com","password":"123456"}'

Add a new book (replace YOUR_JWT_TOKEN with actual token)

curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title":"The Hobbit","author":"J.R.R. Tolkien","genre":"Fantasy","description":"Classic fantasy novel"}'

Get paginated books (page=1, limit=10)

curl "http://localhost:5000/api/books?page=1&limit=10"

Search books by title or author

curl "http://localhost:5000/api/books/search?query=tolkien"

Get book details with average rating and paginated reviews

curl "http://localhost:5000/api/books/BOOK_ID?page=1&limit=5"

Submit a review for a book

curl -X POST http://localhost:5000/api/books/BOOK_ID/reviews \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{"rating":5,"comment":"Loved it!"}'

Update your review

curl -X PUT http://localhost:5000/api/reviews/REVIEW_ID \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{"rating":4,"comment":"Updated comment"}'

Delete your review

curl -X DELETE http://localhost:5000/api/reviews/REVIEW_ID \
-H "Authorization: Bearer YOUR_JWT_TOKEN"

🧠 Design Decisions & Assumptions

    Authentication: JWT used for stateless, secure user sessions.

    Password Security: Passwords hashed with bcrypt before storing.

    One Review Per User Per Book: Enforced using a unique compound index on (userId, bookId).

    Pagination: Supported for books and reviews to handle large datasets efficiently.

    Search: Case-insensitive partial matching on book title and author using MongoDB regex queries.

    Average Rating: Computed dynamically using aggregation when fetching book details.

    Data Validation: Basic validation done in controllers for required fields and data types.

    Modular Architecture: Code separated into controllers, models, routes, and middleware for maintainability and scalability.

    Security: Helmet and CORS enabled (if included in your project), and environment variables used for secrets.

    Assumption: User roles are not implemented (all authenticated users have equal permissions for this basic project).

    Error Handling: Basic error handling middleware included for clarity and clean responses.

🗂️ Database Schema Summary
User
Field	Type	Notes
username	String	Unique, required
email	String	Unique, required
password	String	Hashed, required
Book
Field	Type	Notes
title	String	Required
author	String	Required
genre	String	Required
description	String	Optional
createdBy	ObjectId	Reference to User
Review
Field	Type	Notes
userId	ObjectId	Reference to User
bookId	ObjectId	Reference to Book
rating	Number	1–5 scale
comment	String	Optional

Unique compound index on (userId, bookId) prevents duplicate reviews.
🧪 Advanced Postman Testing Tips

    Environment Variables: Define {{baseUrl}} (e.g., http://localhost:5000) and {{jwtToken}} in Postman environment.

    Use Pre-request scripts to automatically refresh tokens if implementing refresh flow.

    Use Tests tab in Postman to assert status codes, response structure, and extract tokens for chaining requests.

    Use Collection Runner to run bulk tests with data files (CSV/JSON) for load and bulk testing.

    Save requests with descriptions and example responses for team collaboration.

👤 Author

Ashish Maner
GitHub Repository
