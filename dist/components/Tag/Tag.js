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
import React, { useCallback, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
var colors = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'];
/**
 * 用于信息的选择、筛选、分类
 * ### 引用方法
 *
 * ~~~js
 * import { Tag } from "@light3711/lightui"
 * ~~~
 */
var Tag = function (props, ref) {
    var _a, _b;
    var className = props.className, color = props.color, checkable = props.checkable, defaultChecked = props.defaultChecked, style = props.style, size = props.size, rest = __rest(props, ["className", "color", "checkable", "defaultChecked", "style", "size"]);
    var _c = __read(useState(false), 2), visible = _c[0], setVisible = _c[1];
    var _d = __read(useState(false), 2), loading = _d[0], setLoading = _d[1];
    var tagRef = useRef(null);
    var onClose = function (e) {
        var result = props.onClose && props.onClose(e, props.children);
        if (result && result.then) {
            setLoading(true);
            result.then(function () {
                setLoading(false);
                setVisible(true);
            })
                .catch(function () {
                setLoading(false);
            });
        }
        else {
            setVisible(true);
        }
    };
    var defaultColor = colors.indexOf(props.color) === -1;
    var cx = classNames('lig-tag', (_a = {},
        _a["".concat(props.color)] = props.color,
        _a['visible'] = visible,
        _a["tag-border ".concat(props.border)] = props.border,
        _a['defaultColor'] = defaultColor,
        _a["".concat(size)] = size,
        _a), className);
    var cxc = classNames('tag-closebtn', (_b = {},
        _b["".concat(props.color)] = props.color,
        _b['visible'] = visible,
        _b));
    var iconClick = useCallback(function (e) {
    }, []);
    return (React.createElement("div", { className: cx, ref: tagRef, style: __assign({}, props.style), onKeyDown: iconClick },
        React.createElement("div", { className: "tag-content" },
            React.createElement("div", { className: "tag-icon" }, props.icon),
            React.createElement("div", { className: "tag-children" },
                props.children ? props.children : 'tag',
                " "),
            React.createElement("div", null, props.allowClose && React.createElement("div", { className: cxc, onClick: onClose }, loading ? React.createElement(Icon, { icon: 'spinner', spin: true }) :
                React.createElement(Icon, { icon: "times" }))))));
};
Tag.defaultProps = {
    allowClose: true
};
export default Tag;
