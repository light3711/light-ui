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
import classNames from "classnames";
import { isUndefined } from "lodash";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Group from "./Group";
import { CheckboxGroupContext } from "./Group";
export function useMergeValue(defaultStateValue, props) {
    var _a = props || {}, defaultValue = _a.defaultValue, value = _a.value;
    var firstRenderRef = useRef(true);
    var _b = __read(useState(!isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue), 2), stateValue = _b[0], setStateValue = _b[1];
    useEffect(function () {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        if (value === undefined) {
            setStateValue(value);
        }
    }, [value]);
    var mergedValue = isUndefined(value) ? stateValue : value;
    return [mergedValue, setStateValue, stateValue];
}
/**
 * 可通过复选框选择一个或多个数据
 * ### 引用方法
 *
 * ~~~js
 * import { Checkbox } from "@light3711/lightui"
 * ~~~
 */
var Checkbox = function (props, ref) {
    var context = useContext(CheckboxGroupContext);
    var onGroupChange = context.onGroupChange;
    var _props = __assign({}, props);
    if (context.isCheckboxGroup) {
        _props.checked = context.checkboxGroupValue.indexOf(props.value) !== -1;
        _props.disabled = 'disabled' in props ? props.disabled : context.disabled;
    }
    var disabled = _props.disabled, indeterminate = _props.indeterminate, className = _props.className, value = _props.value;
    var _a = __read(useMergeValue(false, {
        value: _props.checked,
        defaultValue: _props.defaultChecked
    }), 2), checked = _a[0], setChecked = _a[1];
    var cx = classNames('lig-checkbox', {
        'disabled': !!disabled,
        'indeterminate': !!indeterminate,
        'checked': checked,
    }, className);
    useEffect(function () {
        context.registerValue(value);
        return function () {
            context.unRegisterValue(value);
        };
    }, [value]);
    var onChange = useCallback(function (e) {
        e.persist();
        e.stopPropagation();
        setChecked(e.target.checked);
        if (context.isCheckboxGroup) {
            onGroupChange && onGroupChange(props.value, e.target.checked, e);
        }
        props.onChange && props.onChange(e.target.checked, e);
    }, [onGroupChange, context.isCheckboxGroup, props.onChange, props.value]);
    return (React.createElement("label", { className: cx },
        React.createElement("input", { type: 'checkbox', value: value, checked: !!checked, disabled: !!disabled, onChange: onChange, onClick: function (e) { return e.stopPropagation(); } }),
        React.createElement("span", null, props.children ? props.children : 'checkbox')));
};
var CheckboxComponent = React.forwardRef(Checkbox);
CheckboxComponent.displayName = 'Checkbox';
CheckboxComponent.Group = Group;
// CheckboxComponent.useCheckbox = useCheckbox
export default CheckboxComponent;
