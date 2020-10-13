<?php

$conn = require "connect.php";

if(!empty($_REQUEST)){

	$start_at = $_REQUEST["start_at"];
	$page_size = $_REQUEST["page_size"];
}

if(!empty($_SERVER["argv"])){

	$argv = $_SERVER["argv"];
	$start_at = $argv[1];
	$page_size = $argv[2];	
}

try {

  if($start_at > 0)
  	$start_at = $start_at - 1;

  $stmt = $conn->prepare(sprintf("SELECT * FROM employee ORDER BY id LIMIT %d, %d", 
  									$start_at, $page_size));

  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  
  exit(json_encode(array(

  	"rows"=>$stmt->fetchAll(), 
  	"count"=>$page_size
  )));
} 
catch(PDOException $e) {
  
  exit(sprintf("Error: %s", $e->getMessage()));
}