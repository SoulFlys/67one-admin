'use strict';

export default class extends think.controller.base {
    /**
   * some base method in here
   */
    async __before() {
        // let id = await this.session("userid");
        // if (think.isEmpty(id)) {
        //     return this.redirect("/admin/login/index");
        // }
        // this.assign("id", id);
    }



    assginAjaxList(data){
        return {
            rows: data,
            total: data.length
        }
    }
}
