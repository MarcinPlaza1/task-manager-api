
# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express.js. It offers user authentication, task management (creation, updates, deletion), task filtering, and scheduling task reminders. The API is secured with features like CSRF protection and XSS prevention, using JWT for authentication.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Description

Task Manager API allows users to manage their tasks efficiently. Users can register, authenticate, create tasks, update them, delete them, and set reminders. Security measures like CSRF protection, XSS prevention, and JWT authentication are implemented. The API also includes automatic email reminders for tasks.

## Features

- **User Authentication**: Users can register and log in using JWT tokens.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Task Filtering, Sorting, and Pagination**: Filter tasks by status or tags and sort them by completion, deadline, etc.
- **Task Reminders**: Automatic email reminders for tasks using `node-cron`.
- **Security**: CSRF protection with `csurf`, XSS prevention with `xss-clean`, and security headers using `helmet`.
- **API Documentation**: Integrated Swagger documentation for detailed API specs.
- **Email Notifications**: Email reminders sent via Nodemailer.
- **Testing**: Comprehensive unit and integration tests using Mocha, Chai, and Supertest.

## Technologies

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database used for storing user and task data.
- **Mongoose**: ODM for MongoDB to model the data.
- **JWT**: JSON Web Tokens for authentication.
- **Nodemailer**: Email sending service for task reminders.
- **Swagger**: API documentation for easy understanding of the endpoints.
- **Mocha/Chai/Supertest**: Testing frameworks for unit and integration tests.

## Setup

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** v14 or higher
- **MongoDB**: Either a MongoDB Atlas account or a local MongoDB instance.
- **Git**

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MarcinPlaza1/task-manager-api
   cd task-manager-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```bash
MONGODB_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
EMAIL=your-email@example.com
EMAIL_PASSWORD=your-email-password
PORT=3002
```

## Running the Application

To start the application, use:

```bash
npm start
```

## Testing

To run unit and integration tests, use:

```bash
npm test
```

## Deployment

You can deploy the Task Manager API on platforms like Heroku or DigitalOcean. Ensure the following environment variables are set correctly on your deployment platform:

- `MONGODB_URL`
- `JWT_SECRET`
- `EMAIL`
- `EMAIL_PASSWORD`

## License

This project is licensed under the ISC License.
