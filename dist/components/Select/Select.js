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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import classNames from "classnames";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Icon } from '../Icon/Icon';
import Input from "../Input";
import { InputTag } from "../InputTag/InpuTag";
import useOnClickOutside from "../../hooks/useOnclickOutside";
var SelectContext = createContext({
    setInputValue: function () { }, setShow: function () { }, inputValue: '',
    setAddOption: function () { }, mode: false,
    setUpdata: function () { },
});
var options = ['Beijing', 'Shanghai', 'Guangzhou', 'ShenZhen'];
/**
 * 选择器
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from "@light3711/lightui"
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, mode = props.mode, className = props.className, children = props.children, style = props.style, rest = __rest(props, ["defaultValue", "mode", "className", "children", "style"]);
    var _children = children ? children : [];
    var option = props.option ? props.option : options;
    var _a = __read(useState(false), 2), showDropdown = _a[0], setShowDropdown = _a[1];
    var _b = __read(useState(''), 2), inputValue = _b[0], setInputValue = _b[1];
    var _c = __read(useState([]), 2), addOption = _c[0], setAddOption = _c[1];
    var _d = __read(useState({}), 2), update = _d[0], setUpdata = _d[1];
    var _e = __read(useState([]), 2), child = _e[0], setChild = _e[1];
    var _f = __read(useState(0), 2), heightLight = _f[0], setHeightLight = _f[1];
    var selectRef = useRef(null);
    useEffect(function () {
        mode && option && setAddOption(option);
    }, [option]);
    var showDropdownHandler = function () {
        if (mode) {
            if (!showDropdown) {
                setShowDropdown(!showDropdown);
            }
            else
                return;
        }
        else {
            setShowDropdown(!showDropdown);
        }
    };
    var clickOutsideHandler = function () { return setShowDropdown(false); };
    var cx = classNames('lig-select', className, {});
    var listcx = classNames('select-list', {
        'show': showDropdown,
        'noChildren': _children.length === 0,
    });
    var onKeyDowm = function (e) {
        setShowDropdown(true);
        for (var i = 0; i < _children.length; i++) {
            if (_children[i].key === e.target.value) {
                return;
            }
        }
        if (('className' in props && props.className.includes('lig-autoComplete')) && child &&
            child.length && (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13)) {
            if (e.keyCode === 38 && heightLight > 0) {
                setHeightLight(heightLight - 1);
            }
            if (e.keyCode === 40 && heightLight < child.length - 1) {
                setHeightLight(heightLight + 1);
            }
            if (e.keyCode === 13 && e.target.value !== '' && e.target.value !== undefined) {
                setInputValue(child[heightLight]);
                setShowDropdown(false);
                setHeightLight(-1);
            }
        }
        if (props.allowCreate && e.keyCode === 13 && e.target.value !== '' && e.target.value !== undefined) {
            _children.push(React.createElement(Option, { key: e.target.value }, e.target.value));
            setInputValue('');
            setUpdata({});
        }
        props.onKeyDown && props.onKeyDown(e);
    };
    useEffect(function () {
        child && (heightLight !== -1) && setInputValue(child[heightLight]);
    }, [heightLight]);
    function setInputValues(value) {
        setInputValue(value);
        props.onChange && props.onChange(value);
    }
    function onClear() {
        setInputValue('');
        setAddOption([]);
        props.onClear && props.onClear([]);
        setShowDropdown(true);
    }
    function onClose(e) {
        setAddOption(addOption.filter(function (v) { return v !== e; }));
        props.onClose && props.onClose(e);
    }
    function onChange(value) {
        setInputValue(value);
        props.onChange && props.onChange(value);
    }
    useEffect(function () {
        props.children && setChild(props.children.map(function (item) { return item.props.children; }));
    }, [props.children]);
    useEffect(function () {
        setInputValue(props.value);
    }, [props.value]);
    useOnClickOutside(selectRef, clickOutsideHandler);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: cx, ref: selectRef, style: __assign({ cursor: 'pointer' }, style) },
            React.createElement("div", { className: "select-wrapper" },
                React.createElement("div", { onClick: showDropdownHandler }, !mode ?
                    React.createElement(Input, { value: inputValue, checked: showDropdown, pointerEventFocus: 'allowCreate' in props || 'allowChange' in props ? false : true, placeholder: props.placeholder ? props.placeholder : 'Please Select', suffix: props.suffix ? props.suffix : React.createElement(Icon, { color: "#d4d4d4", icon: 'angle-down' }), style: { fontSize: '1rem' }, className: 'select-input', allowClear: props.allowClear, onClear: onClear, onKeyDown: onKeyDowm, onChange: function (value) { return onChange(value); } })
                    :
                        React.createElement(InputTag, __assign({ value: addOption, checked: showDropdown, placeholder: props.placeholder ? (props.mode && addOption.length > 0 ? '' : props.placeholder) : '', onClear: onClear, onClose: function (e) { onClose(e); }, onKeyDowm: onKeyDowm }, rest))),
                React.createElement("div", { className: listcx, style: props === null || props === void 0 ? void 0 : props.listStyle },
                    React.createElement(SelectContext.Provider, { value: {
                            setInputValue: setInputValues,
                            inputValue: inputValue,
                            setShow: setShowDropdown,
                            setAddOption: setAddOption,
                            mode: props.mode,
                            setUpdata: setUpdata
                        } }, _children && _children))))));
};
export var Option = function (props) {
    var _a = useContext(SelectContext), setInputValue = _a.setInputValue, setAddOption = _a.setAddOption, setShow = _a.setShow, inputValue = _a.inputValue, mode = _a.mode, setUpdata = _a.setUpdata;
    var children = props.children, disabled = props.disabled, className = props.className;
    var _b = __read(useState(false), 2), hoverColor = _b[0], setHoverColor = _b[1];
    var optioncx = classNames('select-option', {
        'disabled': disabled,
        'hoverColor': hoverColor
    }, className);
    var labelClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            mode ? setShow(true) : setShow(false);
            setAddOption(function (state) {
                if (state.indexOf(children) !== -1) {
                    return state;
                }
                else {
                    if (state) {
                        state.push(children);
                    }
                    return state;
                }
            });
            mode ? setInputValue('') : setInputValue(children);
        }
        props.onClick && props.onClick(e);
        setUpdata({});
    };
    useEffect(function () {
        if (inputValue === children) {
            setHoverColor(true);
        }
        else {
            setHoverColor(false);
        }
    }, [inputValue]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", __assign({ className: "".concat(optioncx) }, props, { onMouseDown: function (e) {
                e.stopPropagation();
                e.preventDefault();
                labelClick(e);
            }, onMouseEnter: function (e) {
                !disabled ? setHoverColor(true) : setHoverColor(false);
                props.onMouseEnter && props.onMouseEnter(e);
            }, onMouseLeave: function (e) {
                inputValue !== children && setHoverColor(false);
                props.onMouseLeave && props.onMouseLeave(e);
            } }), children)));
};
