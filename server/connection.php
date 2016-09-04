<?php

$conn = null;

try {

	$username = "root";
	$password = "root*";

    $conn = new PDO('mysql:host=localhost;dbname=test', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch(PDOException $e) {

    echo sprintf('SQLCONN ERROR: %s', $e->getMessage());
}

return $conn;