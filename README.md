# InternetSecurity End-to-End Encrypted Email Service

## Overview

This project is an end-to-end encrypted email service designed to provide secure communication over the internet. The service ensures that emails are encrypted on the sender's side and decrypted only by the intended recipient, guaranteeing privacy and security.

## Features

- End-to-end encryption of emails
- User authentication and authorization
- Secure storage of encrypted emails
- Responsive user interface
- Integration with popular email services

## Prerequisites

To run this application, you need to have the following installed on your system:

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MySQL (for email storage)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ArdiZariqi/InternetSecurity_end-to-end-encrypted-email-service.git
   cd InternetSecurity_end-to-end-encrypted-email-service
   ```
2. **Install the dependencies:**

   ```bash
   npm install
   ```
3. **Set up the environment variables:**
   
   Create a .env file in the root directory and add the following variables:
   
   ```env
   MYSQL_HOST=<your-mysql-host>
   MYSQL_USER=<your-mysql-user>
   MYSQL_PASSWORD=<your-mysql-password>
   MYSQL_DATABASE=<your-mysql-database>
   SECRET_KEY=<your-secret-key>
   ```
## Running the Application

1. **Start the development server:**
   
   ```bash
   npm start
   ```
   This will start the server on http://localhost:3000.

2. **Access the application:**

   Open your web browser and navigate to http://localhost:3000 to use the email service.

## Project Structure

- **src/**: Contains the source code for the application
  - **controllers/**: Request handlers and business logic
  - **models/**: Database models
  - **routes/**: Application routes
  - **utils/**: Utility functions
- **public/**: Static files (HTML, CSS, JavaScript)
- **server.js**: Entry point of the application
- **package.json**: Project metadata and dependencies
- **.env**: Environment variables (not included in the repository for security reasons)


 
