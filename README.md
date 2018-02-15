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

        console.log($(this).parent().parent().getSelectedRow());
    }
})
```

## Plugins

`simplr-grid` - is a plugin by itself but also includes other plugins that are already used in grid functionality. If you so wish to use them individually on other elements, you can:

1. `resizeColumns` - use header to resize columns
2. `fixHeader` - freeze header row
3. `fixLeftColumn` - freeze left most column
4. `getSelectedRow` & `getSelectedRows` - uses class `.selected` to get row(s)

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
            .resizeColumns()
            .fixHeader()
            .fixLeftColumn()
    })
}
```

## Contributions

Thanks a lot to the developer(s) of the plugin(s) below: 

[TableHeadFixer](https://github.com/lai32290/TableHeadFixer)

### Other interesting things..

..that I used in this project.

- [Fake Ajax](https://github.com/anasnakawa/jquery.ajax.fake) - Fake a web service
- [Taffy DB](https://github.com/typicaljoe/taffydb) - Browser in-memory database

Have fun!