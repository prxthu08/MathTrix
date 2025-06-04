# MathTrix

A web application for teachers to upload and manage study materials, and for students to access them.

## Features

- User authentication (Teachers and Students)
- File upload functionality for study materials
- Material organization by subjects
- Download functionality for students
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mathtrix
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register`