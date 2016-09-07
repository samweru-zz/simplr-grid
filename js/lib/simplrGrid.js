(function($){

	$.fn.resizeHeader = function(){

	    return this.each(function(){

	    	var pressed = false;
		    var start = undefined;
		    var startX, startWidth;

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

	$.fn.fixHeader = function(){

		var settings = {

			head: true
		}

		return this.each(function(){

			setParent($(this));

			fixHead($(this));
		});

		function setParent(table){

			var parent = table.parent();
			parent.append(table);
			parent.css({

				'overflow-x' : 'auto',
				'overflow-y' : 'auto'
			});

			parent.scroll(function() {

				var top = parent.scrollTop();

				this.find("thead tr > *").css("top", top);

			}.bind(table));
		}

		function fixHead(table){
			
			var thead = table.find("thead");
			var tr = thead.find("tr");
			var cells = thead.find("tr > *");

			cells.css({

				'position' : 'relative'
			});
		}
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

	$.fn.getSelected = function(){

		var cells = $(this).find("tr.selected:first td");

		var cellData = {};

		$.each(cells,function(k,l){

			var field = $(l).attr("field")
			if(!!field)
				cellData[field] = $(l).find("div").html();
		})

		return cellData;
	}

	$.fn.getAllSelected = function(){

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

	$.fn.simplrGrid = function(options){

		var defaults = {

			title:"Simplr Grid",
			columnHide:[],
    		toolbars:[],
    		pager:{

    			page:1,
    			rows:50,
    			list:[50,40,30,20,10]
    		},
        	css:{},
        	data:[],
        	method:"POST",
        	singleSelect:true,
        	resizeColumns:true,
        	freezeLeftColumn:true,
        	freezeHeader:true,
        	usePager:false,
        };

        options.pager = $.extend({}, defaults.pager, options.pager);
		var settings = $.extend({__initGrid:true}, defaults, options);

		function createHeader(tblEl, options){

			tblEl.addClass("simplr-grid");

			var thead = $(document.createElement("THEAD"));
			var theadTr = $(document.createElement("TR"));

			thead.append(theadTr);
			tblEl.append(thead);

			IdCellTh = $(document.createElement("TH"));
			theadTr.append(IdCellTh);

			var headerList = Object.keys(options.data[0]);
			$.each(headerList, function(l,m){

				var th = $(document.createElement("TH"));
				th.append(m[0].toUpperCase() + m.substring(1));

				if(options.resizeColumns)
					th.append($("<span>&nbsp;</span>"))

				if($.inArray(m, options.columnHide)!=-1)
					th.hide();

				theadTr.append(th);
			});
		}

		function createBody(tblEl, options){

			var tbody = $(document.createElement("TBODY"));
			tblEl.append(tbody);

			var pageNo = parseInt(options.pager.page);
			var pageSize = parseInt(options.pager.rows);
			var startFrom = ((pageNo - 1) * pageSize)+1;

			$.each(options.data, function(i,e){

				var row = $(document.createElement("TR"));

				if(!!options.onDblClick)
					row.dblclick(function(evt){

						var cells = $(evt.currentTarget).find("td");

						var cellData = {};

						$.each(cells,function(k,l){

							var field = $(l).attr("field")
							if(!!field)
								cellData[field] = $(l).find("div").html();
						});

						options.onDblClick(cellData);
					})

				tbody.append(row);

				row.click(function(evt){

					if(options.singleSelect)
						$(evt.currentTarget).parent().find("tr.selected").removeClass("selected");

					if($(evt.currentTarget).hasClass("selected"))
						$(evt.currentTarget).removeClass("selected");
					else
						$(evt.currentTarget).addClass("selected");
				});

				var n=0;
				$.each(e, function(j,k){

					if(n==0){

						var IdCell = $(document.createElement("TD"));	
						IdCell.css({textAlign:"right", fontWeight:"bold"});
						IdCell.html(startFrom++);
						row.append(IdCell);
					}

					var cell = $(document.createElement("TD"));
					row.append(cell);
					cell.attr("field", j);

					if($.inArray(j, options.columnHide)!=-1)
						cell.hide();

					cell.html($(document.createElement("DIV")).html(k));

					n++;
				});
			});

			tblEl.css({

				minWidth:"1000px"
			})
		}

		function calcNumberOfPages(_totalNumberOfRows, _rowsPerPage){

			var totalNumOfRows = parseInt(_totalNumberOfRows);
        	var rowsPerPage = parseInt(_rowsPerPage);
        	var numOfPages = Math.ceil(totalNumOfRows/rowsPerPage);

        	return numOfPages;
		}

		var SimplrGrid = function(options){

			this.options = options;
		}

		SimplrGrid.prototype = {

			constructor:SimplrGrid,
			addToolbar:function(elList){

				var divToolbar = $(document.createElement("DIV"));
				divToolbar.addClass("simplr-grid-toolbar");

				$.each(elList,function(i,e){

					divToolbar.append(e);
				});

				return divToolbar;
			},
			_reTblEl:function(el){

				this.options.__initGrid = false;

				el.find(".simplr-grid tbody").remove();

				return el.find(".simplr-grid");
			},
			_cfgPager:function(config){

				this.options.pager = $.extend(this.options.pager, config);
			},
			_calcPages:function(){

				return calcNumberOfPages(this.options.pager.count, this.options.pager.rows);
			},
			pager:function(el){

				var self = this;

				var txtPageNum = $(document.createElement("INPUT"));
				txtPageNum.val(this.options.pager.page);
				txtPageNum.addClass("page-num").attr("size", 2);

				var cboPager = $(document.createElement("SELECT"));
				$.each(this.options.pager.list, function(i,e){

					$(cboPager).append(new Option(e))
				});

				$(cboPager).val(this.options.pager.rows);

				cboPager.change(function(){

					var startAtPage = 1;

					self._cfgPager({

						page:startAtPage,
						rows:parseInt($(this).val())
					});

					txtPageNum.val(startAtPage);

					self.getData(self._reTblEl(el));
				});

				var ancFirst = $(document.createElement("BUTTON")).html("|<")
				ancFirst.click(function(){

					if(self.options.pager.page>1){

						self.options.pager.page=1
						txtPageNum.val(self.options.pager.page);

						self.getData(self._reTblEl(el));
					}
				})

				var ancPrev = $(document.createElement("BUTTON")).html("<")
				ancPrev.click(function(){

					if(self.options.pager.page>1){

						self.options.pager.page--
						txtPageNum.val(self.options.pager.page);

						self.getData(self._reTblEl(el));
					}
				})

				var ancNext = $(document.createElement("BUTTON")).html(">")
				ancNext.click(function(){

					var numOfPages = self._calcPages();
					var currPage = parseInt(self.options.pager.page);

					if(currPage<numOfPages){

						self.options.pager.page++;
						txtPageNum.val(self.options.pager.page);

						self.getData(self._reTblEl(el));
					}
				})

				var ancLast = $(document.createElement("BUTTON")).html(">|")
				ancLast.click(function(){

					var lastPage = self._calcPages();
					var currPage = parseInt(self.options.pager.page);

					if(currPage<lastPage){

						self.options.pager.page = lastPage;
						txtPageNum.val(lastPage);

						self.getData(self._reTblEl(el));
					}
				})

				var ancRefresh = $(document.createElement("BUTTON")).html("Refresh")
				ancRefresh.click(function(){

					var lastPage = self._calcPages();
					var expectedPageNo = txtPageNum.val();

					var pageNo = 1;
					if(!isNaN(expectedPageNo))
						pageNo = parseInt(expectedPageNo);

					if(pageNo>lastPage)
						pageNo = lastPage;

					if(expectedPageNo != pageNo)
						txtPageNum.val(pageNo);

					self._cfgPager({page:pageNo});

					self.getData(self._reTblEl(el));
				})

				var SEP = "&nbsp;|&nbsp;";

				var spanPages = $(document.createElement("SPAN"));
				spanPages.addClass("num-of-pages")

				return this.addToolbar([

					cboPager, SEP,
					ancFirst,
					ancPrev,
					" Page ", txtPageNum, " of ", spanPages, "&nbsp;",
					ancNext,
					ancLast, SEP,
					ancRefresh
				]);
			},
			createTitle:function(){

				var divTitle = $(document.createElement("DIV"));
				divTitle.addClass("simplr-grid-title")
				divTitle.html("&nbsp;".concat(this.options.title));

				return divTitle;
			},
			createCapsule:function(){

				var divCapsule = $(document.createElement("DIV"));
				divCapsule.addClass("simplr-grid-capsule");

				var divCapsuleBody = $(document.createElement("DIV"));
				divCapsuleBody.addClass("simplr-grid-body");

				divCapsule.css({

					width:this.options.css.width
				});

				divCapsuleBody.css({

					height:this.options.css.height
				})

				divCapsule.append(divCapsuleBody);

				return divCapsule;
			},
			getData:function(el){

				var self = this;

				if(!!this.options.url){

			        $.ajax({

			        	url:this.options.url,
			        	method:this.options.method,
			        	data:{

			        		page:this.options.pager.page,
			        		rows:this.options.pager.rows
			        	}
			        })
			        .done(function(response){

			        	self.options.data = response.rows;

			        	self._cfgPager({count:response.count});

			        	if(self.options.__initGrid)
			        		createHeader(el, self.options);

			        	createBody(el, self.options);

			        	var numOfPages = self._calcPages();

			        	el.parent().parent().find(".num-of-pages").html(numOfPages);

			        	self.enableAddOns(el);
			        })
			        .fail(function(){

			        	console.log("Ajax Error!");
			        })
			    }
			    else if(!!this.options.data){
			    	
		        	if(this.options.__initGrid)
		        		createHeader(el, this.options);

		        	createBody(el, this.options);
			    }
			},
			enableAddOns:function(el){

				if(this.options.__initGrid){

					if(this.options.freezeLeftColumn)
						el.fixLeftColumn();

					if(this.options.freezeHeader)
						el.fixHeader();

					if(this.options.resizeColumns)
						el.resizeHeader();
				}
				else
					el.fixLeftColumn();
			}
		}
 
	    return this.each(function(){

	        var sg = new SimplrGrid(settings);

	        var capsule = sg.createCapsule();

	        sg.getData($(this));

	        $(this).wrap(capsule);

	        var el = $(this).parent();

	        el.before(sg.createTitle());

	        $.each(settings.toolbars, function(i, e){

	        	el.before(sg.addToolbar(e));
	        });
			
			if(settings.usePager)
				el.before(sg.pager(el));
	    });
	 
	};	

})(jQuery);