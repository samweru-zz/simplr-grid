Simplr Grid
===========
![simplr-grid](https://raw.githubusercontent.com/samweru/simplr-grid/master/img/simplr-grid.png)

## Usage

```js
$("#employee-tbl").simplrGrid({

    title:"Employees",
    url:"/data/employees",
    method:"GET",
    singleSelect:true,
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

        /*var data = {}

        $.each($(this).find("td"), function(idx, el){

            var key = $(el).attr("name")

            if($(this).has("div").length)
                val = $(this).find("div").html()
            else
                val = $(this).html()

            data[key] = val;
        })

        console.log(data);*/
    }
})
```

## Plugins

`simplr-grid` - is a plugin by itself but also includes other plugins that are already used in grid functionality. If you so wish to use them individually on other elements, you can:

1. `resizeColumns` - use header to resize columns
2. `fixHeader` - freeze header row
3. `fixLeftColumn` - freeze left most column
4. `getSelectedRow` and `getAllSelectedRows` - uses class `.selected`

## Custom Ajax Setup

In case you want to use your own ajax function you can add `load` as an option on `simplr-grid` this is useful when you want to mock

```js
load:function(table, options, builder){

    $.ajax({

        type:options.method,
        dataType:'json',
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

        table
            // .resizeColumns()
            .fixHeader()
            // .fixLeftColumn()
    })
}
```

## Contributions

Thanks a lot to the developer(s) of the plugin(s) below: 

[TableHeadFixer](https://github.com/lai32290/TableHeadFixer)

Have fun!