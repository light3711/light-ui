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
import React from 'react';
import { useState } from 'react';
import { Imgcontrol } from './imgcontrol';
/**
 * 展示和预览图片
 * ### 引用方法
 *
 * ~~~js
 * import { Img } from "@light3711/lightui"
 * ~~~
 */
export var Img = function (props) {
    var src = props.src, style = props.style;
    var _a = __read(useState(false), 2), open = _a[0], setopen = _a[1];
    var handleclick = function () {
        setopen(!open);
    };
    var cx = classNames('lig-img', {}, props.className);
    return (React.createElement("div", { className: cx, style: style },
        src ?
            React.createElement("img", { src: src[0].src, className: 'img-wrapper', onClick: handleclick })
            :
                React.createElement("div", { style: { backgroundColor: '#adb5bd', color: 'white' } }, "\u6682\u65E0\u6570\u636E"),
        open &&
            React.createElement(Imgcontrol, { onClose: function () {
                    setopen(!open);
                    props.onClose && props.onClose();
                }, src: src ? src : [] })));
};
