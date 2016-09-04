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

	$.fn.simplrGrid = function(options) {

		var defaults = {

			columnHide:[],
			pageList:[50,40,30,20,10],
			title:"Simplr Grid",
    		toolbars:[],
    		usePager:false,
    		pager:{},
        	css:{},
        	data:{},
        	singleSelect:true
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
			pager:function(){

				var cboPager = $(document.createElement("SELECT"));
				$.each(this.options.pageList, function(i,e){

					$(cboPager).append(new Option(e))
				});

				var ancFirst = $(document.createElement("BUTTON")).html("|<")
				var ancPrev = $(document.createElement("BUTTON")).html("<")
				var ancNext = $(document.createElement("BUTTON")).html(">")
				var ancLast = $(document.createElement("BUTTON")).html(">|")

				var ancRefresh = $(document.createElement("BUTTON")).html("Refresh")
				var txtPageNum = $(document.createElement("INPUT"));
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
			createGrid:function(tblEl, data){

				tblEl.addClass("simplr-grid");

				var thead = $(document.createElement("THEAD"));
				var theadTr = $(document.createElement("TR"));

				thead.append(theadTr);
				tblEl.append(thead);

				IdCellTh = $(document.createElement("TH"));
				theadTr.append(IdCellTh);

				_options = this.options;
				$.each(Object.keys(data[0]), function(l,m){

					var th = $(document.createElement("TH"));
					th.append(m[0].toUpperCase() + m.substring(1));

					if($.inArray(m, _options.columnHide)!=-1)
						th.hide();

					theadTr.append(th);
				});

				var tbody = $(document.createElement("TBODY"));
				tblEl.append(tbody);

				$.each(data, function(i,e){

					var row = $(document.createElement("TR"));

					if(!!_options.onDblClick)
						row.dblclick(function(evt){

							var cells = $(evt.currentTarget).find("td");

							var cellData = {};

							$.each(cells,function(k,l){

								var field = $(l).attr("field")
								if(!!field)
									cellData[field] = $(l).find("div").html();
							});

							_options.onDblClick(cellData);
						})

					tbody.append(row);

					row.click(function(evt){

						if(_options.singleSelect)
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

						if($.inArray(j, _options.columnHide)!=-1)
							cell.hide();

						cell.html($(document.createElement("DIV")).html(k));

						n++;
					});
				});

				tblEl.css({

					minWidth:"1000px"
				})
			}
		}
 
	    return this.each(function() {

	        var sg = new SimplrGrid(settings);

	        var capsule = sg.createCapsule();

	        sg.createGrid($(this), settings.data);

	        $(this).wrap(capsule);

	        var el = $(this).parent();

	        el.before(sg.createTitle(settings.title));

	        $.each(settings.toolbars, function(i,e){

	        	el.before(sg.addToolbar(e));
	        });
			
			if(settings.usePager)
				el.before(sg.pager());			
	    });
	 
	};	

})(jQuery);