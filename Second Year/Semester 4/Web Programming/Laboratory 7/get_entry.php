<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];

$response = array();

$sql = "SELECT * FROM books WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response = $row;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>