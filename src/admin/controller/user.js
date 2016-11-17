'use strict';
import Base from './base.js';
export default class extends Base {
    /**
   * user action
   * @return {Promise} []
   */
    indexAction() {
        return this.display();
    }

    viewAction() {
        let data = {
            rows: [
                {
                    id: 1,
                    username: 'xxx'
                },
                {
                    id: 2,
                    username: 'aaa'
                },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // },
                // {
                //     id: 2,
                //     username: 'aaa'
                // }
            ],
            total: 2
        }
        this.success(data);
    }

}
