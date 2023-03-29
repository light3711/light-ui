import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
export var MenuItem = function (props) {
    var index = props.index, className = props.className, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menuItem', className, {
        'disabled': disabled,
        'active': context.index === index && !disabled
    });
    var handleClick = function () {
        if (context.itemClick && !disabled && (typeof index === 'string')) {
            context.itemClick(index);
        }
    };
    return (React.createElement("li", { className: classes, onClick: handleClick },
        children,
        React.createElement("div", { className: "line", style: { backgroundColor: context.index === index &&
                    !disabled && className &&
                    className.indexOf('onlyMenuItem') !== -1 ? '#0d6efd' : ''
            } })));
};
MenuItem.displayName = 'MenuItem';
