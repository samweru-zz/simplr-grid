<?php

$conn = require "connect.php";

$filter = [];

if(!empty($_REQUEST)){

	$start_at = $_REQUEST["start_at"];
	$page_size = $_REQUEST["page_size"];

  if(array_key_exists("status", $_REQUEST))
    $filter["status"] = $_REQUEST["status"];
}

if(!empty($_SERVER["argv"])){

	$argv = $_SERVER["argv"];
	$start_at = $argv[1];
	$page_size = $argv[2];	
  $filter["status"] = $argv[3];
}

try {

  if($start_at > 0)
  	$start_at = $start_at - 1;

  $sqls = array(

    "SELECT COUNT(*) FROM employee",
    "SELECT * FROM employee",
  );

  $sqls = array_map(function($sql) use($filter){

    if(array_key_exists("status", $filter))
      return sprintf("%s WHERE status = '%s'", $sql, $filter["status"]);

    return $sql;

  }, $sqls);

  list($sql_count, $sql) = $sqls;

  $rows_count = $conn->query($sql_count)->fetchColumn(); 

  $stmt = $conn->prepare(sprintf("%s ORDER BY id LIMIT %d, %d", $sql, $start_at, $page_size));

  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  
  exit(json_encode(array(

  	"rows"=>$stmt->fetchAll(), 
  	"count"=>$rows_count
  )));
} 
catch(PDOException $e) {
  
  exit(sprintf("Error: %s", $e->getMessage()));
}