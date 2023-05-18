<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$entryId = $_POST["entryId"] ?? null;

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array();

if ($entryId !== null) {
    $stmt = $conn->prepare("DELETE FROM books WHERE id = ?");
    $stmt->bind_param("i", $entryId);

    if ($stmt->execute()) {
        $response["success"] = true;
        $response["message"] = "Guest entry deleted successfully";
    } else {
        $response["success"] = false;
        $response["message"] = "Error deleting guest entry: " . $conn->error;
    }

    $stmt->close();
} else {
    $response["success"] = false;
    $response["message"] = "Invalid entryId provided";
}

echo json_encode($response);

$conn->close();
?>
