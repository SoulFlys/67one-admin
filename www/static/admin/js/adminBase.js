define(['jquery','layer','bootstrap'],function($,layer){

    /**
     * 初始化变量和方法
     */
     var myinit = {
         initVar: function(){
             time_icon0 = {icon: 0,time: 2000};
             time_icon1 = {icon: 1,time: 2000};
             time_icon2 = {icon: 2,time: 2000};
             time_icon3 = {icon: 3,time: 2000};
             time_icon4 = {icon: 4,time: 2000};
             time_icon5 = {icon: 5,time: 2000};
             tips_icon1 = {
                 tips: [1, '#f60'],
                 time: 2000
             };
             validate_error = "<i class='fa fa-times-circle'></i> ";
         },
         initFunc: function(){
             //validate_init();
             //验证登录注册啊啥得
         }
     };

    /**
     * 对外抛出初始化方法
     */
    var init = function(callback){
        $(document).ready(function(){
            myinit.initVar();
            myinit.initFunc();
            callback();
        });
    };

    /**
     * 修改validate的默认提示样式
     */
    var validate_init = function(){
        $.validator.setDefaults({
            highlight: function (element) {
                $(element).parent().find('input').nextAll('.Validform_checktip').removeClass('Validform_right');
                $(element).parent().find('input').addClass('Validform_error');
            },
            success: function (element) {
                $(element).parent().find('input').nextAll('.Validform_checktip').addClass('Validform_right');
                $(element).parent().find('input').removeClass('Validform_error');
            },
            errorElement: "span",
            errorClass: "Validform_checktip Validform_wrong",
            validClass: "validClass",
            pendingClass: 'pending',
            errorPlacement : function(error, element) {
                error.appendTo(element.parent());
            },
            onfocusout: function(element){
                $(element).valid();
            }
        });

        $.validator.addMethod("isMobile", function(value, element) {
    		var length = value.length;
    		var mobile = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[6-8])\d{8}$/;
    		return this.optional(element) || (length == 11 && mobile.test(value));
    	}, "您输入的手机号码格式有误");

        $.validator.addMethod("isUsername", function(value, element) {
            var username = /^[a-zA-Z0-9]{6,16}$/;
            return this.optional(element) || username.test(value);
        }, "请输入6-16位字母或数字");

        $.validator.addMethod("isPassword", function(value, element) {
    		var password = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/;
    		return this.optional(element) || password.test(value);
    	}, "您输入的密码格式有误");

        $.validator.addMethod("isTel", function(value, element) {
            var length = value.length;
            var tel = /^(0\d{2,3}-\d{7,8})$/;
            return this.optional(element) || tel.test(value);
        }, "请输入正确的电话号码");
        ///^0\d{2,3}-?\d{7,8}$/
        /*
        验证电话号码
        验证规则：区号+号码，区号以0开头，3位或4位
        号码由7位或8位数字组成
        区号与号码之间可以无连接符，也可以“-”连接
        如01088888888,010-88888888,0955-7777777
        */

        $.validator.addMethod("isName", function(value, element) {
            var length = value.length;
            var name = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,6}$/;
            return this.optional(element) || name.test(value);
        }, "只能由2-6个中文组成");

        $.validator.addMethod("isEmail", function(value, element) {
            var length = value.length;
            var email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            return this.optional(element) || email.test(value);
        }, "请输入正确的邮箱地址");

        $.validator.addMethod("isCompany", function(value, element) {
            var length = value.length;
            var company = /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z0-9]+$/;
            return this.optional(element) || company.test(value);
        }, "只允许汉字、字母和数字");

        $.validator.addMethod("isCode", function(value, element) {
            var length = value.length;
            var code = /^([A-Z0-9]{15}|[A-Z0-9]{18})$/;
            return this.optional(element) || code.test(value);
        }, "15位或18位数字和大写字母组成");

    };


    /**
     * ajax方法
     */
    var _ajax = function(url,type,data,callback){
        var beforeFn = arguments[4]===undefined ? false : arguments[4];
        var completeFn = arguments[5]===undefined ? false : arguments[5];
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: 'json',
            success: function(result) {
                callback(result);
                return false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrow) {
                layer.alert('请求失败~请重试', time_icon0);
                return false;
            },
            //发送请求前
            beforeSend: function(XMLHttpRequest){
                if(beforeFn){
                    beforeFn(XMLHttpRequest);
                }
            },
            //请求完成后回调函数 (请求成功或失败之后均调用)。
            complete: function(XMLHttpRequest, textStatus){
                if(completeFn){
                    completeFn(XMLHttpRequest, textStatus);
                }
            }
        });
    };

    /**
     * 滚动到当前dom节点
     */
    var domScrollTop = function(obj,callback){
        $('html,body').animate({
            scrollTop:obj.offset().top-100
        },500,callback);
    };

    /**
     * 表单实例化之后的数据转换成对象
     * obj => $('form');
     */
    var _serializeToObj = function(obj){
        var jsonObj = {},
            data = obj.serialize(),
            param = data.split("&");
        for ( var i = 0; param !== null && i < param.length; i++) {
            var para = param[i].split("=");
            jsonObj[para[0]] = para[1];
        }
        return jsonObj;
    };



     var ceshi = function(a){
        console.log(a);
    };


    return {
        init    :    init,
        // _ajax   :    _ajax,
        // _serializeToObj:_serializeToObj,
        // validate_init: validate_init,
        // domScrollTop: domScrollTop,
        // _uploadMember:_uploadMember,
        //
        //
        // ceshi   :    ceshi,
    };

});
