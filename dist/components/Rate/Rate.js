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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import classNames from 'classnames';
import React, { useEffect, useState, useCallback } from 'react';
import Icon from '../Icon';
/**
 *
 * 评分打星 ✨
 *
 * ### 引用方法
 *
 * ~~~js
 * import { Rate } from "@light3711/lightui"
 * ~~~
 */
export var Rate = function (props) {
    var count = props.count, value = props.value, _a = props.readOnly, readOnly = _a === void 0 ? false : _a, className = props.className, style = props.style;
    var _b = __read(useState([]), 2), starShowStatus = _b[0], setStarShowStatus = _b[1];
    var _c = __read(useState([]), 2), logStarShowStatus = _c[0], setLogStarShowStatus = _c[1];
    var _d = __read(useState(false), 2), hasClick = _d[0], setHasClick = _d[1];
    var _e = __read(useState(false), 2), toggle = _e[0], setToggle = _e[1];
    var cx = classNames('lig-rate', className, {
        'readOnly': readOnly
    });
    var _value = 'value' in props ? value : 2;
    useEffect(function () {
        var initStar = [];
        for (var i = 0; i < _value; i++) {
            initStar[i] = true;
        }
        if (count > _value && initStar.length < count) {
            initStar.splice.apply(initStar, __spreadArray([initStar.length, 0], __read(new Array(count - _value).fill(false)), false));
        }
        setStarShowStatus(initStar);
        setLogStarShowStatus(initStar);
    }, []);
    var enterStar = function (e, i) {
        // 进入星星
        if (readOnly)
            return;
        var event = e;
        var mouseLeft = event.offsetX;
        setStarShowStatus(function (oldArr) {
            if (mouseLeft >= 8) {
                oldArr[i] = true;
            }
            for (var start = 0; start < i; start++) {
                oldArr[start] = true;
            }
            for (var start = i + 1; start < oldArr.length; start++) {
                oldArr[start] = false;
            }
            return JSON.parse(JSON.stringify(oldArr));
        });
    };
    var isSureNowStatus = function () {
        // 点击确认状态
        if (readOnly)
            return;
        setToggle(!toggle);
        if (hasClick && starShowStatus.toString() === logStarShowStatus.toString()) {
            setHasClick(false);
            setStarShowStatus(function (oldArr) {
                oldArr = oldArr.map(function (ra) { return (ra = false); });
                props.onClick &&
                    props.onClick(oldArr.reduce(function (pre, next) {
                        // 统计分数
                        if (pre === true) {
                            pre = 1;
                        }
                        else if (pre === false) {
                            pre = 0;
                        }
                        if (next === true) {
                            next = 1;
                        }
                        else if (next === false) {
                            next = 0;
                        }
                        return pre + next;
                    }));
                setLogStarShowStatus(function (oldArr) {
                    // 清除
                    oldArr = oldArr.map(function (ra) { return (ra = false); });
                    return JSON.parse(JSON.stringify(oldArr));
                });
                return JSON.parse(JSON.stringify(oldArr));
            });
        }
        else {
            setLogStarShowStatus(function (oldArr) {
                // 更新历史数组
                oldArr = starShowStatus;
                return JSON.parse(JSON.stringify(oldArr));
            });
            setHasClick(true);
            props.onClick &&
                props.onClick(starShowStatus.reduce(function (pre, next) {
                    if (pre === 'half') {
                        pre = 0.5;
                    }
                    else if (pre === true) {
                        pre = 1;
                    }
                    else if (pre === false) {
                        pre = 0;
                    }
                    if (next === 'half') {
                        next = 0.5;
                    }
                    else if (next === true) {
                        next = 1;
                    }
                    else if (next === false) {
                        next = 0;
                    }
                    return pre + next;
                }));
        }
    };
    var enterRate = function () {
        // 进入整个容器
        if (readOnly)
            return;
        setLogStarShowStatus(function (oldArr) {
            oldArr = starShowStatus;
            return JSON.parse(JSON.stringify(oldArr));
        });
    };
    var leaveRate = function () {
        // 离开整个容器
        if (readOnly)
            return;
        setStarShowStatus(function (oldArr) {
            oldArr = logStarShowStatus;
            return JSON.parse(JSON.stringify(oldArr));
        });
        setHasClick(false);
    };
    var starBg = useCallback(function (i) {
        return {
            color: starShowStatus[i] ? 'orange' : '#ccc',
            transform: starShowStatus[i] && 'scale(1.2)'
        };
    }, [starShowStatus]);
    var _child = React.createElement("div", null, props.children);
    return (React.createElement("div", { style: style, className: cx },
        React.createElement("div", { className: "rate-container", style: { display: 'flex' }, onMouseLeave: leaveRate, onMouseEnter: enterRate }, new Array(count).fill('').map(function (ra, i) {
            return (React.createElement("div", { className: "rate-box", key: i, onMouseMove: function (event) { return enterStar(event.nativeEvent, i); }, onClick: isSureNowStatus }, props.children ? React.cloneElement(_child, {
                className: "rate-row ".concat(readOnly ? 'readonly-rate-row' : ''),
                style: starBg(i)
            }) :
                React.createElement(Icon, { className: "rate-row ".concat(readOnly ? 'readonly-rate-row' : ''), style: starBg(i), icon: 'star' })));
        }))));
};
