'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    /**
    * user action
    * @return {Promise} []
    */
    _class.prototype.indexAction = function indexAction() {
        return this.display();
    };

    _class.prototype.viewAction = function viewAction() {
        var data = {
            rows: [{
                id: 1,
                username: 'xxx'
            }, {
                id: 2,
                username: 'aaa'
            }],
            total: 2
        };
        this.success(data);
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map