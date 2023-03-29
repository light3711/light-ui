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
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Icon from '../Icon';
import Pagination from '../Pagination';
import { useGetPageData } from '../../hooks/useGetPageData';
var data = new Array(10).fill(null).map(function (item, index) { return ({
    key: "".concat(index + 1),
    title: "title".concat(index + 1)
}); });
/**
 * 两栏布局的多选组件，将元素从一栏即时移到另一栏
 * ### 引用方法
 *
 * ~~~js
 * import { Transfer } from "@light3711/lightui"
 * ~~~
 */
export var Transfer = function (props, ref) {
    var className = props.className, targetBtn = props.targetBtn, sourceBtn = props.sourceBtn, targetTitle = props.targetTitle, sourceTitle = props.sourceTitle;
    var leftRef = useRef(null);
    var rightRef = useRef(null);
    var _a = __read(useState(data), 2), sourceArr = _a[0], setSourceArr = _a[1];
    var _b = __read(useState([]), 2), targeArr = _b[0], setTargeArr = _b[1];
    var _c = __read(useState(false), 2), leftAllval = _c[0], setLeftAllval = _c[1];
    var _d = __read(useState(false), 2), rightAllval = _d[0], setRightAllval = _d[1];
    var _e = __read(useState([]), 2), sourceSelectKeys = _e[0], setsourceSelectKeys = _e[1];
    var _f = __read(useState([]), 2), targetSelectKeys = _f[0], settargetSelectKeys = _f[1];
    var _dataSource = props.dataSource ? props.dataSource : data;
    var pageSize = props.pageSize ? props.pageSize : 2;
    useEffect(function () {
        props.dataSource && setSourceArr(props.dataSource);
    }, [props.dataSource]);
    var cx = classNames('lig-transfer', {}, className);
    var checkboxAllChange = function (e, type) {
        switch (type) {
            case 'source':
                if (e) {
                    setLeftAllval(true);
                    setsourceSelectKeys(__spreadArray([], __read(sourceArr.map(function (item) { return item.key; })), false));
                }
                else {
                    setLeftAllval(false);
                    setsourceSelectKeys([]);
                }
                break;
            case 'target':
                if (e) {
                    setRightAllval(true);
                    settargetSelectKeys(__spreadArray([], __read(targeArr.map(function (item) { return item.key; })), false));
                }
                else {
                    setRightAllval(false);
                    settargetSelectKeys([]);
                }
        }
    };
    var handleCheckboxChange = function (e, key, type) {
        var sourceKeys = sourceSelectKeys;
        var targetKeys = targetSelectKeys;
        if (type === 'source') {
            if (e) {
                sourceKeys = __spreadArray(__spreadArray([], __read(sourceKeys), false), [key], false);
            }
            else {
                sourceKeys = sourceKeys.filter(function (item) { return item !== key; });
            }
        }
        if (type === 'target') {
            if (e) {
                targetKeys = __spreadArray(__spreadArray([], __read(targetKeys), false), [key], false);
            }
            else {
                targetKeys = targetKeys.filter(function (item) { return item !== key; });
            }
        }
        setsourceSelectKeys(sourceKeys);
        settargetSelectKeys(targetKeys);
    };
    var angelLeftBtn = function () {
        var sourceResult = [];
        sourceResult = targeArr && targeArr.filter(function (item) { return !targetSelectKeys.includes(item.key); });
        setSourceArr(__spreadArray(__spreadArray([], __read(sourceArr), false), __read(_dataSource.filter(function (item) { return targetSelectKeys.includes(item.key); })), false));
        setTargeArr(sourceResult);
        setRightAllval(false);
        settargetSelectKeys([]);
    };
    var angelRightBtn = function () {
        var targetArrResult = [];
        targetArrResult = __spreadArray(__spreadArray([], __read(targeArr), false), __read(_dataSource.filter(function (item) { return sourceSelectKeys.includes(item.key); })), false);
        setTargeArr(__spreadArray([], __read(targetArrResult), false));
        setSourceArr(sourceArr.filter(function (item) { return !sourceSelectKeys.includes(item.key); }));
        setLeftAllval(false);
        setsourceSelectKeys([]);
    };
    var targetBtnColor = targetSelectKeys.length > 0 ? { backgroundColor: '#0d6efd', color: 'white', border: 'solid 1px #21252900 ' }
        : { backgroundColor: 'white', color: '#adb5bd', border: 'solid 1px #adb5bd' };
    var sourceBtnColor = sourceSelectKeys.length > 0 ? { backgroundColor: '#0d6efd', color: 'white', border: 'solid 1px #21252900  ' }
        : { backgroundColor: 'white', color: '#adb5bd', border: 'solid 1px #adb5bd' };
    var _g = useGetPageData(pageSize, sourceArr), sourceResult = _g.sourceResult, sourcePage = _g.page, setSourcePage = _g.setPage, newSourceArray = _g.newArray;
    var _h = useGetPageData(pageSize, targeArr), targetResult = _h.sourceResult, targetPage = _h.page, setTargetPage = _h.setPage, newTargetArray = _h.newArray;
    var cloneBtn = function (element, fun, style) {
        return React.cloneElement(element, {
            style: style,
            onClick: fun
        });
    };
    return (React.createElement(React.Fragment, null, !props.pagaintion ?
        React.createElement("div", { className: cx },
            React.createElement("div", { className: 't-content-wrapper' },
                React.createElement("div", { className: 't-content-header-wrapper' },
                    React.createElement("div", { className: 't-content-header-control' },
                        React.createElement(Checkbox, { checked: leftAllval, onChange: function (value, e) { return checkboxAllChange(value, 'source'); }, children: sourceTitle ? sourceTitle : 'source' }),
                        React.createElement("div", { className: 't-content-title' }, "".concat(sourceSelectKeys.length, " / ").concat(sourceArr.length)))),
                React.createElement("div", { className: 't-content', ref: leftRef }, sourceArr.length ? (sourceArr.map(function (source) {
                    return (React.createElement("div", { className: 't-content-item', key: source.key },
                        React.createElement(Checkbox, { value: source.title, checked: sourceSelectKeys.includes(source.key), onChange: function (value, e) {
                                handleCheckboxChange(value, source.key, 'source');
                            } }, source.title)));
                }))
                    :
                        (React.createElement("div", { className: 'noData' }, "\u6682\u65E0\u6570\u636E")))),
            React.createElement("div", { className: 't-control' },
                sourceBtn ? cloneBtn(sourceBtn, angelRightBtn, sourceBtnColor) : React.createElement(Button, { style: sourceBtnColor, size: 'sm', onClick: angelRightBtn },
                    React.createElement(Icon, { icon: 'angle-double-right' })),
                targetBtn ? cloneBtn(targetBtn, angelLeftBtn, targetBtnColor) : React.createElement(Button, { style: targetBtnColor, size: 'sm', onClick: angelLeftBtn },
                    React.createElement(Icon, { icon: 'angle-double-left' }))),
            React.createElement("div", { className: 't-content-wrapper' },
                React.createElement("div", { className: 't-content-header-wrapper' },
                    React.createElement("div", { className: 't-content-header-control' },
                        React.createElement(Checkbox, { checked: rightAllval, onChange: function (value, e) { return checkboxAllChange(value, 'target'); }, children: targetTitle ? targetTitle : 'target' }),
                        React.createElement("div", { className: 't-content-title' }, "".concat(targetSelectKeys.length, " / ").concat(targeArr.length)))),
                React.createElement("div", { className: 't-content', ref: rightRef }, targeArr.length ? (targeArr.map(function (target) {
                    return (React.createElement("div", { className: 't-content-item', key: target.key },
                        React.createElement(Checkbox, { value: target.title, checked: targetSelectKeys.includes(target.key), onChange: function (value, e) {
                                handleCheckboxChange(value, target.key, 'target');
                            } }, target.title)));
                }))
                    :
                        (React.createElement("div", { className: 'noData' }, "\u6682\u65E0\u6570\u636E")))))
        :
            React.createElement("div", { className: cx },
                React.createElement("div", { className: 't-content-wrapper' },
                    React.createElement("div", { className: 't-content-header-wrapper' },
                        React.createElement("div", { className: 't-content-header-control' },
                            React.createElement(Checkbox, { checked: leftAllval, onChange: function (value, e) { return checkboxAllChange(value, 'source'); }, children: sourceTitle ? sourceTitle : 'source' }),
                            React.createElement("div", { className: 't-content-title' }, "".concat(sourceSelectKeys.length, " / ").concat(sourceArr.length)))),
                    React.createElement("div", { className: 't-content' }, (sourceResult === null || sourceResult === void 0 ? void 0 : sourceResult.length) ? (sourceResult.map(function (source) {
                        return (React.createElement("div", { className: 't-content-item', key: source.key },
                            React.createElement(Checkbox, { value: source.title, checked: sourceSelectKeys.includes(source.key), onChange: function (value, e) {
                                    handleCheckboxChange(value, source.key, 'source');
                                } }, source.title)));
                    }))
                        :
                            (React.createElement("div", { className: 'noData' }, "\u6682\u65E0\u6570\u636E"))),
                    React.createElement(Pagination, { mini: true, total: sourceArr.length, currentPage: sourcePage, className: 'transfer-pagination', pageSize: pageSize, prevCLick: function (v) {
                            setSourcePage(v);
                        }, nextCLick: function (v) {
                            setSourcePage(v);
                        } })),
                React.createElement("div", { className: 't-control' },
                    sourceBtn ? cloneBtn(sourceBtn, angelRightBtn, sourceBtnColor) : React.createElement(Button, { style: sourceBtnColor, size: 'sm', onClick: angelRightBtn },
                        React.createElement(Icon, { icon: 'angle-double-right' })),
                    targetBtn ? cloneBtn(targetBtn, angelLeftBtn, targetBtnColor) : React.createElement(Button, { style: targetBtnColor, size: 'sm', onClick: angelLeftBtn },
                        React.createElement(Icon, { icon: 'angle-double-left' }))),
                React.createElement("div", { className: 't-content-wrapper' },
                    React.createElement("div", { className: 't-content-header-wrapper' },
                        React.createElement("div", { className: 't-content-header-control' },
                            React.createElement(Checkbox, { checked: rightAllval, onChange: function (value, e) { return checkboxAllChange(value, 'target'); }, children: targetTitle ? targetTitle : 'target' }),
                            React.createElement("div", { className: 't-content-title' }, "".concat(targetSelectKeys.length, " / ").concat(targeArr.length)))),
                    React.createElement("div", { className: 't-content', ref: rightRef }, (targetResult === null || targetResult === void 0 ? void 0 : targetResult.length) ? (targetResult === null || targetResult === void 0 ? void 0 : targetResult.map(function (target) {
                        return (React.createElement("div", { className: 't-content-item', key: target.key },
                            React.createElement(Checkbox, { value: target.title, checked: targetSelectKeys.includes(target.key), onChange: function (value, e) {
                                    handleCheckboxChange(value, target.key, 'target');
                                } }, target.title)));
                    }))
                        :
                            (React.createElement("div", { className: 'noData' }, "\u6682\u65E0\u6570\u636E"))),
                    React.createElement(Pagination, { mini: true, total: targeArr.length, currentPage: targetPage, className: 'transfer-pagination', pageSize: pageSize, prevCLick: function (v) {
                            setTargetPage(v);
                        }, nextCLick: function (v) {
                            setTargetPage(v);
                        } })))));
};
