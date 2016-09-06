<?php

$conn = require("connection.php");

$page_no = $_REQUEST["page"];
$page_size = $_REQUEST["rows"];

$start_from = ($page_no==1)?1:(($page_no-1)*$page_size)-1;

$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

try{

	$count = $conn->query('SELECT COUNT(*) FROM contacts')->fetchColumn(); 

	$stmt = $conn->prepare('SELECT * FROM contacts ORDER BY id LIMIT :start_from , :page_size');

	$stmt->bindParam(':start_from', $start_from, PDO::PARAM_INT);
	$stmt->bindParam(':page_size', $page_size, PDO::PARAM_INT);

	$stmt->execute();

	$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

	header('Content-Type: application/json');
	
	echo json_encode(array("rows"=>$data, "count"=>$count));
}
catch(PDOException $e) {

    echo sprintf("SQLFETCH ERROR %s", $e->getMessage());
}

unset($conn);

