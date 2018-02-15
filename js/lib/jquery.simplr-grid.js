(function($){

	var grid = {

		addRow:function(rowData, options){

			var row = $(document.createElement("TR"));

			if(options.dblClick)
				row.dblclick(options.dblClick)

			row.click(function(){

				if(options.singleSelect)
					$(this).siblings().removeClass("selected");

				$(this).addClass("selected")
			})

			$.each(rowData, function(key, val){

				if(key.trim()!="id"){

					val = $(document.createElement("DIV")).html(val)
				}

				var cell = $(document.createElement("TD")).attr("name", key).html(val)
				row.append(cell)
			})

			return row;
		},

		buildBody:function(table, data, options){

			var tbody = $(document.createElement("TBODY"));

			for(idx in data)
				tbody.append(this.addRow(data[idx], options));

			table.append(tbody);
		},

		buildHeader:function(table, rows){

			var thead = $(document.createElement("THEAD"));

			$.each(rows[0], function(key, val){

				var th = $(document.createElement("TH")).html(key[0].toUpperCase() + key.substring(1))
				th.css("text-align", "left")
				thead.append(th)
			})

			table.append(thead);
		},

		buildMainToolBar:function(table, options){

			var gridCapsule = $(document.createElement("DIV"));
			gridCapsule.addClass("simplr-grid-capsule")

			gridCapsule.css({

				width:options.css.capsuleWidth
			})

			table.css({

				width:options.css.gridWidth,
			})

			table.replaceWith(gridCapsule)

			var gridTitle = $(document.createElement("DIV"));
			gridTitle.addClass("simplr-grid-title")
			gridTitle.html("&nbsp;".concat(options.title))
			gridCapsule.append(gridTitle)


			var mainToolBar = $(document.createElement("DIV"));
			mainToolBar.addClass("simplr-grid-toolbar")
			gridCapsule.append(mainToolBar)

			var customToolBar = $(document.createElement("DIV"));
			customToolBar.append("<button>Add</button>")
			customToolBar.addClass("simplr-grid-toolbar")
			gridCapsule.append(customToolBar)

			var gridInner = $(document.createElement("DIV"));
			gridInner.addClass("simplr-grid-inner")
			gridInner.css({

				height:options.css.gridHeight
			})
			
			gridCapsule.append(gridInner)

			gridInner.append(table)

			// gridCapsule.append(table)

			var txtPageNum = $(document.createElement("INPUT"));
			txtPageNum.val(options.pager.page);
			txtPageNum.addClass("page-num").attr("size", 2);

			var cboPager = $(document.createElement("SELECT"));
			$.each(options.pager.list, function(i,e){

				$(cboPager).append(new Option(e))
			});

			$(cboPager).val(options.pager.rows);

			cboPager.change(function(){
				
				options.pager.page = 1;

				options.pager.rows = $(this).val();

				txtPageNum.val(options.pager.page);

				// spanPages.html(options.pager.pages);	

				grid.load(table, options, grid.rebuildBody);
			});

			var btnFirst = $(document.createElement("BUTTON")).html("|<")
			btnFirst.click(function(){

				options.pager.page = 1;

				txtPageNum.val(options.pager.page);

				grid.load(table, options, grid.rebuildBody);
			})

			var btnPrev = $(document.createElement("BUTTON")).html("<")
			btnPrev.click(function(){

				if(options.pager.page>1){

					options.pager.page--;

					txtPageNum.val(options.pager.page);

					grid.load(table, options, grid.rebuildBody);
				}
			})

			var btnNext = $(document.createElement("BUTTON")).html(">")
			btnNext.click(function(){

				if(options.pager.page<options.pager.pages){

					options.pager.page++;

					txtPageNum.val(options.pager.page);

					grid.load(table, options, grid.rebuildBody);
				}
			})

			var btnLast = $(document.createElement("BUTTON")).html(">|")
			btnLast.click(function(){

				options.pager.page = options.pager.pages;

				txtPageNum.val(options.pager.page);

				grid.load(table, options, grid.rebuildBody);
			})

			var btnRefresh = $(document.createElement("BUTTON")).html("Refresh")
			btnRefresh.click(function(){

				options.pager.page = table.parent().parent().find(".page-num").val()

				grid.load(table, options, grid.rebuildBody);
			})

			var SEP = "&nbsp;|&nbsp;";

			var spanPages = $(document.createElement("SPAN"));
			spanPages.addClass("num-of-pages")
			spanPages.html(options.pager.pages);

			mainToolBar
				.append(cboPager)
				.append(SEP)
				.append(btnFirst)
				.append(btnPrev)
				.append("<span> Page </span>")
				.append(txtPageNum)
				.append("<span> of </span>")
				.append(spanPages)
				.append("<span>&nbsp;</span>")
				.append(btnNext)
				.append(btnLast)
				.append(SEP)
				.append(btnRefresh)

			
		},

		build:function(table, data, options){

			grid.buildHeader(table, data.rows);
			grid.buildMainToolBar(table, options);
			grid.buildBody(table, data.rows, options)
		},

		rebuildBody:function(table, data, options){

			table.find("tbody").remove();

			grid.buildBody(table, data.rows, options);

			table.parent().parent().find(".num-of-pages").html(options.pager.pages);
		},

		load:function(table, options, builder){

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

				//tota-number-of-rows/rows-per-page
				options.pager.pages = Math.ceil(response.count/options.pager.rows);

				builder(table, response, options);

				table
					.resizeColumns()
					.fixHeader()
					.fixLeftColumn()
			})
		}
	}

	$.fn.simplrGrid = function(options){

		var defaults = {

			title:"Simplr Grid",
			// columnHide:[],
    		// toolbars:[],
    		pager:{

    			page:1,
    			rows:10,
    			list:[50,40,30,20,10]
    		},
    		css:{

				// gridWidth:"100%",
				// gridHeight:"100%"
				// capsuleWidth:"100%"
			},
        	// css:{},
        	// data:[],
        	method:"POST",
        	singleSelect:true,
        	width:null,
        	height:null,
        	dblClick:null,
        	load:null
        	// usePager:false,
        };

        options = $.extend({}, defaults, options);

        // console.log(options)

		return this.each(function(){

			var el = $(this);

			if(options.load)
				options.load(el.addClass("simplr-grid"), options, grid.build)
			else
				grid.load(el.addClass("simplr-grid"), options, grid.build);
		})
	}

	$.fn.getSelectedRow = function(){

		var cells = $(this).find("tr.selected:first td");

		var cellData = {};

		$.each(cells,function(k,l){

			var field = $(l).attr("field")
			if(!!field)
				cellData[field] = $(l).find("div").html();
		})

		return cellData;
	}

	$.fn.getSelectedRows = function(){

		var rowData = [];

		$.each($(this).find("tr.selected"),function(i,j){

			var cellData = {};

			$.each($(j).find("td"),function(k,l){

				var field = $(l).attr("field")
				if(!!field)
					cellData[field] = $(l).find("div").html();
			})

			rowData.push(cellData);
		});

		return rowData;
	}


	$.fn.fixHeader = function(){

		var settings = {

			head: true
		}

		function setParent(table){

			var parent = table.parent();
			parent.append(table);
			parent.css({

				'overflow-x' : 'auto',
				'overflow-y' : 'auto'
			});

			parent.scroll(function() {

				var top = parent.scrollTop();

				$(this).find("thead > *").css("top", top);

			}.bind(table));
		}

		function fixHead(table){
			
			var cells = table.find("thead > *");

			cells.css({

				'position' : 'relative'
			});
		}

		return this.each(function(){

			setParent($(this));

			fixHead($(this));
		});
	};

	$.fn.fixLeftColumn = function() {

		var settings = {

			left: 1
		}

		return this.each(function(){

			setParent($(this));
			fixLeft($(this));

			$(this).parent().trigger("scroll");

			$(window).resize(function() {

				$(this).parent().trigger("scroll");
			});
		});

		function setParent(table){

			var parent = table.parent();
			parent.append(table);
			parent.css({

				'overflow-x' : 'auto',
				'overflow-y' : 'auto'
			});

			parent.scroll(function(){

				var left = parent.scrollLeft();

				if(settings.left > 0)
					settings.leftColumns.css("left", left);

			}.bind(table));
		}

		function fixLeft(table){

			settings.leftColumns = $();

			var tr = table.find("tr");
			tr.each(function(k, row){

				solverLeftColspan(row, function(cell){

					settings.leftColumns = settings.leftColumns.add(cell);
				});
			});

			var column = settings.leftColumns;
			column.each(function(k, cell){

				var cell = $(cell);

				cell.css({

					'position' : 'relative'
				});
			});
		}

		function solverLeftColspan(row, action){

			var fixColumn = settings.left;
			var inc = 1;

			for(var i = 1; i <= fixColumn; i = i + inc){

				var nth = inc > 1 ? i - 1 : i;

				var cell = $(row).find("> *:nth-child(" + nth + ")");
				var colspan = cell.prop("colspan");

				action(cell);

				inc = colspan;
			}
		}
	};

	$.fn.resizeColumns = function(){

	    return this.each(function(){

	    	var pressed = false;
		    var start = undefined;
		    var startX, startWidth;

		    if($(this).find("th:last-child").has("span").length == 0)
		    	$(this).find("th:not(:first-child)").append("<span>&nbsp;</span>")

	    	$(this).find("th span").mousedown(function(e){

		        start = $(this).parent()
		        pressed = true;
		        startX = e.pageX;
		        startWidth = start.width();
			});
		    
		    $(document).mousemove(function(e){

	        	if(pressed)
	            	$(start).width(startWidth+(e.pageX-startX));
		    });
		    
		    $(document).mouseup(function(){

		        if(pressed)
		            pressed = false;
		    });
	    });
	}

})(jQuery)