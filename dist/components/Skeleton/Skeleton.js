import React, { useCallback } from 'react';
import classNames from 'classnames';
/**
 * 将加载中的数据用灰色占位
 * ### 引用方法
 *
 * ~~~js
 * import { Skeleton } from "@light3711/lightui"
 * ~~~
 */
var Skeleton = function (props) {
    var className = props.className, style = props.style, _a = props.loading, loading = _a === void 0 ? true : _a, img = props.img, row = props.row, _b = props.width, width = _b === void 0 ? [] : _b;
    var cx = classNames(className);
    var lineHeight = useCallback(function (i) {
        if (width && width.length) {
            if (typeof width[i] === 'string') {
                return {
                    width: width[i],
                };
            }
            if (typeof width[i] === 'number') {
                return {
                    width: "".concat(width[i], "px"),
                };
            }
        }
        return {};
    }, [width]);
    return (React.createElement(React.Fragment, null, loading ? (React.createElement("div", { className: cx, style: style },
        img && React.createElement("div", { className: "lig-skeleton-img" }),
        React.createElement("div", { className: "lig-skeleton-container" }, row && new Array(row).fill('').map(function (r, i) {
            return (React.createElement("div", { className: "lig-skeleton-line", style: lineHeight(i), key: i }));
        })))) : (React.createElement(React.Fragment, null))));
};
export default Skeleton;
