<?php

$conn = require "connect.php";

$sql = "INSERT INTO employee (id, 
								email, 
								county, 
								mobile, 
								status, 
								address, 
								married, 
								employed, 
								lastname, 
								firstname) 
		VALUES (:id, 
				:email, 
				:county, 
				:mobile, 
				:status, 
				:address, 
				:married, 
				:employed, 
				:lastname, 
				:firstname)";

try {
    $stmt = $conn->prepare($sql);

    $conn->beginTransaction();

    $rows = json_decode(file_get_contents("server/employees.json"), true);

    foreach($rows as $row)
    	$stmt->execute($row);

    $conn->commit();
} 
catch (\Exception $e) {

    $conn->rollback();

    exit(sprintf("Error: %s", $e->getMessage()));
}