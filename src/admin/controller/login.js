'use strict';
export default class extends think.controller.base {
    /**
   * login action
   * @return {Promise} []
   */
    indexAction() {
        return this.display();
    }

    loginAction(){
        if(this.isPost()){
            let values = this.post();
            //验证用户名是否存在
            //验证密码是否正确
            //正确将用户id存到sesstion中并跳转到首页
            //错误的话禁止登陆并告诉用户
        }
    }

}
