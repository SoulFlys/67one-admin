'use strict';
import Base from './base.js';
export default class extends Base {
    /**
   * user action
   * @return {Promise} []
   */
    async indexAction() {
        // await this.session("userInfo", 123);
        // console.log(await this.session("userInfo"));
        return this.display();
    }

    async viewAction() {
        let model = this.model("admin");
        let data = await model.select();
        this.success(this.assginAjaxList(data));
    }

    async addAction(){
        return this.display();
    }

}
