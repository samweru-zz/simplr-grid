Simplr Grid
===========
![simplr-grid](https://raw.githubusercontent.com/samweru/simplr-grid/master/img/simplr-grid.png)

## Usage

```js
var button = $(document.createElement("BUTTON"));
var customToolbar = [

    button.clone().html("Add").click(function(){

        console.log("Button Add Clicked.")
    }),
    button.clone().html("Sel").click(function(){

        console.log("Button Select Clicked.")
    })
];

$("#employee-tbl").simplrGrid({

    title:"Employees",
    url:"/data/employees",
    method:"POST",
    singleSelect:true,
    usePager:true,
    fixHeader:true,
    fixLeftColumn:true,
    resizeColumns:true,
    // data:[] //if you want to input data directly. Overrides Ajax
    columns:{

        "id":{name:"#", css:{display:"none"}},
        "email":{name:"Email", css:{textDecoration:"underline"}},
        "county":{name:"County"}, 
        "mobile":{name:"Mobile"},
        "address":{name:"Address"},
        "married":{name:"Married"},
        "employed":{name:"Employed", css:{textAlign:"right", paddingRight:"10px"}},
        "lastname":{name:"Last Name"},
        "firstname":{name:"First Name"}
    },
    css:{

        gridWidth:"1100px",
        gridHeight:"400px",
        capsuleWidth:"100%",
        capsuleHeight:"600px",
    },
    toolbars:[

        customToolbar //This represents a single toolbar
    ],
    pager:{

        page:1,
        rows:10,
        list:[10,20,30,40,50]
    },
    dblClick:function(){

        console.log($(this).getRow());
    }
})
```

## Plugins

`simplr-grid` - is a plugin by itself but also includes other plugins that are already used in grid functionality. If you so wish to use them individually on other elements, you can:

1. `resizeColumns` - use header to resize columns
2. `fixHeader` - freeze header row
3. `fixLeftColumn` - freeze left most column
4. `getSelectedRow` & `getSelectedRows` - uses class `.selected` to get row(s)
5. `getRow` - gets row data

## Custom Ajax Setup

In case you want to use your own ajax function you can add `customLoader` as an option on `simplr-grid` this is useful when you want to mock

```js
customLoader:function(table, options, builder){

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
    })
}
```

## Need to know stuff

If you ever need to refresh the grid programmatically:

```js
$("#employee-tbl").trigger("refresh")
```

## Contributions

Thanks a lot to the developer(s) of the plugin(s) below: 

[TableHeadFixer](https://github.com/lai32290/TableHeadFixer)

### Some goodies used in this project.

- [Fake Ajax](https://github.com/anasnakawa/jquery.ajax.fake) - Fake a web service
- [Taffy DB](https://github.com/typicaljoe/taffydb) - Browser in-memory database

Have fun!