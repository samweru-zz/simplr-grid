<?php

try {

  $conn = new PDO("mysql:host=localhost;dbname=test", "root", "p@55w0rd");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";
} 
catch(PDOException $e) {

  echo sprintf("Connection failed: %s", $e->getMessage());
}

return $conn;