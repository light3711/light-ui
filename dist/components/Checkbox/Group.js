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
import classNames from "classnames";
import { isArray, isObject } from "lodash";
import React, { createContext, useCallback, useState } from "react";
import Checkbox from "./Checkbox";
import { useMergeValue } from "./Checkbox";
var defaultContextValue = {
    isCheckboxGroup: false,
    checkboxGroupValue: [],
    onGroupChange: function () { },
    registerValue: function () { },
    unRegisterValue: function () { },
};
export var CheckboxGroupContext = createContext(defaultContextValue);
var Group = function (props
//PropsWithChildren本身封装了 children 的类型声明
) {
    var _a;
    var children = props.children, disabled = props.disabled, className = props.className, options = props.options, _b = props.direction, direction = _b === void 0 ? 'horizontal' : _b;
    var _c = __read(useMergeValue([], {
        defaultValue: 'defaultValue' in props ? props.defaultValue || [] : undefined,
        value: 'value' in props ? props.value || [] : undefined,
    }), 2), value = _c[0], setValue = _c[1];
    var _d = __read(useState([]), 2), allOptionValues = _d[0], setAllOptionValues = _d[1];
    var cx = classNames('checkbox-Group', className, (_a = {},
        _a["".concat(direction)] = direction,
        _a));
    var onChange = useCallback(function (optionValue, checked, e) {
        var newVal = value.slice();
        if (checked) {
            newVal.push(optionValue);
        }
        else {
            newVal.splice(value.indexOf(optionValue), 1);
        }
        setValue(newVal);
        props.onChange &&
            props.onChange(newVal.filter(function (v) { return allOptionValues.indexOf(v) > -1; }), e);
    }, [value, props.onChange, allOptionValues]);
    return (React.createElement("span", { className: cx, style: props.style },
        React.createElement(CheckboxGroupContext.Provider, { value: {
                isCheckboxGroup: true,
                checkboxGroupValue: value,
                onGroupChange: onChange,
                disabled: disabled,
                registerValue: function (value) {
                    setAllOptionValues(function (all) {
                        return Array.from(new Set(__spreadArray(__spreadArray([], __read(all), false), [value], false)));
                    });
                },
                unRegisterValue: function (value) {
                    setAllOptionValues(function (all) {
                        return all.filter(function (x) { return x !== value; });
                    });
                }
            } }, isArray(options)
            ? options.map(function (option) {
                var label = isObject(option) ? option.label : option;
                var checkValue = isObject(option) ? option.value : option;
                return (React.createElement(Checkbox, { disabled: disabled || (isObject(option) && option.disabled), key: checkValue, value: checkValue }, label));
            }) : children)));
};
Group.displayName = 'CheckboxGroup';
export default Group;
