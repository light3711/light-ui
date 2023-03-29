var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import classNames from 'classnames';
import React, { useEffect, useState, forwardRef } from 'react';
import Icon from '../Icon';
import Input from '../Input';
import Select from '../Select';
import { Option } from '../Select/Select';
/**
 * 采用分页控制单页内的信息数量，也可进行页面跳转
 * ### 引用方法
 *
 * ~~~js
 * import { Pagination } from "@light3711/lightui"
 * ~~~
 */
export var Pagination = forwardRef(function (props, ref) {
    var _a = props.total, total = _a === void 0 ? 50 : _a, pageSize = props.pageSize, _b = props.count, count = _b === void 0 ? 2 : _b, currentPage = props.currentPage, onClick = props.onClick, pageSelectOption = props.pageSelectOption;
    var createPage = function (t, cur, aroud) {
        //出现省略号条件 total > baseCount - 2  展示内容 - prev next
        /**
         * @cur 展示页
         */
        var result = [];
        var baseCount = aroud * 2 + 1 + 2 + 2 + 2; //   < 1 ... aroud 1 aroud ... 100 >
        var surplus = baseCount - 4;
        var startPosition = 1 + 2 + aroud + 1; // 首页 + 省略号最小值2 +cur左边
        var endPostion = t - 2 - aroud - 1;
        if (t <= baseCount - 2) {
            result = Array.from({ length: t }, function (v, i) { return i + 1; });
        }
        else {
            if (cur < startPosition) {
                result = __spreadArray(__spreadArray([], __read(Array.from({ length: surplus }, function (v, i) { return i + 1; })), false), ["...", t], false);
            }
            else if (cur > endPostion) {
                result = __spreadArray([1, '...'], __read(Array.from({ length: surplus }, function (v, i) { return t - surplus + i + 1; })), false);
            }
            else {
                result = __spreadArray(__spreadArray([1, '...'], __read(Array.from({ length: aroud * 2 + 1 }, function (v, i) { return cur - aroud + i; })), false), ['...', t], false);
            }
        }
        return result;
    };
    var _c = __read(useState(currentPage ? currentPage : 1), 2), current = _c[0], setCurrent = _c[1];
    var _d = __read(useState(NaN), 2), shortTimevalue = _d[0], setShortTimevalue = _d[1];
    var _e = __read(useState(0), 2), newPageSize = _e[0], setNewPageSize = _e[1];
    var newTotal = 'pageSize' in props ? (newPageSize !== 0 && (total / newPageSize)) : total;
    useEffect(function () {
        setNewPageSize(pageSize);
    }, [pageSize]);
    var cx = classNames('lig-pagination', {}, props.className);
    var minicx = classNames('lig-pagination', 'mini-pagination', {}, props.className);
    var handleClick = function (value, more) {
        if (value === '...' && more < createPage(newTotal, current, count).length / 2) {
            setCurrent(function (state) { return state - 5; });
        }
        else if (value === '...' && more > createPage(newTotal, current, count).length / 2) {
            setCurrent(function (state) { return state + 5; });
        }
        else {
            setCurrent(value);
        }
        onClick && onClick(value);
    };
    var controlClick = function (value) {
        if (props.className && props.className.includes('transfer-pagination')) {
            if (value === 'prev') {
                if (current === 1) {
                    return;
                }
                else {
                    setCurrent(function (state) {
                        props.prevCLick && props.prevCLick(state - 1);
                        return state - 1;
                    });
                }
            }
            if (value === 'next') {
                if (current >= newTotal) {
                    return;
                }
                else {
                    setCurrent(function (state) {
                        props.nextCLick && props.nextCLick(state + 1);
                        return state + 1;
                    });
                }
            }
        }
        else {
            if (value === 'prev') {
                if (current <= 1) {
                    return;
                }
                else {
                    setCurrent(function (state) { return state - 1; });
                }
            }
            if (value === 'next') {
                if (current >= newTotal) {
                    return;
                }
                else {
                    setCurrent(function (state) { return state + 1; });
                }
            }
        }
    };
    var jumpChange = function (value, card) {
        var _total = Math.ceil(pageSize ? total / pageSize : total);
        if (card === 'input') {
            if (Number(value.target.value) > newTotal) {
                setCurrent(newTotal);
            }
            else if (value.keyCode === 13) {
                setCurrent(Number(value.target.value));
            }
        }
        if (card === 'miniInput') {
            if (Number(value) > _total) {
                setCurrent(_total);
            }
            else {
                setCurrent(value);
            }
        }
        if (card === 'select') {
            if (value > newTotal) {
                setCurrent(newTotal);
            }
            else if (value <= 1) {
                setCurrent(1);
            }
            else {
                setCurrent(Number(value));
            }
        }
        if (card === 'pageSelect') {
            setNewPageSize(value);
        }
    };
    return (React.createElement(React.Fragment, null, !props.mini ? React.createElement("div", { className: cx, style: __assign({}, props.style) },
        React.createElement("ul", { className: 'pa-inner' },
            React.createElement("div", { className: "pa-control ".concat(current <= 1 ? 'nomore' : ''), onClick: function () { return controlClick('prev'); } },
                React.createElement(Icon, { icon: 'angle-double-left' })),
            createPage(newTotal, current, count).map(function (item, index) {
                return (React.createElement("li", { key: index, onClick: function () { return handleClick(item, index); }, className: "pa-option ".concat(current === item ? 'active' : '') }, item));
            }),
            React.createElement("div", { className: "pa-control ".concat(current >= newTotal ? 'nomore' : ''), onClick: function () { return controlClick('next'); } },
                React.createElement(Icon, { icon: 'angle-double-right' })),
            props.selectJumperOption && React.createElement(Select, { className: 'pa-select', onChange: function (e) { return jumpChange(e, 'select'); }, defaultValue: '1' }, props.selectJumperOption && props.selectJumperOption.map(function (item) {
                return React.createElement(Option, { key: item }, item);
            })),
            pageSelectOption && React.createElement(Select, { className: 'pa-select', value: "".concat(newPageSize, "\u6761/\u9875"), onChange: function (e) { return jumpChange(e, 'pageSelect'); }, defaultValue: '1' }, props.pageSelectOption && props.pageSelectOption.map(function (item) {
                return React.createElement(Option, { key: item }, item);
            })),
            props.inputJumper && React.createElement(React.Fragment, null,
                React.createElement("p", { className: 'jumper' }, "\u524D\u5F80"),
                " ",
                React.createElement(Input, { className: 'pa-input', onKeyDown: function (e) { return jumpChange(e, 'input'); } }))))
        :
            React.createElement("div", { className: minicx },
                React.createElement("div", { className: "pa-control ".concat(current <= 1 ? 'nomore' : '', " mini"), onClick: function () { return controlClick('prev'); } },
                    React.createElement(Icon, { icon: 'angle-left' })),
                React.createElement(Input, { value: shortTimevalue ? shortTimevalue : current, className: 'p-mini-input', onChange: function (value) {
                        setShortTimevalue(value);
                    }, onBlur: function (value) {
                        jumpChange(value, 'miniInput');
                        setShortTimevalue(NaN);
                    } }),
                React.createElement("div", null, "/"),
                React.createElement("div", { className: 'p-mini-input' }, Math.ceil(newTotal)),
                React.createElement("div", { className: "pa-control ".concat(current >= newTotal ? 'nomore' : '', " mini"), onClick: function () { return controlClick('next'); } },
                    React.createElement(Icon, { icon: 'angle-right' })))));
});
