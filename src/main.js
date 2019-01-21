(function(){

	function getEmployees(start_from, rows_per_page){

		var _employees = employees().start(start_from).limit(rows_per_page).get();

	    for(idx in _employees){

			delete _employees[idx].___id;
			delete _employees[idx].___s;
		}

		return _employees;
	}

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
		// url:"server/fetch.all.php",
		// method:"POST",
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

			gridWidth:"1100px",
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

			var page = options.pager.page;
			var rows = options.pager.rows;
			var count = employees().count();

			var start_from = ((page - 1) * rows)+1;

			var response = {

				rows: getEmployees(start_from, rows)
			};

	    	options.pager.pages = Math.ceil(count/options.pager.rows);

			builder(table, response, options);

			/********************AJAX***********************/
			// $.ajax({

		 //        type:options.method,
		 //        dataType:'json',
		 //        url:options.url,
		 //        data:{

		 //            page:options.pager.page,
		 //            rows:options.pager.rows
		 //        }
		 //    })
		 //    .done(function(response){

		 //        //total-number-of-rows/rows-per-page
		 //        options.pager.pages = Math.ceil(response.count/options.pager.rows);

		 //        builder(table, response, options);
		 //    })
		}
	})

})();