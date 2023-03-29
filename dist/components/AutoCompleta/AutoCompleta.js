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
import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDeboun";
import Select from "../Select";
import { Option } from "../Select/Select";
import useOnClickOutside from "../../hooks/useOnclickOutside";
/**
 * 输入框或自定义输入控件的自动补全功能。
 *
 * ### 引用方法
 *
 * ~~~js
 * import { AutoCompleta } from "@light3711/lightui"
 * ~~~
 */
export var AutoCompleta = function (props) {
    var fetchSuggestion = props.fetchSuggestion, onSelect = props.onSelect, value = props.value, dataSource = props.dataSource;
    var _a = __read(useState(value), 2), InputVlaue = _a[0], setInputValue = _a[1];
    var _b = __read(useState([]), 2), suggestion = _b[0], setSugestions = _b[1];
    var _c = __read(useState(false), 2), Loading = _c[0], setLoading = _c[1];
    var _d = __read(useState(-1), 2), heightLightIndex = _d[0], setHeightLightIndex = _d[1];
    var SeachRef = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(InputVlaue, 300); //防抖
    useOnClickOutside(componentRef, function () { setSugestions([]); });
    useEffect(function () {
        if (fetchSuggestion && debounceValue && SeachRef.current) {
            var results = fetchSuggestion(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSugestions(data);
                });
            }
            else {
                setSugestions(results);
            }
        }
        else {
            setSugestions([]);
        }
        setHeightLightIndex(-1);
    }, [debounceValue]);
    useEffect(function () { });
    var handleChange = function (e) {
        setInputValue(e);
        SeachRef.current = true;
        props.onChange && props.onChange(e);
    };
    function onMouse(e) {
        setHeightLightIndex(e);
    }
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSugestions([]);
        if (onSelect) {
            onSelect(item);
        }
        SeachRef.current = false;
    };
    var heightLight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestion.length) {
            index = suggestion.length - 1;
        }
        setHeightLightIndex(index);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Select, { placeholder: props.placeholder, className: "lig-autoComplete", value: InputVlaue, allowChange: true, allowClear: props.allowClear, suffix: React.createElement(Icon, { icon: 'spinner', color: Loading ? '#0d6efd' : 'transparent', className: "auto-loading", spin: true }), onChange: handleChange, style: props.style }, fetchSuggestion && !dataSource && (suggestion === null || suggestion === void 0 ? void 0 : suggestion.map(function (item, index) {
            return (React.createElement(Option, { onMouseEnter: function () { return onMouse(index); }, onMouseLeave: function () { return onMouse(index); }, onClick: function () { return handleSelect(item); }, key: index }, item.value));
        })))));
};
export default AutoCompleta;
