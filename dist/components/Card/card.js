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
import classNames from 'classnames';
import React from 'react';
export var Card = function (props) {
    var _a;
    var classnames = props.classnames, title = props.title, contents = props.contents, children = props.children, code = props.code, style = props.style;
    var cx = classNames('lig-card', classnames, {});
    var creactPane = function (code) {
        return code.split(',');
    };
    return (React.createElement(React.Fragment, null, contents ?
        React.createElement("div", { className: 'card-contents', style: __assign({}, style) },
            React.createElement("div", { className: "card-head" }, title),
            React.createElement("div", { className: 'card-code' }, code && ((_a = creactPane(code)) === null || _a === void 0 ? void 0 : _a.map(function (item, index) {
                return React.createElement("div", { key: index },
                    item,
                    React.createElement("span", { style: { color: '#1EA7FD' } }, ","));
            }))))
        :
            React.createElement("div", { className: cx },
                React.createElement("div", { className: "card-head" }, title),
                React.createElement("div", { className: 'card-content', style: style }, children))));
};
Card.defaultProps = {
    title: '',
    contents: false
};
