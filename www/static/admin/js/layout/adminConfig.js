/**
 * [网站后台require的indexConfig.js]
 * @con admin网站requirejs的配置
 * @aim 配置requirejs
 * @author 方谦炜
 * @time 2016/11/17 13.33
 */
var basePath =  '/static/admin';
require.config({
    baseUrl: basePath,
    paths: {
        'jquery'            : 'js/layout/jquery.min',
        'bootstrap'         : 'js/layout/bootstrap.min',
        'layer'             : 'lib/layer/layer',
        'bootstrapTable'    : 'lib/bootstrap-table/bootstrap-table.min',
        'bootstrapTableZnCn'    : 'lib/bootstrap-table/locale/bootstrap-table-zh-CN.min',

        'adminBase'         : 'js/layout/adminBase',
    },
    map: {
       '*': {
           'css': 'js/layout/css.min'
       }
   },
    shim: {
        layer: {
            deps: [
                'jquery',
                'css!'+basePath+'/lib/layer/skin/layer',
            ],
			exports: 'layer'
        },
        bootstrap: {
            deps: ['jquery'],
			exports: 'bootstrap'
        },
        bootstrapTable:{
            deps: [
                'jquery',
                'css!'+basePath+'/lib/bootstrap-table/bootstrap-table.min',
            ],
			exports: 'bootstrapTable'
        },
        bootstrapTableZnCn:{
            deps: ['bootstrapTable'],
			exports: 'bootstrapTableZnCn'
        }
	},
});
