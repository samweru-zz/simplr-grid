<?php

$conn = require("connection.php");

try{

	$stmt = $conn->prepare('SELECT * FROM contacts');

	$stmt->execute();

	$data = $stmt->fetchAll();

	header('Content-Type: application/json');
	
	echo json_encode($data);
}
catch(PDOException $e) {

    echo sprintf("SQLFETCH ERROR %s", $e->getMessage());
}

