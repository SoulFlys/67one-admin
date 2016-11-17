require(['bootstrapTable','adminBase','bootstrapTableZnCn'], function(bootstrapTable,Q) {
    var $scope = $('.user-index');
    var table = $('#user-table', $scope).bootstrapTable({
        url: '/admin/user/view',
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        sidePagination: "server",
        dataType: 'json',
        dataField: 'data',
        height: $(window).height() - 125,
        cache: 0, //设置为 true 禁用 AJAX 数据缓存
        toolbar: "#exampleTableEventsToolbar",
        toolbarAlign: 'right',
        columns: [
            // {
            //     field: 'state',
            //     checkbox: !0,
            // },
        {
            field: 'id',
            title: 'ID',
            // sortable: !0,
        }, {
            field: 'username',
            title: '用户名',
        }, {
            field: 'name',
            title: '真实姓名',
        }, {
            field: 'contact',
            title: '联系方式',
        }, {
            field: 'auth_group.0.title',
            title: '角色名称',
        }, {
            field: 'status',
            title: '启用状态',
        }, {
            field: 'create_time',
            title: '创建时间',
        }, {
            field: 'update_time',
            title: '修改时间',
        }, {
            field: 'last_login_time',
            title: '最后登录时间',
        }, {
            field: 'operate',
            title: '操作',
            formatter: operateFormatter,
            //events: operateEvents
        }],
        undefinedText: '空',
        // striped: true,    //隔行换色
        pagination: !0, //设置为 true 会在表格底部显示分页条
        pageNumber: 1,
        pageSize: 15, //如果设置了分页，页面数据条数
        pageList: '[10,15,20,25,30,40]',
        search: !0,
        searchText: '请输入姓名',
        searchAlign: "left", //查询框对齐方式
        iconSize: "outline",
        selectItemName: 'checkboxItem',
        //showColumns: !0,
        //searchAlign: 'right',
        // showColumns: !0, //显示隐藏列
        //showRefresh: !0, //是否显示 刷新按钮
        //silent: true,//刷新事件必须设置
        //idField: '' //指定主键列
        queryParams: queryParams,
        queryParamsType: 'limit',
        onLoadSuccess: function() {
            console.log("数据加载成功！");
        },
        onLoadError: function() {
            console.log("数据加载失败！");
        }
    });


    $scope.on('click', '#refresh', function() {
        table.bootstrapTable('refresh');
    });

    $scope.on('click', '.delete', function() {
        var $obj = $(this);
        var id = $obj.attr('data-id');
        var name = $obj.attr('data-name') || '';
        if (id) {
            //parent.全局打开
            layer.confirm('你确定删除' + name + '吗？', {
                title: '删除',
                icon: 0,
                btn: ['确定', '取消']
            }, function(index) {
                layer.close(index);
                myDelete(id);
            }, function(index) {
                layer.close(index);
                return false;
            });
        } else {
            layer.msg('请重新操作~');
        }
    });

    $scope.on('click', '#add', function() {
        var $obj = $(this);
        layer.open({
            type: 2,
            content: '/admin_user/add_edit_view',
            title: '新增管理员',
            shade: 0,
            area: ['800px','600px'],
            maxmin: !0,
            success: function(layero, index) {

            },
        });
    });

    $scope.on('click', '.edit', function() {
        var $obj = $(this);
        var id = $obj.attr('data-id');
        if(id){
            layer.open({
                type: 2,
                content: '/admin_user/add_edit_view?id='+id,
                title: '修改管理员信息',
                shade: 0,
                area: ['800px','600px'],
                maxmin: !0,
            });
        }else{
            layer.msg('请重新操作~');
        }
    });

    //启用/禁用
    $scope.on('click','.status',function(){
        var $obj = $(this);
        var id = $obj.attr('data-id');
        var name = $obj.attr('data-name') || '';
        var status = $obj.attr('data-status');
        if (id) {
            $.ajax({
                url: '../admin_user/status',
                type: 'POST',
                data: {
                    'id': id,
                    'status': status,
                },
                dataType: 'json',
                success: function(result) {
                    if (result.code === 1) {
                        layer.msg(result.msg,time_icon1,function(){
                            table.bootstrapTable('refresh');
                        });
                    } else {
                        layer.msg(result.msg,time_icon2);
                    }
                    return false;
                },
                error: function(XMLHttpRequest, textStatus, errorThrow) {
                    layer.alert('请求失败~请重试', {
                        icon: 5
                    });
                    return false;
                }
            });
        } else {
            layer.msg('请重新操作~');
        }
    });

    //分配角色
    $scope.on('click','.assign',function(){
        var $obj = $(this);
        var id = $obj.attr('data-id');
        if(id){
            layer.open({
                type: 2,
                content: '/admin_user/assgin_auth_group_view?id='+id,
                title: '分配管理员用户组',
                shade: 0,
                area: ['800px','600px'],
                maxmin: !0,
            });
        }else{
            layer.msg('请重新操作~');
        }
    });

    function myDelete(id) {
        $.ajax({
            url: '../admin_user/del',
            type: 'POST',
            data: {
                'id': id
            },
            dataType: 'json',
            success: function(result) {
                if (result.code === 1) {
                    layer.msg(result.msg,time_icon1,function(){
                        table.bootstrapTable('refresh');
                    });
                } else {
                    layer.msg(result.msg,time_icon2);
                }
                return false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrow) {
                layer.alert('请求失败~请重试', {
                    icon: 5
                });
                return false;
            }
        });
    }

    function operateFormatter(value, row, index) {
        var a,b;
        if(row.status=='启用'){
            a='禁用';b="btn-warning";
        }else{
            a='启用';b="btn-primary";
        }
        return [
            // '<a class="edit btn btn-xs btn-default btn-outline" data-id=' + row.id + ' style="margin-left:5px" href="javascript:void(0)" title="新增">',
            // '<i class="glyphicon glyphicon-plus"></i>',
            // '</a>',
            '<a class="edit btn btn-xs btn-default btn-outline" data-id=' + row.id + ' style="margin-left:5px" href="javascript:void(0)" title="编辑">',
            '<i class="glyphicon glyphicon-edit"></i>',
            '</a>',
            '<a class="assign btn btn-xs btn-default btn-outline" data-id=' + row.id + ' style="margin-left:5px" href="javascript:void(0)" title="查看">',
            '<i class="fa fa-users"></i> 分配角色',
            '</a>',
            '<a class="status btn btn-xs '+b+' btn-outline" data-id=' + row.id + ' data-name=' + row.name + ' data-status="'+a+'" style="margin-left:5px" href="javascript:void(0)" title="删除">'+a+'</a>',
            '<a class="delete btn btn-xs btn-default btn-outline" data-id=' + row.id + ' data-name=' + row.name + ' style="margin-left:5px" href="javascript:void(0)" title="删除">',
            '<i class="glyphicon glyphicon-trash"></i>',
            '</a>',
        ].join('');
    }

    function queryParams(params) {
        // console.log(params);
        params.page = parseInt(params.offset / params.limit) + 1;
        params.rows = params.limit;
        params.keyword = params.search;
        delete(params.offset);
        //console.log(params);
        return params;
    }
});
