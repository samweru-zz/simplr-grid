(function(){

	function getEmployees(start_from, rows_per_page){

		var _employees = employees().start(start_from).limit(rows_per_page).get();

	    for(idx in _employees){

			delete _employees[idx].___id;
			delete _employees[idx].___s;
		}

		return _employees;
	}

	$.ajax.fake.registerWebservice('/data/employees', function(data) {

	    var start_from = ((data.page - 1) * data.rows)+1;

	    var _employees = getEmployees(start_from, data.rows)

	    return {

	    	success:{

		    	rows:_employees,
		    	count: employees().count()
		    }
	    }

	}, "POST");

	var button = $(document.createElement("BUTTON"));
	var customToolbar = [

	    button.clone().html("Add").click(function(){

	        console.log("Button Add Clicked.")
	    }),
	    button.clone().html("Sel").click(function(){

	        console.log("Button Select Clicked.")
	    })
	];

	$("#employee-tbl").simplrGrid({

		title:"Employees",
		url:"/data/employees",
		method:"POST",
		// url:"server/fetch.all.php",
		// method:"GET",
		singleSelect:false,
		columnHide:["id"],
		usePager:true,
		fixHeader:true,
		fixLeftColumn:true,
		resizeColumns:true,
		// data:getEmployees(1,20),
		columns:{

			"id":{name:"#", css:{display:"none"}},
			"email":{name:"Email", css:{textDecoration:"underline"}},
			"county":{name:"County"}, 
			"mobile":{name:"Mobile"}, 
			// "status":{name:"Status"},
			"address":{name:"Address"},
			"married":{name:"Married"},
			"employed":{name:"Employed", css:{textAlign:"right", paddingRight:"10px"}},
			"lastname":{name:"Last Name"},
			"firstname":{name:"First Name"}
		},
		toolbars:[

			customToolbar
		],
		css:{

			gridWidth:"110%",
			gridHeight:"400px",
			capsuleWidth:"100%",
			capsuleHeight:"600px",
		},
		pager:{

			page:1,
			rows:10,
			list:[10,20,30,40,50]
		},
		dblClick:function(){

			console.log($(this).getRow());
		},
		customLoader:function(table, options, builder){

			$.ajax({

			    type:options.method,
			    dataType:'json',
			    fake: true,	// <<<---- that's it !
			    url:options.url,
			    data:{

			    	page:options.pager.page,
			    	rows:options.pager.rows
			    }
			})
			.done(function(response){

				//total-number-of-rows/rows-per-page
				options.pager.pages = Math.ceil(response.count/options.pager.rows);

				builder(table, response, options);
			})
		}
	})

})();