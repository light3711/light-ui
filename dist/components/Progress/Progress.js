import classNames from "classnames";
import React from "react";
export var Progress = function (props) {
    var percent = props.percent, showText = props.showText, theme = props.theme;
    var cx = classNames('lig-progress', {}, props.className);
    return (React.createElement("div", { className: cx, style: {
            display: "".concat(percent, "%") === '100%' ? 'none' : 'block'
        } },
        React.createElement("div", { className: "progress-outer" },
            React.createElement("div", { className: "progress-inner-color-".concat(theme), style: { width: "".concat(percent, "%") } }))));
};
Progress.defaultProps = {
    showText: true,
    theme: 'primary'
};
