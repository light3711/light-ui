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
import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: '0' }); //默认值是0
/**
 * 收纳、排列并展示一系列选项的列表。
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from "@light3711/lightui"
 * ~~~
 */
export var Menu = function (props) {
    var _a;
    var type = props.type, className = props.className, onClick = props.onClick, children = props.children, defalutOpenSubMenu = props.defalutOpenSubMenu, style = props.style;
    var _b = __read(useState(''), 2), currentActive = _b[0], setActive = _b[1];
    var cx = classNames('lig-menu', className, (_a = {},
        _a["menu-".concat(type)] = type,
        _a));
    var handleClick = function (index) {
        setActive(index);
        onClick && onClick(index);
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        itemClick: handleClick,
        type: type,
        defalutOpenSubMenu: defalutOpenSubMenu
    };
    var renderChilden = function () {
        return React.Children.map(children, function (child, index) {
            var childrenElement = child;
            var displayName = childrenElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childrenElement, {
                    index: index.toString(),
                    className: 'onlyMenuItem'
                }); //cloneElement 为每一个childrenElement添加index属性
            }
            if (displayName === 'SubMenu') {
                return React.cloneElement(childrenElement, {
                    index: index.toString(),
                }); //cloneElement 为每一个childrenElement添加index属性
            }
            else {
                console.log('err');
            }
        });
    };
    return (React.createElement("ul", { className: cx, style: __assign({}, style) },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChilden())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    type: 'horizontal ',
    defalutOpenSubMenu: []
};
export default Menu;
