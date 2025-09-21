<?php
session_start();
include 'database.php';

if(!isset($_SESSION['student_id'])){
    header("Location: login.php");
    exit();
}

if(isset($_POST['submit'])){
    $student_id = $_SESSION['student_id'];
    $form_id = $_POST['form_id'];
    $answers = $_POST['answers']; // JSON string or text

    $stmt = $conn->prepare("INSERT INTO submissions (student_id, form_id, answers) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $student_id, $form_id, $answers);
    $stmt->execute();

    header("Location: student_dashboard.php");
    exit();
}

if(isset($_GET['form_id'])){
    $form_id = $_GET['form_id'];
} else {
    echo "No form selected!";
    exit();
}

// Fetch form details (optional)
$form_result = $conn->query("SELECT * FROM forms WHERE id = $form_id");
$form = $form_result->fetch_assoc();
?>

<h2><?php echo $form['title']; ?></h2>
<p><?php echo $form['description']; ?></p>

<form method="POST">
    <textarea name="answers" rows="5" cols="50" placeholder="Your answers here..." required></textarea><br><br>
    <input type="hidden" name="form_id" value="<?php echo $form_id; ?>">
    <input type="submit" name="submit" value="Submit">
</form>

<a href="student_dashboard.php">Back to Dashboard</a>
