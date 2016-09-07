Simplr Grid
===========

## Usage

```js

$("#data-grid").simplrGrid({

        url:"/server/fetch.all.php",
        // method:"POST",
        title:"Sample Grid",
        usePager:true,
        // data:jsonData, //use when inserting data directly
        singleSelect:true,
        // freezeHeader:false,
        // freezeLeftColumn:false,
        // resizeColumns:false,
        columnHide:[

            // "id"
        ],
        toolbars:[

            //[btnAdd, btnSel] //create and insert elements into multiple toolbars directly
        ],
        css:{

            width:500,
            height:500
        },
        pager:{

            page:1,
            rows:10//,
            // list:[10,20]
        },
        onDblClick:function(row){

            console.log(row);
        }
    });
```

## Plugins

simplrGrid - is a plugin by itself but also includes other plugins that assist in grid functionality. They can be used individually but with some adjustment to your code.

1. `resizeHeader` - to use place empty `span` element in `th`  as resize handler
2. `fixHeader`
3. `fixLeftColumn`
4. `getSelected` - gets single table row anything which has class `selected`
5. `getAllSelected` - gets multiple table rows with class `selected`

## Contributions

Thanks a lot to the developer(s) of the plugin(s) below: 

[TableHeadFixer](https://github.com/lai32290/TableHeadFixer)

Have fun!
