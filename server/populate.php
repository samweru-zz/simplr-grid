<?php

$jsonData = array(

	array(

		"id"=>2,
		"firstname"=>"Samuel",
		"lastname"=>"Weru",
		"status"=>"Pending",
		"mobile"=>"N/A",
		"address"=>"Koleni",
		"email"=>"samweru@gmail.com",
		"employed"=>"No",
		"married"=>"No",
		"county"=>"Nakuru"
	),
	array(

		"id"=>4,
		"firstname"=>"Burney",
		"lastname"=>"Rubble",
		"status"=>"Active",
		// "mobile"=>"07228899200",
		"mobile"=>"0722889920072288992007228899200722889920072288992007228899200722889920072288992007228899200722889920",
		"address"=>"Bedrock",
		"email"=>"b.rubble@gmail.com",
		"employed"=>"Yes",
		"married"=>"Yes",
		"county"=>"Fairy Tale Land"
	),
	array(

		"id"=>6,
		"firstname"=>"Fred",
		"lastname"=>"Flistone",
		"status"=>"Pending",
		"mobile"=>"0770234567",
		"address"=>"Bedrock",
		"email"=>"fred.stone@gmail.com",
		"employed"=>"Yes",
		"married"=>"Yes",
		"county"=>"Fairy Tale Land"
	),
	array(

		"id"=>8,
		"firstname"=>"James",
		"lastname"=>"Bond",
		"status"=>"Pending",
		"mobile"=>"0772223344",
		"address"=>"London",
		"email"=>"007@gmail.com",
		"employed"=>"Yes",
		"married"=>"No",
		"county"=>"Winchester"
	),
	array(

		"id"=>10,
		"firstname"=>"Clark",
		"lastname"=>"Kent",
		"status"=>"Active",
		"mobile"=>"0778889982",
		"address"=>"Superland",
		"email"=>"clark.kent@dailyplanet.com",
		"employed"=>"Yes",
		"married"=>"No",
		"county"=>"Smallville"
	),
	array(

		"id"=>12,
		"firstname"=>"Charles",
		"lastname"=>"Spurgeon",
		"status"=>"Active",
		"mobile"=>"077929293",
		"address"=>"London",
		"email"=>"charles.spurgeon@thecalvinist.com",
		"employed"=>"Yes",
		"married"=>"Yes",
		"county"=>"Birmingham"
	),
	array(

		"id"=>14,
		"firstname"=>"John",
		"lastname"=>"Calvin",
		"status"=>"Active",
		"mobile"=>"0778559982",
		"address"=>"Westbrough",
		"email"=>"john.calvin@thecalvinist.com",
		"employed"=>"Yes",
		"married"=>"Yes",
		"county"=>"London"
	)
);

$conn = require("connection.php");

foreach($jsonData as $data){

	try{

		$stmt = $conn->prepare("INSERT INTO 
			contacts (firstname, lastname, status, mobile, address, email, employed, married, county) 
		    VALUES (:firstname, :lastname, :status, :mobile, :address, :email, :employed, :married, :county)");

	    $stmt->bindParam(':firstname', $data["firstname"]);
	    $stmt->bindParam(':lastname', $data["lastname"]);
	    $stmt->bindParam(':status', $data["status"]);
	    $stmt->bindParam(':mobile', $data["mobile"]);
	    $stmt->bindParam(':address', $data["address"]);
	    $stmt->bindParam(':email', $data["email"]);
	    $stmt->bindParam(':employed', $data["employed"]);
	    $stmt->bindParam(':married', $data["married"]);
	    $stmt->bindParam(':county', $data["county"]);

		$stmt->execute(array(

			':firstname'=>$data["firstname"],
			':lastname'=>$data["lastname"],
			':status'=>$data["status"],
			':mobile'=>$data["mobile"],
			':address'=>$data["address"],
			':email'=>$data["email"],
			':employed'=>$data["employed"],
			':married'=>$data["married"],
			':county'=>$data["county"],
		));
	}
	catch(Excepion $e){

		echo sprintf('SQLINSERT ERROR: %s', $e->getMessage());
	}
}

unset($conn);