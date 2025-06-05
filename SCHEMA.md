# 📘 SCHEMA.md – Book Review API

This file contains the database schema design used for the Book Review API project.

---

## 🧑‍💻 User Schema

| Field       | Type     | Description             |
| ----------- | -------- | ----------------------- |
| `_id`       | ObjectId | Auto-generated          |
| `username`  | String   | Required, unique        |
| `email`     | String   | Required, unique        |
| `password`  | String   | Hashed using bcrypt     |
| `createdAt` | Date     | Timestamp (default now) |

---

## 📚 Book Schema

| Field         | Type     | Description                      |
| ------------- | -------- | -------------------------------- |
| `_id`         | ObjectId | Auto-generated                   |
| `title`       | String   | Required                         |
| `author`      | String   | Required                         |
| `genre`       | String   | Optional                         |
| `description` | String   | Optional                         |
| `createdBy`   | ObjectId | Reference to `User` who added it |
| `createdAt`   | Date     | Timestamp                        |

- One Book is added by one User (`createdBy`)
- One Book can have multiple Reviews

---

## 🌟 Review Schema

| Field       | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| `_id`       | ObjectId | Auto-generated                      |
| `book`      | ObjectId | Reference to `Book`                 |
| `user`      | ObjectId | Reference to `User` (review author) |
| `rating`    | Number   | Required, range 1–5                 |
| `comment`   | String   | Optional                            |
| `createdAt` | Date     | Timestamp                           |

- One User can write one Review per Book
- Reviews are tied to both Book and User

---

## 🔄 Relationships Summary

```
User (1) ───< (many) Book
User (1) ───< (many) Review
Book (1) ───< (many) Review
```

---

## 🗂️ ER Diagram (Optional – Text Version)

```text
[User]
 _id
 username
 email
 password

        |
       (1)──< creates
        |
     [Book]
       _id
       title
       author
       genre
       description
       createdBy (User _id)

        |
       (1)──< receives
        |
     [Review]
       _id
       book (Book _id)
       user (User _id)
       rating
       comment
```
