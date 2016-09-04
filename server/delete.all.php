<?php

$conn = require("connection.php");

try{

	$conn->exec("DELETE FROM contacts;");
}
catch(PDOException $e) {

    echo sprintf("SQLDEL ERROR %s", $e->getMessage());
}