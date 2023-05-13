<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    if (empty($username) || empty($password)) {
        $response["success"] = false;
        $response["message"] = "Complete the username and password fields";
    } else {
        $sql = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            if ($row["username"] == "admin" && $row["password"] == "password123") {
                $response["success"] = true;
                $response["message"] = "Login successful";
                $response["redirect"] = "admin.html";
            } else {
                $response["success"] = true;
                $response["message"] = "Login successful";
                $response["redirect"] = "client.html";
            }
        } else {
            $response["success"] = false;
            $response["message"] = "Invalid username or password";
        }
    }
} else {
    $response["success"] = false;
    $response["message"] = "Invalid request method";
}

header("Content-type: application/json");
echo json_encode($response);
?>  