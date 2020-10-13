<?php

$conn = require "connect.php";

try {

  $stmt = $conn->prepare("SELECT * FROM employee");
  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  
  exit(json_encode($stmt->fetchAll()));
} 
catch(PDOException $e) {
  
  exit(sprintf("Error: %s", $e->getMessage()));
} 

