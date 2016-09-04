(function($){

	var jsonData = [

		{
			"id":1,
			"firstname":"Samuel",
			"lastname":"Weru",
			"status":"Pending",
			"mobile":"N/A",
			"address":"Koleni",
			"email":"samweru@gmail.com",
			"employed":"No",
			"married":"No",
			"county":"Nakuru"
		},
		{
			"id":2,
			"firstname":"Burney",
			"lastname":"Rubble",
			"status":"Active",
			// "mobile":"07228899200",
			"mobile":"0722889920072288992007228899200722889920072288992007228899200722889920072288992007228899200722889920",
			"address":"Bedrock",
			"email":"b.rubble@gmail.com",
			"employed":"Yes",
			"married":"Yes",
			"county":"Fairy Tale Land"
		},
		{
			"id":3,
			"firstname":"Fred",
			"lastname":"Flistone",
			"status":"Pending",
			"mobile":"0770234567",
			"address":"Bedrock",
			"email":"fred.stone@gmail.com",
			"employed":"Yes",
			"married":"Yes",
			"county":"Fairy Tale Land"
		},
		{
			"id":4,
			"firstname":"James",
			"lastname":"Bond",
			"status":"Pending",
			"mobile":"0772223344",
			"address":"London",
			"email":"007@gmail.com",
			"employed":"Yes",
			"married":"No",
			"county":"Winchester"
		},
		{
			"id":5,
			"firstname":"Clark",
			"lastname":"Kent",
			"status":"Active",
			"mobile":"0778889982",
			"address":"Superland",
			"email":"clark.kent@dailyplanet.com",
			"employed":"Yes",
			"married":"No",
			"county":"Smallville"
		},
		{
			"id":7,
			"firstname":"Charles",
			"lastname":"Spurgeon",
			"status":"Active",
			"mobile":"077929293",
			"address":"London",
			"email":"charles.spurgeon@thecalvinist.com",
			"employed":"Yes",
			"married":"Yes",
			"county":"Birmingham"
		},
		{
			"id":8,
			"firstname":"John",
			"lastname":"Calvin",
			"status":"Active",
			"mobile":"0778559982",
			"address":"Westbrough",
			"email":"john.calvin@thecalvinist.com",
			"employed":"Yes",
			"married":"Yes",
			"county":"London"
		}
	];

	var btnAdd = $(document.createElement("BUTTON"));
	btnAdd.html("Add");

	var btnSel = $(document.createElement("BUTTON"));
	btnSel.html("Sel");
	btnSel.click(function(){

		console.log($("#data-grid").getSelected());
	})

	$("#data-grid").simplrGrid({

		title:"Sample Grid",
		usePager:true,
		data:jsonData,
		singleSelect:false,
		columnHide:[

			"id"
		],
		toolbars:[

			[btnAdd, btnSel]
		],
		css:{

			width:500,
			height:500
		},
		onDblClick:function(row){

			console.log(row);
		}
	});
	
	$("#data-grid").tableHeadFixer({

		left:1, 
		head:true
	});

	$('#data-grid th').resizable({

        handles: 'e',
        minWidth: 18
    });	

})(jQuery);