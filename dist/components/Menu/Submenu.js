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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { Icon } from "../Icon/Icon";
var SubMenu = function (props) {
    var className = props.className, title = props.title, index = props.index, children = props.children, icon = props.icon;
    var context = useContext(MenuContext);
    var _a = __read(useState(false), 2), menuShow = _a[0], setShow = _a[1];
    var cx = classNames('subMenu', className, {
        'active': context.index === index // 是否高亮
        // ,'is-Y': context.type === 'Y',
    });
    var openItemcx = classNames('openItem', className, {
        'show': menuShow
    });
    var handleClick = function (e, node) {
        console.log(node);
        e.preventDefault();
        if (context.type === "vertical") {
            setShow(!menuShow);
        }
        else {
            setShow(true);
        }
    };
    var time;
    var onMouseEnter = function () {
        if (context.type === 'vertical') {
            return;
        }
        else {
            clearTimeout(time);
            setShow(true);
        }
    };
    var onMouseLeave = function () {
        if (context.type === 'vertical') {
            return;
        }
        else {
            time = setTimeout(function () {
                setShow(false);
            }, 100);
        }
    };
    var renderChildren = function () {
        var chlildrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.log('SubMenuError');
            }
        });
        return (React.createElement("div", { className: openItemcx, style: { height: (menuShow && (children === null || children === void 0 ? void 0 : children.length) >= 0) ? "".concat((children === null || children === void 0 ? void 0 : children.length) * 40, "px") : '0' } }, chlildrenComponent));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { key: index, className: cx, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
            React.createElement("div", { className: "submenu-title ".concat(menuShow ? 'show' : ''), onClick: function (e) { return handleClick(e, 'title'); } },
                React.createElement("div", { className: "title" },
                    icon ? icon : (context.type === 'vertical') && '',
                    title,
                    context.type === 'vertical' && React.createElement(Icon, { className: "up ".concat(menuShow ? 'show' : ''), icon: 'angle-up' }))),
            context.type === 'horizontal ' && React.createElement("li", { className: "line", style: { backgroundColor: menuShow ? '#0d6efd' : '' } }),
            renderChildren())));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
