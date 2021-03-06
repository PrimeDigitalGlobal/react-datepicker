'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _year_dropdown = require('./year_dropdown');

var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

var _month_dropdown = require('./month_dropdown');

var _month_dropdown2 = _interopRequireDefault(_month_dropdown);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DROPDOWN_FOCUS_CLASSNAMES = ['react-datepicker__year-select', 'react-datepicker__month-select'];

var isDropdownSelect = function isDropdownSelect() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classNames = (element.className || '').split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  _createClass(Calendar, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        onDropdownFocus: function onDropdownFocus() {},
        utcOffset: _moment2.default.utc().utcOffset(),
        monthsShown: 1,
        forceShowMonthNavigation: false
      };
    }
  }]);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.handleClickOutside = function (event) {
      _this.props.onClickOutside(event);
    };

    _this.handleDropdownFocus = function (event) {
      if (isDropdownSelect(event.target)) {
        _this.props.onDropdownFocus();
      }
    };

    _this.getDateInView = function () {
      var _this$props = _this.props,
          preSelection = _this$props.preSelection,
          selected = _this$props.selected,
          openToDate = _this$props.openToDate,
          utcOffset = _this$props.utcOffset;

      var minDate = (0, _date_utils.getEffectiveMinDate)(_this.props);
      var maxDate = (0, _date_utils.getEffectiveMaxDate)(_this.props);
      var current = _moment2.default.utc().utcOffset(utcOffset);
      var initialDate = preSelection || selected;
      if (initialDate) {
        return initialDate;
      } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
        return openToDate;
      } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
        return openToDate;
      } else if (minDate && minDate.isAfter(current)) {
        return minDate;
      } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
        return openToDate;
      } else if (maxDate && maxDate.isBefore(current)) {
        return maxDate;
      } else if (openToDate) {
        return openToDate;
      } else {
        return current;
      }
    };

    _this.localizeMoment = function (date) {
      return date.clone().locale(_this.props.locale || _moment2.default.locale());
    };

    _this.increaseMonth = function () {
      _this.setState({
        date: _this.state.date.clone().add(1, 'month')
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.decreaseMonth = function () {
      _this.setState({
        date: _this.state.date.clone().subtract(1, 'month')
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.handleDayClick = function (day, event) {
      return _this.props.onSelect(day, event);
    };

    _this.handleDayMouseEnter = function (day) {
      return _this.setState({ selectingDate: day });
    };

    _this.handleMonthMouseLeave = function () {
      return _this.setState({ selectingDate: null });
    };

    _this.handleMonthChange = function (date) {
      if (_this.props.onMonthChange) {
        _this.props.onMonthChange(date);
      }
    };

    _this.changeYear = function (year) {
      _this.setState({
        date: _this.state.date.clone().set('year', year)
      });
    };

    _this.changeMonth = function (month) {
      _this.setState({
        date: _this.state.date.clone().set('month', month)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.header = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var startOfWeek = date.clone().startOf('week');
      var dayNames = [];
      if (_this.props.showWeekNumbers) {
        dayNames.push(_react2.default.createElement(
          'div',
          { key: 'W', className: 'react-datepicker__day-name' },
          '#'
        ));
      }
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = startOfWeek.clone().add(offset, 'days');
        return _react2.default.createElement(
          'div',
          { key: offset, className: 'react-datepicker__day-name' },
          day.localeData().weekdaysMin(day)
        );
      }));
    };

    _this.renderPreviousMonthButton = function () {
      if (!_this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledBefore)(_this.state.date, 'month', _this.props)) {
        return;
      }
      return _react2.default.createElement('a', {
        className: 'react-datepicker__navigation react-datepicker__navigation--previous',
        onClick: _this.decreaseMonth });
    };

    _this.renderNextMonthButton = function () {
      if (!_this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledAfter)(_this.state.date, 'month', _this.props)) {
        return;
      }
      return _react2.default.createElement('a', {
        className: 'react-datepicker__navigation react-datepicker__navigation--next',
        onClick: _this.increaseMonth });
    };

    _this.renderCurrentMonth = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var classes = ['react-datepicker__current-month'];

      if (_this.props.showYearDropdown) {
        classes.push('react-datepicker__current-month--hasYearDropdown');
      }
      if (_this.props.showMonthDropdown) {
        classes.push('react-datepicker__current-month--hasMonthDropdown');
      }
      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        date.format(_this.props.dateFormat)
      );
    };

    _this.renderYearDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return _react2.default.createElement(_year_dropdown2.default, {
        dropdownMode: _this.props.dropdownMode,
        onChange: _this.changeYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        year: _this.state.date.year(),
        scrollableYearDropdown: _this.props.scrollableYearDropdown });
    };

    _this.renderMonthDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthDropdown) {
        return;
      }
      return _react2.default.createElement(_month_dropdown2.default, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        onChange: _this.changeMonth,
        month: _this.state.date.month() });
    };

    _this.renderTodayButton = function () {
      if (!_this.props.todayButton) {
        return;
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'react-datepicker__today-button',
          onClick: function onClick(e) {
            return _this.props.onSelect(_moment2.default.utc().utcOffset(_this.props.utcOffset).startOf('date'), e);
          } },
        _this.props.todayButton
      );
    };

    _this.renderMonths = function () {
      var monthList = [];
      for (var i = 0; i < _this.props.monthsShown; ++i) {
        var monthDate = _this.state.date.clone().add(i, 'M');
        var monthKey = 'month-' + i;
        monthList.push(_react2.default.createElement(
          'div',
          { key: monthKey, className: 'react-datepicker__month-container' },
          _react2.default.createElement(
            'div',
            { className: 'react-datepicker__header' },
            _this.renderCurrentMonth(monthDate),
            _react2.default.createElement(
              'div',
              {
                className: 'react-datepicker__header__dropdown react-datepicker__header__dropdown--' + _this.props.dropdownMode,
                onFocus: _this.handleDropdownFocus },
              _this.renderMonthDropdown(i !== 0),
              _this.renderYearDropdown(i !== 0)
            ),
            _react2.default.createElement(
              'div',
              { className: 'react-datepicker__day-names' },
              _this.header(monthDate)
            )
          ),
          _react2.default.createElement(_month2.default, {
            day: monthDate,
            dayClassName: _this.props.dayClassName,
            onDayClick: _this.handleDayClick,
            onDayMouseEnter: _this.handleDayMouseEnter,
            onMouseLeave: _this.handleMonthMouseLeave,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            excludeDates: _this.props.excludeDates,
            highlightDates: _this.props.highlightDates,
            selectingDate: _this.state.selectingDate,
            includeDates: _this.props.includeDates,
            inline: _this.props.inline,
            fixedHeight: _this.props.fixedHeight,
            filterDate: _this.props.filterDate,
            preSelection: _this.props.preSelection,
            selected: _this.props.selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            showWeekNumbers: _this.props.showWeekNumbers,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            peekNextMonth: _this.props.peekNextMonth,
            utcOffset: _this.props.utcOffset })
        ));
      }
      return monthList;
    };

    _this.state = {
      date: _this.localizeMoment(_this.getDateInView()),
      selectingDate: null
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.preSelection && !(0, _date_utils.isSameDay)(nextProps.preSelection, this.props.preSelection)) {
        this.setState({
          date: this.localizeMoment(nextProps.preSelection)
        });
      } else if (nextProps.openToDate && !(0, _date_utils.isSameDay)(nextProps.openToDate, this.props.openToDate)) {
        this.setState({
          date: this.localizeMoment(nextProps.openToDate)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('react-datepicker', this.props.className) },
        _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
        this.renderPreviousMonthButton(),
        this.renderNextMonthButton(),
        this.renderMonths(),
        this.renderTodayButton(),
        this.props.children
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  dateFormat: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
  dayClassName: _propTypes2.default.func,
  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
  endDate: _propTypes2.default.object,
  excludeDates: _propTypes2.default.array,
  filterDate: _propTypes2.default.func,
  fixedHeight: _propTypes2.default.bool,
  highlightDates: _propTypes2.default.array,
  includeDates: _propTypes2.default.array,
  inline: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  monthsShown: _propTypes2.default.number,
  onClickOutside: _propTypes2.default.func.isRequired,
  onMonthChange: _propTypes2.default.func,
  forceShowMonthNavigation: _propTypes2.default.bool,
  onDropdownFocus: _propTypes2.default.func,
  onSelect: _propTypes2.default.func.isRequired,
  openToDate: _propTypes2.default.object,
  peekNextMonth: _propTypes2.default.bool,
  scrollableYearDropdown: _propTypes2.default.bool,
  preSelection: _propTypes2.default.object,
  selected: _propTypes2.default.object,
  selectsEnd: _propTypes2.default.bool,
  selectsStart: _propTypes2.default.bool,
  showMonthDropdown: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  showYearDropdown: _propTypes2.default.bool,
  startDate: _propTypes2.default.object,
  todayButton: _propTypes2.default.string,
  utcOffset: _propTypes2.default.number
};
exports.default = Calendar;
