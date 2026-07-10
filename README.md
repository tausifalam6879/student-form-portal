# AI Learning & Dataset Submission Portal

A simple web portal for students to submit AI/ML workshop registrations, dataset ideas, mini-project proposals, and learning feedback.

This project is intentionally lightweight. It does not claim to run a real AI model. The AI/Data Science theme is focused on collecting learning forms, dataset ideas, and project proposals using HTML, CSS, JavaScript, and a MySQL schema.

## Features

- AI/ML learning notifications
- Dataset idea submission form
- Mini project proposal form
- Workshop registration form
- Learning feedback form
- Frontend demo with localStorage
- MySQL database schema for future storage
- Static frontend that can run directly in a browser

## Tech Stack

- HTML
- CSS
- JavaScript
- MySQL
- Bootstrap

## Project Structure

```text
student-form-portal/
|-- index.html
|-- style.css
|-- script.js
|-- database.sql
```

## Run Frontend Demo

Open `index.html` in a browser. The demo saves submissions in localStorage and does not need a server.

## MySQL Schema

The `database.sql` file contains a simple MySQL schema and sample AI/Data Science form data. It is included for database design and future backend integration.

Important: HTML/CSS/JavaScript cannot safely connect directly to MySQL from the browser. A backend such as Java Spring Boot or Node.js would be needed later if real database storage is required.

## Suggested Future Upgrade

- Connect this frontend with a Java Spring Boot backend.
- Store submissions in MySQL instead of localStorage.
- Add login/admin features after the basic version is stable.
