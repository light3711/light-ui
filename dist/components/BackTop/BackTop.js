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
import React from 'react';
import { useState } from 'react';
/**
 * 可一键返回顶部
 *
 * ### 引用方法
 *
 * ~~~js
 * import { BackTop } from "@light3711/lightui"
 * ~~~
 */
export var BackTop = function (props) {
    var visibilityHight = props.visibilityHight, onClick = props.onClick, className = props.className, children = props.children;
    var _a = __read(useState(false), 2), show = _a[0], setisShow = _a[1];
    var backOnclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        onClick && onClick();
    };
    var handle = function () {
        var tops = document.body.scrollTop || document.documentElement.scrollTop;
        if (visibilityHight) {
            if (tops >= visibilityHight) {
                setisShow(true);
            }
            else {
                setisShow(false);
            }
        }
    };
    window.addEventListener('scroll', handle);
    return (React.createElement("div", { onClick: backOnclick, className: "lig-backTop ".concat(show ? 'show' : '', " ").concat(className) }, props.children));
};
BackTop.defaultProps = {
    visibilityHight: 300
};
