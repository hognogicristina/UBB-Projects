<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$page = $_GET['page'] ?? 1;
$perPage = 4;
$offset = ($page - 1) * $perPage;

if (isset($_GET['total'])) {
    $sqlCount = "SELECT COUNT(*) AS total FROM books";
    $resultCount = $conn->query($sqlCount);
    $totalCount = $resultCount->fetch_assoc()['total'];
    $totalPages = ceil($totalCount / $perPage);

    $response = array('totalPages' => $totalPages);
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$sql = "SELECT * FROM books LIMIT $perPage OFFSET $offset";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($rows);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'No results found'));
}

$conn->close();
?>