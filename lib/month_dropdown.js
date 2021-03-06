'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _month_dropdown_options = require('./month_dropdown_options');

var _month_dropdown_options2 = _interopRequireDefault(_month_dropdown_options);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrappedMonthDropdownOptions = (0, _reactOnclickoutside2.default)(_month_dropdown_options2.default);

var MonthDropdown = function (_React$Component) {
  _inherits(MonthDropdown, _React$Component);

  function MonthDropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MonthDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MonthDropdown.__proto__ || Object.getPrototypeOf(MonthDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (M, i) {
        return _react2.default.createElement(
          'option',
          { key: i, value: i },
          M
        );
      });
    }, _this.renderSelectMode = function (monthNames) {
      return _react2.default.createElement(
        'select',
        { value: _this.props.month, className: 'react-datepicker__month-select', onChange: function onChange(e) {
            return _this.onChange(e.target.value);
          } },
        _this.renderSelectOptions(monthNames)
      );
    }, _this.renderReadView = function (visible, monthNames) {
      return _react2.default.createElement(
        'div',
        { key: 'read', style: { visibility: visible ? 'visible' : 'hidden' }, className: 'react-datepicker__month-read-view', onClick: _this.toggleDropdown },
        _react2.default.createElement(
          'span',
          { className: 'react-datepicker__month-read-view--selected-month' },
          monthNames[_this.props.month]
        ),
        _react2.default.createElement('span', { className: 'react-datepicker__month-read-view--down-arrow' })
      );
    }, _this.renderDropdown = function (monthNames) {
      return _react2.default.createElement(WrappedMonthDropdownOptions, {
        key: 'dropdown',
        ref: 'options',
        month: _this.props.month,
        monthNames: monthNames,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown });
    }, _this.renderScrollMode = function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }
      return result;
    }, _this.onChange = function (month) {
      _this.toggleDropdown();
      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    }, _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MonthDropdown, [{
    key: 'render',
    value: function render() {
      var localeData = _moment2.default.localeData(this.props.locale);
      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (M) {
        return localeData.months((0, _moment2.default)({ M: M }));
      });

      var renderedDropdown = void 0;
      switch (this.props.dropdownMode) {
        case 'scroll':
          renderedDropdown = this.renderScrollMode(monthNames);
          break;
        case 'select':
          renderedDropdown = this.renderSelectMode(monthNames);
          break;
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--' + this.props.dropdownMode },
        renderedDropdown
      );
    }
  }]);

  return MonthDropdown;
}(_react2.default.Component);

MonthDropdown.propTypes = {
  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
  locale: _propTypes2.default.string,
  month: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = MonthDropdown;
