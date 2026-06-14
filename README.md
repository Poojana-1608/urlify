# URLIFY - URL Shortener

## Project Description

URLIFY is a web application developed to shorten long URLs into compact and shareable links. The application allows users to create, manage, and track shortened URLs through a simple and user-friendly dashboard.

This project was developed as part of a hackathon to learn full-stack web development concepts including authentication, database management, API development, and deployment.

## Features

* User Registration and Login
* URL Shortening
* URL Redirection
* Click Tracking
* QR Code Generation
* Copy Short URL
* Delete URL
* Dashboard Analytics

## Technologies Used

### Frontend

* React.js
* CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JWT Authentication
* bcrypt.js

### Deployment

* Render
* GitHub


## Assumptions Made

* Users need to create an account before using the application.
* Each generated short URL is unique.
* Users can view and manage only their own URLs.
* Internet connectivity is required for accessing the application.


## Planning and Development Process

Before development, the main requirements of the application were identified:

1. User Authentication
2. URL Shortening
3. URL Management
4. Click Analytics
5. QR Code Generation
6. Deployment

The project was developed in the following stages:

1. Designing the database structure.
2. Creating backend APIs using Express.js.
3. Implementing user authentication.
4. Developing the React frontend.
5. Integrating analytics and QR code features.
6. Deploying the application on Render.
7. Testing and fixing bugs.


## Architecture Diagram

text
User
  |
  v
React Frontend
  |
  v
Node.js + Express Backend
  |
  v
MongoDB Atlas


## Project Workflow

1. User registers and logs in.
2. User enters a long URL.
3. The system generates a unique short URL.
4. The short URL is stored in the database.
5. Users can copy or share the generated link.
6. When the link is opened, it redirects to the original URL.
7. Click count and visit details are updated automatically.

## Sample Output

Original URL:

https://www.google.com

Generated Short URL:

https://urlify-backend-poojana.onrender.com/AbCd123


## Demo Video

Video Link:

https://youtu.be/3-WXDxsLld0?si=oefnz48lxoyI_N5C


## GitHub Repository

https://github.com/Poojana-1608/urlify

## Deployment Link

https://urlify-8mvr.onrender.com


## Developed By

Poojana V V

B.Tech Student

This project is a part of a hackathon run by https://katomaran.com
