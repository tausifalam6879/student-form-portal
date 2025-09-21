<?php
$host = "localhost";      // XAMPP MySQL host
$user = "root";           // default XAMPP MySQL username
$password = "";           // default password empty
$database = "student_portal"; // database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
