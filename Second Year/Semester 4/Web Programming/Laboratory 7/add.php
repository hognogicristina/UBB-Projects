<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$errors = array();
$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $author = $_POST["author"];
    $email = $_POST["email"];
    $title = $_POST["title"];
    $comment = $_POST["comment"];
    $date = $_POST["date"];

    if (empty($author)) {
        $errors['author'] = "Author is required";
    } elseif (!preg_match("/^[A-Za-z\s]+$/", $author)) {
        $errors['author'] = "Author should only contain letters and spaces";
    }

    if (empty($title)) {
        $errors['title'] = "Title is required";
    } elseif (!preg_match("/^[A-Za-z\s]+$/", $title)) {
        $errors['title'] = "Title should only contain letters and spaces";
    }

    if (empty($comment)) {
        $errors['comment'] = "Comment is required";
    } elseif (!preg_match("/^[A-Za-z\s\p{P}]+$/u", $comment)) {
        $errors['comment'] = "Comment should only contain letters, spaces, and punctuation marks";
    }

    if (empty($email)) {
        $errors['email'] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }

    if (empty($date)) {
        $errors['date'] = "Date is required";
    } elseif (strtotime($date) > strtotime(date("d-M-Y h:i A"))) {
        $errors['date'] = "Date cannot be in the future";
    }    

    if (empty($errors)) {
        $sql = "INSERT INTO books (author, email, title, comment, date) VALUES ('$author', '$email', '$title', '$comment', '$date')";

        if ($conn->query($sql) === TRUE) {
            $response['success'] = "Entry added successfully!";
        } else {
            $response['error'] = "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        $response['errors'] = $errors;
    }
} else {
    $response['error'] = "Invalid request method";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>