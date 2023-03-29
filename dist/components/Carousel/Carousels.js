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
import { useState } from "react";
import React, { useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon";
/**
 * 用于展示多张图片的循环播放，支持自动播放或用户手动切换
 * ### 引用方法
 *
 * ~~~js
 * import { Carousel } from "@light3711/lightui"
 * ~~~
 */
export var Carousel = function (props) {
    var _a = props.step, step = _a === void 0 ? 3000 : _a, _b = props.animationStep, animationStep = _b === void 0 ? 1 : _b, children = props.children, link = props.link, className = props.className, _c = props.dots, dots = _c === void 0 ? true : _c, _d = props.autoplay, autoplay = _d === void 0 ? true : _d, btnDirection = props.btnDirection, prevChange = props.prevChange, nextChange = props.nextChange;
    var _e = __read(useState(0), 2), current = _e[0], setCurrent = _e[1];
    var _f = __read(useState(1), 2), animationSteps = _f[0], setAnstep = _f[1];
    var _g = __read(useState(step), 2), steps = _g[0], setSteps = _g[1];
    var carouselcx = classNames('lig-carousel', className, {});
    var timeId;
    var _children = props.children ? props.children :
        [React.createElement("div", { className: 'carouselImg' }, "1"), React.createElement("div", { className: 'carouselImg' }, "2"), React.createElement("div", { className: 'carouselImg' }, "3"), React.createElement("div", { className: 'carouselImg' }, "4")];
    useEffect(function () {
        autoplay ? startCarousel() : nulls();
    });
    var startCarousel = function () {
        timeId = setTimeout(function () {
            handlerCarousel('');
        }, steps);
    };
    var handlerCarousel = function (dir) {
        var direction = 1;
        if (dir === 'left') {
            direction = -1;
        }
        if (_children) {
            if (current % (_children.length + 1) !== _children.length && current >= 0) {
                step && setSteps(step);
                setCurrent(current + direction);
                animationStep && setAnstep(animationStep);
            }
        }
        stopCarousel();
    };
    var stopCarousel = function () {
        clearInterval(timeId);
    };
    var nulls = function () { };
    var handleTransitionEnd = function () {
        if (_children) {
            if (current % (_children.length + 1) === _children.length) {
                setAnstep(0);
                setSteps(step - (animationStep * 1000));
                setCurrent(0);
            }
            else if (current < 0) {
                setAnstep(0);
                setCurrent(_children.length - 1);
            }
        }
    };
    var getActive = function (index) {
        if (_children) {
            if (current === index || current === index + _children.length || current < 0 && index === _children.length - 1) {
                return 'active';
            }
            return '';
        }
    };
    var dotsClick = function (index) {
        setAnstep(animationStep);
        setCurrent(index);
        stopCarousel();
    };
    var renderDots = function () {
        return (React.createElement("div", { className: 'carousel-footer ' },
            React.createElement("ul", { className: 'indicators-container' }, _children.map(function (item, index) {
                var active = getActive(index);
                return React.createElement("li", { onClick: function () { return dotsClick(index); }, key: index, className: "indicators-item ".concat(active) });
            }))));
    };
    var nextClick = function () {
        nextChange && nextChange(current);
        handlerCarousel();
    };
    var preClick = function () {
        prevChange && prevChange(current);
        handlerCarousel('left');
    };
    return (React.createElement("div", { className: carouselcx, style: props.style },
        React.createElement("div", { className: "carousel-body", onTransitionEnd: handleTransitionEnd, 
            //在 CSS 完成过渡后修改 <div> 元素样式及文字
            style: {
                transition: "transform ".concat(animationSteps, "s"),
                width: "".concat(((_children === null || _children === void 0 ? void 0 : _children.length) + 2) * 100, "%"),
                transform: "translateX(".concat(-100 / ((_children === null || _children === void 0 ? void 0 : _children.length) + 2) * (current + 1), "%)")
            } },
            React.createElement("div", { className: "carousel-item", style: { width: "".concat(100 / ((_children === null || _children === void 0 ? void 0 : _children.length) + 2), "%") }, key: 'start' },
                " ",
                _children && _children[(_children === null || _children === void 0 ? void 0 : _children.length) - 1]), _children === null || _children === void 0 ? void 0 :
            _children.map(function (item, index) {
                return (link ? React.createElement("a", { href: link[index], key: index },
                    React.createElement("div", { className: 'carousel-item', style: { width: "".concat(100 / ((_children === null || _children === void 0 ? void 0 : _children.length) + 2), "%") }, key: index }, item))
                    :
                        React.createElement("div", { className: 'carousel-item', style: { width: "".concat(100 / ((_children === null || _children === void 0 ? void 0 : _children.length) + 2), "%") }, key: index }, item));
            }),
            React.createElement("div", { className: "carousel-item", style: { width: "".concat(100 / ((_children === null || _children === void 0 ? void 0 : _children.length) + 2), "%") }, key: 'end' }, _children[0])),
        dots ? renderDots() : null,
        btnDirection && React.createElement("div", { className: "btn-container" },
            React.createElement("div", { className: "btn-direction pre", style: { color: 'white' }, onClick: preClick },
                React.createElement(Icon, { icon: 'angle-left' })),
            React.createElement("div", { className: "btn-direction next", style: { color: 'white' }, onClick: nextClick },
                React.createElement(Icon, { icon: 'angle-right' })))));
};
Carousel.defaultProps = {
    btnDirection: true
};
