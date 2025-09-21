<?php
session_start();
include '../database.php';

if(!isset($_SESSION['admin_id'])){
    header("Location: login.php");
    exit();
}

if(isset($_POST['submit'])){
    $title = $_POST['title'];
    $desc = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO notifications (title, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $desc);
    $stmt->execute();
    header("Location: admin_dashboard.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head><title>Add Notification</title></head>
<body>
<h2>Add Notification</h2>
<form method="POST">
    Title: <input type="text" name="title" required><br><br>
    Description: <textarea name="description" required></textarea><br><br>
    <button type="submit" name="submit">Add</button>
</form>
<a href="admin_dashboard.php">Back to Dashboard</a>
</body>
</html>
