# Student Form & Notification Portal
A web-based portal for students to register, login, submit forms, and view notifications. Admin can add new forms and notifications.
## Features
- Student Registration & Login
- Submit forms online
- View notifications
- Admin dashboard to add forms & notifications
## Project Structure
student-portal/
│── index.php
│── register.php
│── login.php
│── logout.php
│── student_dashboard.php
│── submit_form.php
│── database.php
│── assets/
│    ├── style.css
│    ├── script.js
│    └── bootstrap.min.css
│── admin/
     ├── login.php
     ├── admin_dashboard.php
     ├── add_form.php
     ├── add_notice.php
     └── logout.php
│── database.sql
## Setup Instructions
1. Install XAMPP on your system.
2. Copy the project folder into `C:\xampp\htdocs\`.
3. Open phpMyAdmin and import `database.sql`.
4. Start Apache & MySQL in XAMPP Control Panel.
5. Open browser and visit `http://localhost/student-portal/student_dashboard.php`.
