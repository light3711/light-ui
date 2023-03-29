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
import React from "react";
import classNames from "classnames";
/**
 * 按钮
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from "@light3711/lightui"
 * ~~~
 */
export var Button = function (props) {
    var _a;
    var btnType = props.btnType, disabled = props.disabled, size = props.size, className = props.className, children = props.children, href = props.href, shape = props.shape, restProps = __rest(props, ["btnType", "disabled", "size", "className", "children", "href", "shape"]);
    var classes = classNames('lig-btn', (_a = {
            'disabled': disabled
        },
        _a["".concat(size)] = size,
        _a["".concat(btnType)] = btnType,
        _a["".concat(shape)] = shape,
        _a), className);
    if (btnType === btnType && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes }, restProps), children ? children : 'Button'));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'primary',
};
export default Button;
