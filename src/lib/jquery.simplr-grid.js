/*
 * jQuery simplrGrid - v1.0.0
 * Javascript DataGrid
 *
 * Copyright (c) 2019 Samuel Weru
 * Released under the MIT license
 */
(function($){

	class Grid{

		/*****/addRow(idx, rowData, options){

			var row = $(document.createElement("TR"));
			var cell = $(document.createElement("TD"));

			row.append(cell.html(idx))

			if(options.dblClick)
				row.dblclick(options.dblClick)

			row.click(function(){

				if(options.singleSelect){

					$(this).addClass("selected").siblings().removeClass("selected");	
				}
				else{

					if($(this).hasClass("selected"))
						$(this).removeClass("selected")
					else
						$(this).addClass("selected")
				}
			})

			$.each(rowData, function(key, val){
				
				var css = {}
				if(!$.isEmptyObject(options.columns)){

					var column = options.columns[key]

					if(typeof(column)!="undefined")
						if(column.hasOwnProperty("css"))
							css = column.css || css
				}

				cell = $(document.createElement("TD"))
						.attr("name", key)
						.css(css)

				if(options.resizeColumns)
					cell.html($(document.createElement("DIV")).html(val))
				else
					cell.html(val)

				row.append(cell)
			})

			return row;
		}

		/*****/buildBody(table, data, options){

			var pageNo = parseInt(options.pager.page);
			var pageSize = parseInt(options.pager.rows);
			var startFrom = ((pageNo - 1) * pageSize)+1;

			var tbody = $(document.createElement("TBODY"));

			var _this = this;
			$.each(data, function(idx, row){

				tbody.append(Grid.prototype.addRow.apply(_this, [

					startFrom++, row, options
				]));
			})
				

			table.append(tbody);
		}

		/*****/buildHeader(table, rows, options){

			var thead = $(document.createElement("THEAD"));
			var th = $(document.createElement("TH"));

			thead.append(th.html("&nbsp;"));

			$.each(rows[0], function(key, val){

				var css={};
				var name = "";

				if(!$.isEmptyObject(options.columns)){

					if(options.columns.hasOwnProperty(key)){

						var cell = options.columns[key];

						name = cell.name || key;

						if(cell.hasOwnProperty("css"))
							if(cell.css.hasOwnProperty("display"))
								if(cell.css.display.toLowerCase().trim() == "none")
									css = {display:"none"}
					}
				}

				if(!name){

					var parts = key.split("_")

					if(parts.length>1)
						name = parts.map(function(a){

							return a[0].toUpperCase()+a.substring(1)

						}).join(" ")
					else
						name = key[0].toUpperCase() + key.substring(1)
				}

				thead.append($(document.createElement("TH"))
								.attr("name", key)
								.html(name)
								.css(css))
			})

			if(rows.length>0){

				table.append(thead);

				return true;
			}
			else return false;
		}

		/*****/addToolbar(arrEl){

			var customToolBar = $(document.createElement("DIV"));
			customToolBar.addClass("simplr-grid-toolbar");

			$.each(arrEl, function(idx, el){

				customToolBar.append(el)
			})

			return customToolBar;
		}

		/*****/buildPager(table, options){

			var txtPageNum = $(document.createElement("INPUT"));
			txtPageNum.val(options.pager.page);
			txtPageNum.addClass("page-num").attr("size", 2);

			var cboPager = $(document.createElement("SELECT"));
			$.each(options.pager.list, function(i,e){

				$(cboPager).append(new Option(e))
			});	

			var _this = this;
			var _loader = Grid.prototype.loader;
			var _rebuildBody = Grid.prototype.rebuildBody;

			cboPager.change(function(){
				
				options.pager.page = 1;

				options.pager.rows = $(this).val();

				txtPageNum.val(options.pager.page);

				_loader.apply(_this, [table, options, _rebuildBody]);
			});

			var btnFirst = $(document.createElement("BUTTON"))
								.addClass("sg-first")
								.html("&#171;").attr("title", "First")

			btnFirst.click(function(){

				if(options.pager.page != 1){

					options.pager.page = 1;

					txtPageNum.val(options.pager.page);

					_loader.apply(_this, [table, options, _rebuildBody]);
				}
			})

			var btnPrev = $(document.createElement("BUTTON"))
								.addClass("sg-prev")
								.html("&#8249;").attr("title", "Previous")

			btnPrev.click(function(){

				if(options.pager.page>1){

					options.pager.page--;

					txtPageNum.val(options.pager.page);

					_loader.apply(_this, [table, options, _rebuildBody]);
				}
			})

			var btnNext = $(document.createElement("BUTTON"))
								.addClass("sg-next")
								.html("&#8250;").attr("title", "Next")

			btnNext.click(function(){

				if(options.pager.page<options.pager.pages){

					options.pager.page++;

					txtPageNum.val(options.pager.page);

					_loader.apply(_this, [table, options, _rebuildBody]);
				}
			})

			var btnLast = $(document.createElement("BUTTON"))
								.addClass("sg-last")
								.html("&#187;").attr("title", "Last")

			btnLast.click(function(){

				if(options.pager.page!=options.pager.pages){

					options.pager.page = options.pager.pages;

					txtPageNum.val(options.pager.page);

					_loader.apply(_this, [table, options, _rebuildBody]);
				}
			})

			var btnRefresh = $(document.createElement("BUTTON"))
								.addClass("sg-refresh")
								.html("&#8634;").attr("title", "Refresh")

			btnRefresh.click(function(){

				options.pager.page = table.parent().parent().find(".page-num").val()

				_loader.apply(_this, [table, options, _rebuildBody]);
			})

			var SEP = "&nbsp;|&nbsp;";

			var spanPages = $(document.createElement("SPAN"));
			spanPages.addClass("num-of-pages")
			spanPages.html(options.pager.pages);

			return Grid.prototype.addToolbar.apply(this, [[

					cboPager,
					SEP,
					btnFirst,
					btnPrev,
					"<span> Page </span>",
					txtPageNum,
					"<span> of </span>",
					spanPages,
					"<span>&nbsp;</span>",
					btnNext,
					btnLast,
					SEP,
					btnRefresh,
				]
			])
		}

		/*****/buildToolbars(table, data, options){

			var gridCapsule = $(document.createElement("DIV"));
			gridCapsule.addClass("simplr-grid-capsule")

			gridCapsule.css({

				width:options.css.capsuleWidth
			})

			table.css({

				width:options.css.gridWidth,
			})

			var _this = this;
			var _rebuildBody = Grid.prototype.rebuildBody
			var _loader = Grid.prototype.loader
			var _addToolbar = Grid.prototype.addToolbar
			var _buildPager = Grid.prototype.buildPager

			var _options = table.data('options')
			table.replaceWith(gridCapsule) //replace erases options
			table.data('options', _options)
			table.bind('refresh', function(event, options){

				console.log(options);

				var options = $.extend(table.data('options'), options);

				_loader(table, options, _rebuildBody);
			})

			var gridTitle = $(document.createElement("DIV"));
			gridTitle.addClass("simplr-grid-title")
			gridTitle.html("&nbsp;".concat(options.title))

			var gridInner = $(document.createElement("DIV"));
			gridInner.addClass("simplr-grid-inner")
			gridInner.css({

				height:options.css.gridHeight
			})

			gridCapsule.append(gridTitle)

			$.each(options.toolbars, function(idx, toolbar){

				gridCapsule.append(_addToolbar.apply(_this, [toolbar]));
			})

			if(options.usePager)
				gridCapsule.append(_buildPager(table, options))

			gridCapsule.append(gridInner)

			gridInner.append(table)
		}

		/*****/disableToolbar(table, disableTBar){

			var toolbar = table.parent().prev()
			toolbar.find(".sg-last, .sg-next, .sg-prev, .sg-first, .page-num, select")
					.attr("disabled", disableTBar)

			if(disableTBar){

				var msgOuter = $("<div>").addClass("msg-outer")
				var msgInner = $("<div>").addClass("msg-inner").html("No Data")
				table.parent().not(":has(.msg-outer)").append(msgOuter.append(msgInner))

				// toolbar.find(".page-num").val("") <-- never uncomment this loader will not load data
				toolbar.find(".num-of-pages").html("#")
			}
			else table.parent().find(".msg-outer").remove()
		}

		/*****/build(table, data, options){

			Grid.prototype.buildToolbars.apply(this, [table, data, options]);

			if(data.rows.length>0){

				Grid.prototype.buildHeader.apply(this, [table, data.rows, options])
				Grid.prototype.buildBody.apply(this, [table, data.rows, options])
				Grid.prototype.doPlugins.apply(this, [table, options])

				Grid.prototype.disableToolbar.apply(this, [table, false])
			}
			else Grid.prototype.disableToolbar.apply(this, [table, true])
		}

		/*****/rebuildBody(table, data, options){

			table.find("thead").remove();
			table.find("tbody").remove();

			setTimeout(function(){

				if(data.rows.length>0){

					Grid.prototype.buildHeader.apply(this, [table, data.rows, options])
					Grid.prototype.buildBody.apply(this, [table, data.rows, options]);
					Grid.prototype.doPlugins.apply(this, [table, options])

					table.parent().parent().find(".num-of-pages").html(options.pager.pages);

					Grid.prototype.disableToolbar.apply(this, [table, false])
				}
				else Grid.prototype.disableToolbar.apply(this, [table, true])

			}, 100)
		}

		/*****/doPlugins(table, options){

			if(options.fixHeader)
				table.fixHeader();

			if(options.fixLeftColumn)
				table.fixLeftColumn();
			else
				table.parent().css({

					overflow:"auto"
				})

			if(options.resizeColumns)
				table.resizeColumns();
		}

		/*****/nativeLoader(table, options, builder){

			$.ajax({

			    type:options.method,
			    dataType:'json',
			    // fake: true,	// <<<---- that's it !
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

		/*****/loader(table, options, builder){

			table.addClass("simplr-grid")

			if(options.data.length>0){

				builder.apply(this, [table,{

					rows:options.data,
					count:options.data.length

				},options]);

				this.doPlugins(table, options);
			}
			else{

				if(options.customLoader)
					options.customLoader(table, options, builder)
				else
					this.nativeLoader(table, options, builder);
			}
		}
	}

	$.fn.simplrGrid = function(options){

		var defaults = {

			title:"Simplr Grid",
    		toolbars:[],
    		columns:{},
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
        	data:[],
        	method:"POST",
        	singleSelect:true,
        	dblClick:null,
        	customLoader:null,
        	usePager:false,
        	fixHeader:false,
			fixLeftColumn:false,
			resizeColumns:false
        };

        options = $.extend(true, {}, defaults, options);

        this.data('options', options)

		return this.each(function(){

			var grid = new Grid();
			grid.loader($(this), options, grid.build)
		})
	}

	$.fn.getRow = function(selector){

		var data = {}

		$(this).has("td").find("td:not(:first-child)").each(function(idx, el){

			var key = $(el).attr("name")

            if($(this).has("div").length)
                val = $(this).find("div").html()
            else
                val = $(this).html()

            data[key] = val;
		})

		return data;
	}

	$.fn.getSelectedRow = function(){

        return $(this).find("tr.selected:first").getRow();
	}

	$.fn.getSelectedRows = function(){

		var rows = [];

		$.each($(this).find("tr.selected"),function(idxRow, row){

			rows.push($(row).getRow());
		});

		return rows;
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

})(jQuery);
