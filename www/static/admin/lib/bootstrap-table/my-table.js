! function($) {

    //'use strict';

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initData = BootstrapTable.prototype.initData;

    $.extend($.fn.bootstrapTable.defaults, {
        groupBy: false,
        groupByField: undefined,
    });



    BootstrapTable.prototype.initData = function(data, type) {
        //if(data !== undefined){
        // console.log(data);
        var newData = [];

        var getNewRow = function(data) {
            if (data && data.length && data.length > 0) {
                var i = 0,
                    l = data.length;
                for (; i < l; i++) {
                    newData.push(data[i]);
                    if (data[i].children && data[i].children.length > 0) {
                        getNewRow(data[i].children);
                    }
                }
            }
        };

        getNewRow(data);
        // console.log(newData);
        //return false;
        //}
        // var newData= [];
        // if(data){
        //     for(var i =0,l=data.length;i<l;i++){
        //         newData.push(data[i]);
        //         if(data[i].children.length > 0){
        //             for(var j =0,k=data[i].children.length;j<k;j++){
        //                 newData.push(data[i].children[j]);
        //                 if(data[i].children[j].children.length > 0){
        //                     for(var n =0,m=data[i].children[j].children.length;n<m;n++){
        //                         newData.push(data[i].children[j].children[n]);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        if (newData) {
            // console.log(newDate);
            // return false;
            _initData.apply(this, [newData, type]);
        }

    };



    var tree = []

    function parseTree(obj, index, length, callback) {
        tree.push(obj[index]);
        if (index + 1 < length && !obj[index].children || (obj[index].children && obj[index].children.length <= 0)) {
            parseTree(obj, index + 1, length);
        } else if (index + 1 < length && obj[index].children && obj[index].children.length > 0) {
            parseTree(obj[index].children, 0, obj[index].children.length, function() {
                parseTree(obj, index + 1, length);
            });
        } else if (index + 1 >= length && obj[index].children && obj[index].children.length > 0) {
            parseTree(obj[index].children, 0, obj[index].children.length);
        }
        callback && callback()
    }

    // function getNewRow(data){
    //     if(data && data.length && data.length > 0){
    //         var i = 0,
    //             l = data.length;
    //         for(;i<l;i++){
    //             newData.push(data[i]);
    //             if(data[i].children && data[i].children.length>0){
    //                 getNewRow(data[i].children);
    //             }
    //         }
    //     }
    //
    // }

}(jQuery);
