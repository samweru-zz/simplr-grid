<?php

ini_set('display_errors', '1');
ini_set("date.timezone", "Africa/Nairobi");

error_reporting(E_ALL & ~E_STRICT & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);

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