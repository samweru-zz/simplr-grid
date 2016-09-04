<?php

$fakeData = array("firstnames"=>array("Samuel","Burney","Fred","James","Clark","Charles","John"),
					"lastnames"=>array("Weru","Rubble","Flinstone","Bond","Kent","Spurgeon","Calvin"),
					"status"=>array("Active","Pending","Inactive"),
					"addresses"=>array("Bedrock","Koleni","Lando","Superland","Westbrough"),
					"emailSuffixes"=>array("gmail.com","ymail.com","hotmail.com"),
					"employedStatus"=>array("Yes","No","Self"),
					"marriedStatus"=>array("Yes","No","Not Stated"),
					"counties"=>array("Nakuru","Nairobi","Kisumu","Fairy Tale", "Winchester","Birmingham"));

$number_of_records=50;

while($number_of_records>=1){

	$firstname = $fakeData["firstnames"][array_rand($fakeData["firstnames"], 1)];
	$lastname = $fakeData["lastnames"][array_rand($fakeData["lastnames"], 1)];
	$emailSuffix = $fakeData["emailSuffixes"][array_rand($fakeData["emailSuffixes"], 1)];

	$jsonData[] = array(

		"firstname"=>$firstname,
		"lastname"=>$lastname,
		"status"=>$fakeData["status"][array_rand($fakeData["status"], 1)],
		"mobile"=>rand(7777000000,7999999999),
		"address"=>$fakeData["addresses"][array_rand($fakeData["addresses"], 1)],
		"email"=>sprintf("%s.%s@%s", strtolower($firstname), strtolower($lastname), $emailSuffix),
		"employed"=>$fakeData["employedStatus"][array_rand($fakeData["employedStatus"], 1)],
		"married"=>$fakeData["marriedStatus"][array_rand($fakeData["marriedStatus"], 1)],
		"county"=>$fakeData["counties"][array_rand($fakeData["counties"], 1)]
	);

	$number_of_records--;
}

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