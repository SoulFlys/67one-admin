'use strict';

import Base from './base.js';

export default class extends Base {
    /**
   * index action
   * @return {Promise} []
   */
    indexAction() {
        //auto render template file index/index.html
        return this.display();
    }

    homeAction() {
        //auto render template file index/home.html
        return this.display();
    }
}
