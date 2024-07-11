# Load Plan Application

## Description

This Loan Plan Application is built using NestJS, Prisma ORM, and MongoDB

## Features

- Create, update, and soft delete loan plan records.
- Retrieve records.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (>= 18.x)
- npm
- MongoDB (local or remote instance)
- Prisma CLI (`npm install -g prisma`)

## Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   DATABASE_URL="mongodb://localhost:27017/your-database-name"
   ```

   Replace `your-database-name` with the name of your MongoDB database.

   ```

3. **Start the Application**

   Start the development server:

   ```bash
   npm run start:dev
   ```

   The application will be running at `http://localhost:3000`.

## API Endpoints

- **GET `/loan-plan`**: Retrieve loan plans.

- **POST `/load-plan/bulk-action`**: Perform create, update, or soft delete operations on multiple loan plans in one request.
