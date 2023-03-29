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
import React, { useState } from 'react';
import Icon from '../Icon';
export var Imgcontrol = function (props) {
    var src = props.src, _a = props.currentIndex, currentIndex = _a === void 0 ? 0 : _a, onClose = props.onClose;
    var _b = __read(useState(currentIndex), 2), index = _b[0], setindex = _b[1];
    var SCALE_MULTIPLE = 0.25;
    var ROTATE_MULTIPLE = 90;
    var _c = __read(useState(1), 2), scale = _c[0], setscale = _c[1];
    var _d = __read(useState(0), 2), rotate = _d[0], setrotate = _d[1];
    var handleRight = function () {
        index < src.length - 1 && setindex(index + 1);
        setscale(1);
        setrotate(0);
    };
    var handleLeft = function () {
        index !== 0 && setindex(index - 1);
        setscale(1);
        setrotate(0);
    };
    var handleRotateRight = function () {
        setrotate(rotate + ROTATE_MULTIPLE);
    };
    var handleRotateLeft = function () {
        setrotate(rotate - ROTATE_MULTIPLE);
    };
    var handleEnlarge = function () {
        if (scale < 0.75) {
            return;
        }
        else {
            setscale(scale - SCALE_MULTIPLE);
        }
    };
    var handleClose = function () {
        onClose && onClose();
    };
    var handleNarrow = function () {
        setscale(scale + SCALE_MULTIPLE);
    };
    return (React.createElement("div", { className: "preview-container" },
        React.createElement("img", { className: 'preciew-img', src: src[index].src, style: { transform: "scale(".concat(scale, ") rotate(").concat(rotate, "deg)") } }),
        React.createElement("div", { className: "preview-control" },
            React.createElement("ul", { className: 'preview-control-ul' },
                React.createElement("li", { className: 'preview-control-icon', onClick: handleClose },
                    React.createElement(Icon, { icon: 'window-close', size: '2x' })),
                React.createElement("li", { className: 'preview-control-icon' },
                    React.createElement(Icon, { icon: 'caret-left', size: '2x', onClick: handleRotateLeft })),
                React.createElement("li", { className: 'preview-control-icon' },
                    React.createElement(Icon, { icon: 'caret-right', size: '2x', onClick: handleRotateRight })),
                React.createElement("li", { className: 'preview-control-icon' },
                    React.createElement(Icon, { icon: 'search-minus', size: '2x', onClick: handleEnlarge })),
                React.createElement("li", { className: 'preview-control-icon' },
                    React.createElement(Icon, { icon: 'search-plus', size: '2x', onClick: handleNarrow })))),
        React.createElement("div", { className: "img-dark", onClick: handleClose }),
        src.length > 1 && (React.createElement("div", { className: 'preview-aside-control' },
            React.createElement("div", { className: "img-leftClick", onClick: handleLeft },
                React.createElement(Icon, { icon: 'arrow-left' }, "left")),
            React.createElement("div", { className: "img-rightClick", onClick: handleRight },
                React.createElement(Icon, { icon: 'arrow-right' }))))));
};
