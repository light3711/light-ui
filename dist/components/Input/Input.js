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
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon/Icon';
library.add(fas);
/**
 * 在原生控件基础上进行了功能扩展
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from "@light3711/lightui"
 * ~~~
 */
export var Input = function (props) {
    var _a, _b;
    var disabled = props.disabled, className = props.className, size = props.size, icon = props.icon, style = props.style, _c = props.type, type = _c === void 0 ? 'text' : _c, iconClick = props.iconClick, onProgress = props.onProgress, prefix = props.prefix, suffix = props.suffix, addBefore = props.addBefore, addAfter = props.addAfter, beforeStyle = props.beforeStyle, afterStyle = props.afterStyle, allowClear = props.allowClear, onChange = props.onChange, defaultValue = props.defaultValue, onKeyDown = props.onKeyDown, mode = props.mode, value = props.value, resProps = __rest(props, ["disabled", "className", "size", "icon", "style", "type", "iconClick", "onProgress", "prefix", "suffix", "addBefore", "addAfter", "beforeStyle", "afterStyle", "allowClear", "onChange", "defaultValue", "onKeyDown", "mode", "value"]);
    var _d = __read(useState(false), 2), mfocus = _d[0], setMfocus = _d[1];
    var _e = __read(useState(''), 2), inputValue = _e[0], setinputValue = _e[1];
    var _f = __read(useState(false), 2), clearControl = _f[0], setClearControl = _f[1];
    var inputRef = useRef(null);
    var fakerRef = useRef(null);
    var _g = __read(useState(''), 2), width = _g[0], setWidth = _g[1];
    var cx = classNames('lig-input', className, {
        size: props.size,
        'disabled': disabled,
        'button': props.pointerEventFocus
    });
    var contentcx = classNames('input-content', {
        'focus': mfocus,
        'blur': !mfocus,
        'pl-none': prefix || addBefore,
        'pr-none': !allowClear && (suffix || addAfter),
        'padding': !prefix && !suffix,
        'rl-none': addBefore,
        'rr-none': addAfter,
        'mode': 'mode' in props,
        'button': props.pointerEventFocus
    });
    var wrappercx = classNames('input-wrapper', {});
    var inputcx = classNames('minput', {
        'focus': mfocus,
        'blur': !mfocus,
        'button': props.pointerEventFocus
    });
    var ligInputRef = useRef(null);
    useEffect(function () {
        props.inputCallback && props.inputCallback(inputRef === null || inputRef === void 0 ? void 0 : inputRef.current);
    }, []);
    var blurChange = function () {
        var _a;
        'checked' in props ? setMfocus(props.checked) : setMfocus(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        props.onBlur && props.onBlur(inputValue);
    };
    var focusChange = function () {
        var _a;
        !props.pointerEventFocus && ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus());
        setMfocus(true);
    };
    useEffect(function () {
        'checked' in props ? setMfocus(props.checked) : setMfocus(false);
    }, [props.checked]);
    var inputHandleChange = function (e) {
        setinputValue(props.value ? props.value : e.target.value);
        props.onChange && props.onChange(e.target.value, e, mfocus);
    };
    var onClear = function (e) {
        e.stopPropagation();
        if (inputRef.current && inputRef.current.focus && !props.pointerEventFocus) {
            inputRef.current.focus();
        }
        setinputValue('');
        setClearControl(true);
        props.onClear && props.onClear(inputValue, e);
    };
    var inputOnKeyDown = function (e) {
        if (e.keyCode === 13 && mode) {
            mode && setWidth('4px');
        }
        else {
            setinputValue(props.value ? props.value : e.target.value);
        }
        props.onKeyDown && props.onKeyDown(e);
    };
    useEffect(function () {
        if (mode && mode.length > 0) {
            setClearControl(false);
        }
        else {
            if (inputValue === undefined || inputValue === '') {
                setClearControl(true);
            }
            else {
                setClearControl(false);
            }
        }
    }, [inputValue, mode]);
    useEffect(function () {
        defaultValue && setinputValue(defaultValue);
    }, []);
    useEffect(function () {
        if (!defaultValue) {
            props.value ? setinputValue(props.value) : setinputValue('');
        }
    }, [props.value]);
    var renderOrder = function (child, classname) {
        if (classname === 'input-clear' && allowClear) {
            return React.createElement("div", { onClick: onClear, onMouseDown: function (e) {
                    e.preventDefault();
                }, style: {
                    visibility: clearControl ? 'hidden' : 'visible',
                    cursor: 'pointer'
                }, className: classname }, React.createElement(Icon, { style: { color: '#adb5bd' }, icon: 'times-circle' }));
        }
        else {
            return child && React.createElement("div", { onMouseDown: function (e) {
                    e.preventDefault();
                }, className: classname }, child);
        }
    };
    var mouseControl = function (flag) {
        if (mode && mode.length > 0) {
            setClearControl(false);
        }
        else {
            if (flag === 'enter') {
                if (inputValue === undefined || inputValue === '') {
                    setClearControl(true);
                }
                else {
                    setClearControl(false);
                }
            }
            else if (flag === 'leave') {
                setClearControl(true);
            }
        }
    };
    useEffect(function () {
        var _a;
        if ((mode === null || mode === void 0 ? void 0 : mode.length) <= 0 && (inputValue === '' || inputValue === undefined)) {
            setWidth('');
        }
        else {
            if (inputValue !== '' && inputValue !== undefined) {
                setWidth("".concat((_a = fakerRef === null || fakerRef === void 0 ? void 0 : fakerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth, "px"));
            }
            else if (mode && mode.length > 0 && (inputValue === '' || inputValue === undefined)) {
                setWidth('4px');
            }
        }
    }, [inputValue, mode]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: cx, onMouseEnter: function () { return mouseControl('enter'); }, onMouseLeave: function () { return mouseControl('leave'); }, style: __assign({}, props.style), ref: ligInputRef },
            React.createElement("div", { className: wrappercx },
                renderOrder(addBefore, 'input-addBefore'),
                React.createElement("div", { className: contentcx, onMouseDown: function (e) {
                        e.preventDefault();
                        focusChange();
                    } },
                    renderOrder(prefix, 'input-prefix'),
                    mode && mode,
                    React.createElement("input", { value: inputValue, onKeyDown: inputOnKeyDown, type: type === 'password' || type === 'text' ? type : 'text', className: inputcx, ref: inputRef, checked: null, placeholder: props.placeholder && props.placeholder, style: {
                            fontSize: "".concat((style === null || style === void 0 ? void 0 : style.fontSize) ? style.fontSize : ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) * 0.5, "px"),
                            width: width,
                        }, onChange: inputHandleChange, onBlur: blurChange, onFocus: focusChange }),
                    mode && React.createElement("span", { className: "input-faker", style: { fontSize: "".concat((style === null || style === void 0 ? void 0 : style.fontSize) ? style === null || style === void 0 ? void 0 : style.fontSize : ((_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight) * 0.5, "px") }, ref: fakerRef }, inputValue),
                    allowClear ? renderOrder(suffix, 'input-clear') : renderOrder(suffix, 'input-suffix')),
                renderOrder(addAfter, 'input-addAfter')))));
};
export default Input;
Input.defaultProps = {
    icon: 'coffee'
};
