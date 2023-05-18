<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_book";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$page = $_GET['page'] ?? 1;
$entriesPerPage = 2;
$start = ($page - 1) * $entriesPerPage;

$sql = "SELECT DISTINCT author FROM books ORDER BY author ASC";
$result = $conn->query($sql);
$authors = array();
while ($row = $result->fetch_assoc()) {
    $authors[] = $row['author'];
}

$sql = "SELECT DISTINCT title FROM books ORDER BY title ASC";
$result = $conn->query($sql);
$titles = array();
while ($row = $result->fetch_assoc()) {
    $titles[] = $row['title'];
}

$filter_author = $_GET['author'] ?? '';
$filter_title = $_GET['title'] ?? '';

$sql = "SELECT * FROM books";

if ($filter_author || $filter_title) {
    $sql .= " WHERE 1=1";

    if ($filter_author) {
        $sql .= " AND author = '$filter_author'";
    }

    if ($filter_title) {
        $sql .= " AND title = '$filter_title'";
    }
}

$totalEntriesSql = $sql;

$sql .= " ORDER BY author ASC, title ASC, date DESC LIMIT $start, $entriesPerPage";

$result = $conn->query($sql);

$entries = array();
while ($row = $result->fetch_assoc()) {
    $entries[] = $row;
}

$response = array(
    'authors' => $authors,
    'titles' => $titles,
    'entries' => $entries
);

$totalEntriesResult = $conn->query($totalEntriesSql);
$totalEntries = $totalEntriesResult->num_rows;
$totalPages = ceil($totalEntries / $entriesPerPage);
$response['pagination'] = array(
    'currentPage' => $page,
    'totalPages' => $totalPages,
);

if (isset($_GET['count']) && $_GET['count'] === 'true') {
    $countSql = "SELECT COUNT(*) as count FROM ($totalEntriesSql) as subquery";
    $countResult = $conn->query($countSql);
    $countRow = $countResult->fetch_assoc();
    $response['count'] = $countRow['count'];
}

echo json_encode($response);

$conn->close();
?>