<?php
session_start();
include 'database.php';

// Check if student is logged in
if(!isset($_SESSION['student_id'])){
    header("Location: login.php");
    exit();
}

// Fetch student info
$student_id = $_SESSION['student_id'];
$studentQuery = $conn->prepare("SELECT * FROM students WHERE id = ?");
$studentQuery->bind_param("i", $student_id);
$studentQuery->execute();
$studentResult = $studentQuery->get_result();
$student = $studentResult->fetch_assoc();

// Fetch notifications
$notifResult = $conn->query("SELECT * FROM notifications ORDER BY created_at DESC");

// Fetch forms
$formResult = $conn->query("SELECT * FROM forms ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Dashboard</title>
    <link rel="stylesheet" href="assets/bootstrap.min.css">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body class="p-4">

<h2>Welcome, <?php echo htmlspecialchars($student['name']); ?></h2>
<a href="logout.php" class="btn btn-danger mb-3">Logout</a>

<hr>

<h3>Notifications</h3>
<?php if($notifResult->num_rows > 0): ?>
    <ul class="list-group mb-4">
        <?php while($notif = $notifResult->fetch_assoc()): ?>
            <li class="list-group-item">
                <strong><?php echo htmlspecialchars($notif['title']); ?>:</strong>
                <?php echo htmlspecialchars($notif['description']); ?>
                <small class="text-muted float-end"><?php echo $notif['created_at']; ?></small>
            </li>
        <?php endwhile; ?>
    </ul>
<?php else: ?>
    <p>No notifications yet.</p>
<?php endif; ?>

<h3>Available Forms</h3>
<?php if($formResult->num_rows > 0): ?>
    <?php while($form = $formResult->fetch_assoc()): ?>
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title"><?php echo htmlspecialchars($form['title']); ?></h5>
                <p class="card-text"><?php echo htmlspecialchars($form['description']); ?></p>

                <!-- Form submission -->
                <form action="submit_form.php" method="POST">
                    <input type="hidden" name="form_id" value="<?php echo $form['id']; ?>">
                    <div class="mb-2">
                        <textarea class="form-control" name="answers" placeholder="Your answers here..." required></textarea>
                    </div>
                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    <?php endwhile; ?>
<?php else: ?>
    <p>No forms available currently.</p>
<?php endif; ?>

<script src="assets/script.js"></script>
</body>
</html>
