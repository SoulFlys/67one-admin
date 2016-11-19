'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    /**
    * login action
    * @return {Promise} []
    */
    _class.prototype.indexAction = function indexAction() {
        return this.display();
    };

    _class.prototype.loginAction = function loginAction() {
        if (this.isPost()) {
            var values = this.post();
            //验证用户名是否存在
            //验证密码是否正确
            //正确将用户id存到sesstion中并跳转到首页
            //错误的话禁止登陆并告诉用户
        }
    };

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=login.js.map