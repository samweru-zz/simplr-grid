Simplr Grid
===========
![simplrGrid](https://github.com/samweru/simplr-grid/tree/master/img/simplrGrid-min.png)

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
    onDblClick:function(row){//row double click event

        console.log(row);
    }
});
```

## Plugins

`simplrGrid` - is a plugin by itself but also includes other plugins that are already used in grid functionality. If you so wish to use them individually on other elements, you may do so but with some adjustment to your code.

1. `resizeHeader` - place empty `span` in `th`  to act as resize handler
2. `getSelected` - gets single or first `tr.selected` (returns json)
3. `getAllSelected` - gets multiple `tr.selected` (returns json list)
4. `fixHeader` - ready to use
5. `fixLeftColumn` - ready to use

## Contributions

Thanks a lot to the developer(s) of the plugin(s) below: 

[TableHeadFixer](https://github.com/lai32290/TableHeadFixer)

Have fun!
