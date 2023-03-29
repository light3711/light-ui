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
import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import Input from '../Input/Input';
import Tag from '../Tag/Tag';
/**
 * 标签输入Input
 * ### 引用方法
 *
 * ~~~js
 * import { InputTag } from "@light3711/lightui"
 * ~~~
 */
export var InputTag = function (props) {
    var value = props.value, mode = props.mode, style = props.style;
    var _a = __read(useState([]), 2), tagArray = _a[0], setTagArray = _a[1];
    var _b = __read(useState(''), 2), tagValue = _b[0], setTagValue = _b[1];
    var _c = __read(useState(false), 2), checked = _c[0], setTagchecked = _c[1];
    var _d = __read(useState(null), 2), inputElement = _d[0], setTagHeight = _d[1];
    var _e = __read(useState({}), 2), u = _e[0], setU = _e[1];
    var inputTagRef = useRef(null);
    useEffect(function () {
        value && setTagArray(value);
    }, [value]);
    useEffect(function () {
        props.checked && setTagchecked(props.checked);
    }, [props.checked]);
    var inputTagOnKeyDowm = function (e) {
        if (e.keyCode === 13 && tagValue !== '') {
            setTagArray(function (state) {
                if (state.indexOf(tagValue) === -1) {
                    state.push(tagValue);
                }
                return state;
            });
            props.onChange && props.onChange(tagArray);
            props.onKeyDown && props.onKeyDown(tagArray);
            setTagValue('');
        }
        if (e.keyCode === 8 && tagArray.length !== 0 && (tagValue === undefined || tagValue === '')) {
            setTagArray(function (state) {
                state.pop();
                return state;
            });
            setTagValue('');
            setU({});
            props.onChange && props.onChange(tagArray);
        }
        props.onKeyDowm && props.onKeyDowm(e);
    };
    var onClose = function (e, item) {
        setTagArray(function (state) {
            var result = state.filter(function (v) { return v !== item; });
            return result;
        });
        props.onClose && props.onClose(item);
        props.onChange && props.onChange(tagArray);
    };
    var renderTag = function () {
        return (props.renderTag ? tagArray === null || tagArray === void 0 ? void 0 : tagArray.map(function (value) {
            return props.renderTag(onClose, inputElement, value);
        })
            :
                tagArray === null || tagArray === void 0 ? void 0 : tagArray.map(function (item) {
                    return (React.createElement(Tag, { onClose: function (e, c) { return onClose(e, item); }, key: item, children: item, style: {
                            color: 'black',
                            backgroundColor: checked ? '#ecf2f7' : 'white',
                            margin: '3px 0', marginRight: '2px', marginLeft: 'none',
                            height: "".concat((inputElement === null || inputElement === void 0 ? void 0 : inputElement.offsetHeight) * 0.75, "px"),
                            fontSize: "".concat((inputElement === null || inputElement === void 0 ? void 0 : inputElement.clientHeight) * 0.5, "px"),
                        } }));
                }));
    };
    var onClear = function () {
        setTagArray([]);
        setTagValue('');
        props.onClear && props.onClear();
    };
    function inputCallback(e) {
        setTagHeight(e);
    }
    return (React.createElement("div", { ref: inputTagRef, style: __assign({}, props.style) },
        React.createElement(Input, { value: props.inputValue ? props.inputValue : tagValue, mode: renderTag(), checked: props.checked ? props.checked : checked, inputCallback: inputCallback, placeholder: (tagArray.length > 0) ? '' : props.placeholder ? props.placeholder : 'Press Enter', suffix: React.createElement(Icon, { color: "#d4d4d4", icon: 'times' }), pointerEventFocus: props.pointerEventFocus ? props.pointerEventFocus : false, allowClear: true, onClear: onClear, className: 'lig-inputTag', onKeyDown: inputTagOnKeyDowm, onChange: function (e) { setTagValue(e); }, addAfter: props.addAfter, addBefore: props.addBefore, onBlur: function () { return setTagchecked(false); } })));
};
