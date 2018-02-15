(function(){

	$.ajax.fake.registerWebservice('/data/employees', function(data) {

	    var start_from = (data.page - 1) * data.rows;

	    var _employees = employees().start(start_from).limit(data.rows).get();

	    for(idx in _employees){

			delete _employees[idx].___id;
			delete _employees[idx].___s;
		}

	    return {

	    	success:{

		    	rows:_employees,
		    	count: employees().count()
		    }
	    }
	});

	$("#employee-tbl").simplrGrid({

		title:"Employees",
		url:"/data/employees",
		method:"GET",
		singleSelect:false,
		// columnHide:[],
		css:{

			gridWidth:"99%",
			gridHeight:"400px",
			capsuleWidth:"100%",
		},
		pager:{

			page:1,
			rows:10,
			list:[10,20,30,40,50]
		},
		dblClick:function(){

			console.log($(this).parent().parent().getSelectedRow());
		},
		// load:function(table, options, builder){

		// 	$.ajax({

		// 	    type:options.method,
		// 	    dataType:'json',
		// 	    fake: true,	// <<<---- that's it !
		// 	    url:options.url,
		// 	    data:{

		// 	    	page:options.pager.page,
		// 	    	rows:options.pager.rows
		// 	    }
		// 	})
		// 	.done(function(response){

		// 		//total-number-of-rows/rows-per-page
		// 		options.pager.pages = Math.ceil(response.count/options.pager.rows);

		// 		builder(table, response, options);

		// 		table
		// 			// .resizeColumns()
		// 			.fixHeader()
		// 			// .fixLeftColumn()
		// 	})
		// }
	})

})();