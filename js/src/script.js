(function($){

	$.ajax({

		url:"/data/employees.json",
		method:"POST"
	})
	.done(function(response){

		$("#data-grid").simplrGrid({

			data:response,
			// usePager:true,
			// singleSelect:false,
			css:{

				width:500,
				height:250
			},
			columnHide:[

				"id"
			],
		})
		.fixLeftColumn()
		.fixHeader()
		.resizeColumns()
	})

	// var btnAdd = $(document.createElement("BUTTON"));
	// btnAdd.html("Add");

	// var btnSel = $(document.createElement("BUTTON"));
	// btnSel.html("Sel");
	// btnSel.click(function(){

	// 	console.log($("#data-grid").getSelected());
	// })

	// $("#data-grid").simplrGrid({

	// 	url:"/server/fetch.all.php",
	// 	method:"POST",
	// 	title:"Sample Grid",
	// 	usePager:true,
	// 	singleSelect:true,
	// 	columnHide:[

	// 		"id"
	// 	],
	// 	toolbars:[

	// 		[btnAdd, btnSel]
	// 	],
	// 	css:{

	// 		width:500,
	// 		height:500
	// 	},
	// 	pager:{

	// 		page:1,
	// 		rows:10//,
	// 		// list:[10,20]
	// 	},
	// 	onDblClick:function(row){

	// 		console.log(row);
	// 	}
	// })
	// .fixLeftColumn()
	// .fixHeader()
	// .resizeColumns()

})(jQuery);