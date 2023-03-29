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
import classNames from "classnames";
import React, { useState } from "react";
import { useEffect } from "react";
import { Icon } from '../Icon/Icon';
import Select from "../Select";
var options = [
    {
        value: "广东",
        label: "广东",
        children: [
            {
                value: "广州",
                label: "广州",
                children: [
                    {
                        value: "海珠",
                        label: "海珠",
                    },
                ],
            },
        ],
    },
    {
        value: "佛山",
        label: "佛山",
        children: [
            {
                value: "禅城",
                label: "禅城",
                children: [
                    {
                        value: "祖庙",
                        label: "祖庙",
                    },
                ],
            },
        ],
    },
];
/**
 * 指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔
 * ### 引用方法
 *
 * ~~~js
 * import { Cascader } from "@light3711/lightui"
 * ~~~
 */
export var Cascader = function (props) {
    var disabled = props.disabled, className = props.className, dataSource = props.dataSource, placeholder = props.placeholder, onChange = props.onChange;
    var _dataSource = props.dataSource ? props.dataSource : options;
    var _a = __read(useState([]), 2), firstOption = _a[0], setFirseOption = _a[1];
    var _b = __read(useState([]), 2), otherOption = _b[0], setOtherOption = _b[1];
    var _c = __read(useState([]), 2), SelectValue = _c[0], setSelectValue = _c[1];
    var _d = __read(useState(false), 2), clear = _d[0], setClear = _d[1];
    var cx = classNames('lig-cascader', className, {
        'disabled': disabled === false,
    });
    useEffect(function () {
        if (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) {
            setFirseOption(getOptionArr(dataSource));
        }
        else {
            setFirseOption(_dataSource);
        }
    }, [dataSource]);
    var getOptionArr = function (option) {
        return option.map(function (opt) {
            var item = {
                label: opt.label,
                value: opt.value,
                children: opt.children || [],
            };
            return item;
        });
    };
    var handleSelectOption = function (e, i) {
        var nowSelectValue;
        var currentLabel = e.label;
        var firstFilterLabel = firstOption.map(function (e) { return e.label; });
        if (firstFilterLabel.includes(currentLabel)) {
            e.children && setOtherOption([e.children]);
            setSelectValue([e.value]);
        }
        else {
            var nowSelectOption = otherOption.slice(0, i);
            e.children && nowSelectOption.push(e.children);
            setOtherOption(nowSelectOption);
            nowSelectValue = SelectValue.splice(0, i);
            nowSelectValue.push(e.value);
            setSelectValue(nowSelectValue);
        }
        if (!e.children) {
            onChange === null || onChange === void 0 ? void 0 : onChange(nowSelectValue);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Select, { value: SelectValue, placeholder: placeholder, mode: props.inputTag, option: SelectValue, allowClear: props.allowClear, className: cx, onClear: function () {
                setClear(true);
                setOtherOption([]);
            }, listStyle: {
                width: 'fit-content', display: 'flex'
            } },
            React.createElement("div", { className: "cascader-wrapper" }, firstOption.map(function (item, index) {
                return React.createElement("div", { key: item.value, className: "".concat(!clear && SelectValue.includes(item.value) ?
                        'cascader-first active' : 'cascader-first'), onClick: function () {
                        setClear(false);
                        handleSelectOption(item, 0);
                    } },
                    React.createElement("div", { className: "first-value" },
                        " ",
                        item.label,
                        " "),
                    React.createElement("div", { className: "first-icon" },
                        React.createElement(Icon, { color: "#418dff", icon: 'angle-right' })));
            })),
            React.createElement("div", { className: "cascader-wrapper", style: { display: 'flex' } }, otherOption.map(function (item, index) {
                return React.createElement("div", { key: index, className: "cascader-content" },
                    React.createElement("div", { className: 'cascader-content-item' }, item === null || item === void 0 ? void 0 : item.map(function (item) {
                        return (React.createElement("div", { className: "".concat(SelectValue.includes(item.value) ? ' cascader-item-span active' : 'cascader-item-span'), onClick: function () { return handleSelectOption(item, index + 1); } },
                            React.createElement("div", { className: "first-value" },
                                " ",
                                item.label,
                                " "),
                            React.createElement("div", { className: "first-icon" },
                                React.createElement(Icon, { color: "#418dff", icon: 'angle-right' }))));
                    })));
            })))));
};
export default Cascader;
