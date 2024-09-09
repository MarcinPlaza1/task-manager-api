# Task Manager API

## Description

Task Manager API is a RESTful API built with Node.js and Express.js that allows users to manage their tasks. The API provides features like user authentication, task creation, updates, and deletions, along with scheduling task reminders. It also includes security features like CSRF protection, XSS prevention, and uses JWT tokens for authentication.

## Features

- **User Authentication**: Register and login using JWT tokens.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Task Filtering, Sorting, Pagination**: Filter tasks by status, tags, sort them by completion, deadline, etc.
- **Task Reminders**: Automatic email reminders for tasks using `node-cron`.
- **Security**: Uses `helmet`, `xss-clean`, and `csurf` for enhanced security.
- **API Documentation**: Swagger integration for detailed API documentation.
- **Email Notifications**: Sending emails via Nodemailer.
- **Testing**: Unit and integration tests using Mocha, Chai, and Supertest.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication with JSON Web Tokens.
- **Nodemailer**: Email sending service.
- **Swagger**: API documentation.
- **Mocha/Chai/Supertest**: Testing framework.

## Setup

### Prerequisites

- **Node.js** (version 14 or higher) installed.
- **MongoDB Atlas** account or local MongoDB instance.
- **Git** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   cd task-manager-api

2. **Install dependencies**:
    ```bash
    npm install

3. **Create a .env file in the root of the project and add the following environment variables**:
    ```bash
    MONGODB_URL=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    EMAIL=your-email@example.com
    EMAIL_PASSWORD=your-email-password
    PORT=3002

4. **Run the application**:
    ```bash
    npm start

5. **Run test**:
    ```bash
    npm test

## API Endpoints
Method	Endpoint	        Description	                    Authentication
POST	/users/register	    Register a new user	            No
POST	/users/login	    Login and get JWT token	        No
POST	/users/logout	    Logout a user	                Yes
GET	    /users/me	        Get current user profile	    Yes
POST	/tasks	            Create a new task	            Yes
GET	    /tasks	            Get all tasks with filtering	Yes
GET	    /tasks/:id	        Get a task by ID	            Yes
PATCH	/tasks/:id	        Update a task	                Yes
DELETE	/tasks/:id	        Delete a task	                Yes

## Project Structure
.
├── src
│   ├── models          # Mongoose models for User and Task
│   ├── routes          # API route definitions for users and tasks
│   ├── middleware      # Middleware for authentication
│   ├── notifications   # Scheduled tasks and email reminders
│   ├── swagger.js      # Swagger documentation setup
│   ├── db.js           # MongoDB connection logic
│   └── app.js          # Express app setup
├── tests               # Mocha/Chai tests for the API
├── .env                # Environment variables (not included in the repository)
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies and scripts
└── README.md           # Project documentation

## Deployment
For deployment, you can use platforms such as Heroku or DigitalOcean. Ensure that environment variables (MONGODB_URL, JWT_SECRET, etc.) are correctly configured on your deployment platform.

## License
This project is licensed under the ISC License.