(function($){

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

	var Grid = {

		createHeader:function(tblEl, options){

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

				if($.inArray(m, options.columnHide)!=-1)
					th.hide();

				theadTr.append(th);
			});
		},
		createBody:function(tblEl, options){

			var tbody = $(document.createElement("TBODY"));
			tblEl.append(tbody);

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
						IdCell.html(i+1);
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
	};

	$.fn.simplrGrid = function(options) {

		var defaults = {

			columnHide:[],
			pageList:[50,40,30,20,10],
			title:"Simplr Grid",
    		toolbars:[],
    		usePager:false,
    		pager:{

    			page:1,
    			rows:50
    		},
        	css:{},
        	data:[],
        	singleSelect:true,
        	method:"POST",
        	__initGrid:true
        };

		var settings = $.extend({}, defaults, options);

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
			pager:function(el){

				var self = this;

				var cboPager = $(document.createElement("SELECT"));
				$.each(this.options.pageList, function(i,e){

					$(cboPager).append(new Option(e))
				});

				cboPager.change(function(){

					settings.pager = {

						page:1,
						rows:parseInt($(this).val())
					}

					self.getData(self._reTblEl(el), settings);
				});

				var ancFirst = $(document.createElement("BUTTON")).html("|<")
				ancFirst.click(function(){

					if(settings.pager.page>1){

						settings.pager.page=1
						txtPageNum.val(settings.pager.page);

						self.getData(self._reTblEl(el), settings);
					}
				})

				var ancPrev = $(document.createElement("BUTTON")).html("<")
				ancPrev.click(function(){

					if(settings.pager.page>1){

						settings.pager.page--
						txtPageNum.val(settings.pager.page);

						self.getData(self._reTblEl(el), settings);
					}
				})

				var ancNext = $(document.createElement("BUTTON")).html(">")
				ancNext.click(function(){

					settings.pager.page++;
					txtPageNum.val(settings.pager.page);

					self.getData(self._reTblEl(el), settings);
				})

				var ancLast = $(document.createElement("BUTTON")).html(">|")

				var ancRefresh = $(document.createElement("BUTTON")).html("Refresh")
				ancRefresh.click(function(){

					self.getData(self._reTblEl(el), settings);
				})

				var txtPageNum = $(document.createElement("INPUT"));
				txtPageNum.val(settings.pager.page);
				txtPageNum.addClass("page-num").attr("size", 2);

				var sep = "&nbsp;|&nbsp;";

				return this.addToolbar([

					cboPager,sep,
					ancFirst,
					ancPrev,
					" Page ",txtPageNum, " of ",
					ancNext,
					ancLast,sep,
					ancRefresh
				]);
			},
			createTitle:function(title){

				var spanCap = $(document.createElement("DIV"));
				spanCap.addClass("simplr-grid-title")
				spanCap.html("&nbsp;".concat(title));

				return spanCap;
			},
			createCapsule:function(){

				var divCapsule = $(document.createElement("DIV"));
				divCapsule.addClass("simplr-grid-capsule");

				var divCapsuleBody = $(document.createElement("DIV"));
				divCapsuleBody.addClass("simplr-grid-body");

				divCapsule.css({

					maxWidth:this.options.css.width
				});

				divCapsuleBody.css({

					height:this.options.css.height
				})

				divCapsule.append(divCapsuleBody);

				return divCapsule;
			},
			getData:function(el, settings){

				var self = this;

				if(!!settings.url){

			        $.ajax({

			        	url:settings.url,
			        	method:settings.method,
			        	data:{

			        		page:settings.pager.page,
			        		rows:settings.pager.rows
			        	}
			        })
			        .done(function(response){

			        	settings.data = response.rows;

			        	if(settings.__initGrid)
			        		Grid.createHeader(el, settings);

			        	Grid.createBody(el, settings);

			        	self.enableAddOns(el);
			        })
			        .fail(function(){

			        	console.log("Ajax Error!");
			        })
			    }
			    else if(!!settings.data){
			    	
		        	if(settings.__initGrid)
		        		Grid.createHeader(el, settings);

		        	Grid.createBody(el, settings);
			    }
			},
			enableAddOns:function(el){

				if(settings.__initGrid){

					if(jQuery.fn.tableHeadFixer)
						el.tableHeadFixer({

							left:1,
							head:true
						});

					if(jQuery.fn.resizable)
						el.find('th').resizable({

					        handles: 'e',
					        minWidth: 18
					    });	
				}
				else{

					if(jQuery.fn.tableHeadFixer)
						el.tableHeadFixer({

							left:1,
							head:false
						});
				}
			}
		}
 
	    return this.each(function(){

	        var sg = new SimplrGrid(settings);

	        var capsule = sg.createCapsule();

	        sg.getData($(this), settings);

	        $(this).wrap(capsule);

	        var el = $(this).parent();

	        el.before(sg.createTitle(settings.title));

	        $.each(settings.toolbars, function(i, e){

	        	el.before(sg.addToolbar(e));
	        });
			
			if(settings.usePager)
				el.before(sg.pager(el));		
	    });
	 
	};	

})(jQuery);