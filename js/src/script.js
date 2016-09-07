(function($){

	var btnAdd = $(document.createElement("BUTTON"));
	btnAdd.html("Add");

	var btnSel = $(document.createElement("BUTTON"));
	btnSel.html("Sel");
	btnSel.click(function(){

		console.log($("#data-grid").getSelected());
	})

	$("#data-grid").simplrGrid({

		url:"/server/fetch.all.php",
		method:"POST",
		title:"Sample Grid",
		usePager:true,
		// data:jsonData,
		singleSelect:true,
		// freezeHeader:false,
		// freezeLeftColumn:false,
		// resizeColumns:false,
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
		pager:{

			page:1,
			rows:50
		},
		onDblClick:function(row){

			console.log(row);
		}
	});

})(jQuery);