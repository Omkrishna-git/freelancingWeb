# Freelancing Web Platform

A full-stack web application for freelancers and companies to collaborate, post projects, write blogs, and manage profiles.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Routes](#api-routes)
  - [Company Routes](#company-routes)
  - [Freelancer Routes](#freelancer-routes)
  - [Project Routes](#project-routes)
  - [Freelancer Project Routes](#freelancer-project-routes)
  - [Blog Routes](#blog-routes)
- [Blog API Details](#blog-api-details)
- [Required Parameters & Formats](#required-parameters--formats)
- [Environment Variables](#environment-variables)
- [Common Issues](#common-issues)

---

## Project Structure

```
Backend/
  controllers/
  models/
  routes/
  middlewares/
  uploads/
  server.js
  .env
Frontend/
  src/
    pages/
    components/
    assets/
  index.html
  .env
```

---

## Backend Setup

1. Install dependencies:
   ```
   cd Backend
   npm install
   ```
2. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
3. Start the server:
   ```
   npm start
   ```

---

## Frontend Setup

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```
   npm run dev
   ```

---

## API Routes

### Company Routes (`/api/companies`)
- `POST /register` - Register a company
- `POST /login` - Login as company
- `GET /:id` - Get company profile
- `PUT /:id` - Update company profile
- `PUT /upload/logo/:id` - Upload company logo

### Freelancer Routes (`/api/freelancers`)
- `POST /register` - Register a freelancer
- `POST /login` - Login as freelancer
- `GET /:id` - Get freelancer profile
- `PUT /:id` - Update freelancer profile

### Project Routes (`/api/projects`)
- `POST /createProject` - Create a new project (company only, requires JWT)
- `GET /` - List all projects
- `GET /available` - List available projects
- `GET /accepted` - List accepted projects (by freelancer)
- `PUT /accept/:projectId` - Accept a project (freelancer only, requires JWT)

### Freelancer Project Routes (`/api/freelancerprojects`)
- `POST /createProject` - Create a freelancer project (requires JWT)
- `GET /` - List all freelancer projects
- `GET /accepted` - List accepted freelancer projects
- `GET /available` - List available freelancer projects
- `GET /:id` - Get freelancer project by ID
- `PUT /:id` - Update freelancer project (requires JWT)
- `DELETE /:id` - Delete freelancer project (requires JWT)

### Blog Routes (`/api/blogs`)
- `POST /writeBlog` - Create a new blog (requires JWT)
- `GET /` - List all blogs
- `GET /:id` - Get blog by ID

---

## Blog API Details

### Create Blog (`POST /api/blogs/writeBlog`)
**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`

**Body (FormData):**
- `userId` (string, required) - MongoDB ObjectId of user
- `userModel` (string, required) - "Freelancer" or "Company"
- `title` (string, required)
- `slug` (string, required, unique)
- `author` (string, required)
- `category` (string, required)
- `status` (string, required, "published" or "draft")
- `tags` (string, required, JSON stringified array: `["tag1","tag2"]`)
- `content` (string, required)
- `thumbnail` (file, optional)
- `attachedFile` (file(s), optional)

**Example FormData:**
```
userId: 60f7c2b8e1b1c8a1d4e8b456
userModel: Freelancer
title: How to Get Started in Freelancing
slug: how-to-get-started-in-freelancing
author: John Doe
category: Digital marketing guides
status: published
tags: ["freelancing","guide"]
content: This is the blog content...
thumbnail: <file>
attachedFile: <file1>, <file2>
```

### Get All Blogs (`GET /api/blogs`)
Returns an array of all blog objects.

### Get Blog by ID (`GET /api/blogs/:id`)
Returns a single blog object.

---

## Required Parameters & Formats

- **Slug:**  
  Must be unique. Format: lowercase, hyphen-separated, no spaces or special characters.  
  Example: `how-to-get-started-in-freelancing`

- **Tags:**  
  Send as a JSON stringified array.  
  Example: `["tag1","tag2"]`

- **Files:**  
  Use `FormData` for file uploads.  
  - `thumbnail` (single file)
  - `attachedFile` (multiple files allowed)

- **Date:**  
  Automatically set by backend (`createdAt`). You may send it, but it's optional.

---

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication
- `PORT` - Server port (default: 8000)

---

## Common Issues

- **500 Internal Server Error:**  
  - Check backend logs for validation errors or missing fields.
  - Ensure all required fields are sent in the correct format.
  - Make sure MongoDB is running and `.env` is configured.

- **Slug Not Unique:**  
  - Change the blog title to generate a new slug.

- **File Uploads Not Working:**  
  - Use `FormData` in frontend.
  - Ensure backend uses `multer` middleware.

---

## Contact

For issues or questions, please open an issue on GitHub or contact the