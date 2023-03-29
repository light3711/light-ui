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
import classNames from 'classnames';
import React, { useMemo, useEffect, useState } from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Icon from '../Icon';
var wrap;
export var createMessage = function () {
    return function (content) {
        switch (content.MessageType) {
            case 'warning':
                content.icon = React.createElement(Icon, { color: '#fd7e14 ', icon: 'exclamation-triangle' });
                break;
            case 'danger':
                content.icon = React.createElement(Icon, { color: '#dc3545', icon: 'times' });
                break;
            case 'success':
                content.icon = React.createElement(Icon, { color: '#26b83a', icon: 'check-circle' });
                break;
            case 'info':
                content.icon = React.createElement(Icon, { color: '#0d6efd', icon: 'info-circle' });
        }
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.style.cssText = "line-height:1.5;\n      text-align:center;\n      color: #333;\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n      list-style: none;\n      position: fixed;\n      z-index: 100000;\n      width: 100%;\n      top: ".concat(content.top ? content.top : '10px', ";\n      left: 0;\n      pointer-events: none;");
            if (wrap) {
                document.body && document.body.appendChild(wrap);
            }
        }
        var div = document.createElement('div');
        wrap.append(div);
        ReactDOM.render(React.createElement(Message, { rootDom: wrap, parentDom: div, content: content }), div);
    };
};
/**
 * 全局消息
 * ### 引用方法
 *
 * ~~~js
 * import { createMessage } from "@light3711/lightui"
 * ~~~
 */
export var Message = function (props) {
    var rootDom = props.rootDom, parentDom = props.parentDom, content = props.content;
    var _a = __read(useState(''), 2), cx = _a[0], setcx = _a[1];
    var messagecx = classNames('lig-message', content.className, cx);
    var unmont = useMemo(function () {
        return function () {
            if (parentDom && rootDom) {
                setcx('hidden');
                setTimeout(function () {
                    unmountComponentAtNode(parentDom);
                    rootDom.removeChild(parentDom);
                }, 200);
            }
        };
    }, [parentDom, rootDom]);
    useEffect(function () {
        setTimeout(function () {
            unmont();
        }, content.duration ? content.duration : 3000);
    }, [unmont]);
    return (React.createElement("div", { className: messagecx },
        React.createElement("span", null, content.icon && content.icon),
        React.createElement("span", null, content.content)));
};
