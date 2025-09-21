<?php
session_start();
include '../database.php';

if(!isset($_SESSION['admin_id'])){
    header("Location: login.php");
    exit();
}

// Fetch notifications
$notifications = $conn->query("SELECT * FROM notifications ORDER BY created_at DESC");
// Fetch forms
$forms = $conn->query("SELECT * FROM forms ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head><title>Admin Dashboard</title></head>
<body>
<h2>Welcome Admin</h2>
<a href="logout.php">Logout</a>
<h3>Notifications</h3>
<a href="add_notice.php">Add Notification</a>
<ul>
<?php while($row = $notifications->fetch_assoc()): ?>
    <li><?php echo $row['title']; ?> - <?php echo $row['description']; ?></li>
<?php endwhile; ?>
</ul>

<h3>Forms</h3>
<a href="add_form.php">Add Form</a>
<ul>
<?php while($row = $forms->fetch_assoc()): ?>
    <li><?php echo $row['title']; ?> - <?php echo $row['description']; ?></li>
<?php endwhile; ?>
</ul>
</body>
</html>
