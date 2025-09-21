<?php
session_start();
if(!isset($_SESSION['student_id'])){
    header("Location: login.php");
    exit;
}
include 'database.php';

// Fetch notifications
$notifications = $conn->query("SELECT * FROM notifications ORDER BY created_at DESC");

// Fetch forms
$forms = $conn->query("SELECT * FROM forms ORDER BY created_at DESC");
?>

<h2>Welcome, <?php echo $_SESSION['student_name']; ?></h2>
<a href="logout.php">Logout</a>

<h3>Notifications</h3>
<ul>
<?php while($row = $notifications->fetch_assoc()){ ?>
    <li><strong><?php echo $row['title']; ?></strong> - <?php echo $row['description']; ?></li>
<?php } ?>
</ul>

<h3>Forms</h3>
<ul>
<?php while($row = $forms->fetch_assoc()){ ?>
    <li><?php echo $row['title']; ?> - <a href="submit_form.php?form_id=<?php echo $row['id']; ?>">Submit</a></li>
<?php } ?>
</ul>
