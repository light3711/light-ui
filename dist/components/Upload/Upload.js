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
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import Icon from "../Icon";
import Progress from "../Progress";
import classNames from "classnames";
/**
 * 用户可传输文件或提交相应的内容
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from "@light3711/lightui"
 * ~~~
 */
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChangee = props.onChangee, defaultFileList = props.defaultFileList, onRemove = props.onRemove, name = props.name, header = props.header, data = props.data, withCredentials = props.withCredentials, accept = props.accept, children = props.children, dragger = props.dragger;
    var _a = __read(useState(defaultFileList || []), 2), fileList = _a[0], setFileList = _a[1];
    var fileInput = useRef(null);
    var updateFileList = function (updateFile, updateObject) {
        setFileList(function (f) {
            return f.map(function (item) {
                if (item.uid === updateFile.uid) {
                    return __assign(__assign({}, item), updateObject);
                }
                else {
                    return item;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleChange = function (e) {
        var files = e === null || e === void 0 ? void 0 : e.target.files;
        if (!files) {
            return;
        }
        else {
            uploadFile(files);
        }
        if (fileInput === null || fileInput === void 0 ? void 0 : fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (e) {
            return e.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var Post = function (f) {
        var _FileData = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            size: f.size,
            name: f.name,
            percent: 0,
            raw: f
        };
        setFileList(function (p) {
            return __spreadArray([_FileData], __read(p), false);
        });
        var formData = new FormData();
        formData.append(name || 'file', f);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, header),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 101) {
                    updateFileList(_FileData, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, f);
                    }
                }
            }
        }).then(function (resp) {
            updateFileList(_FileData, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, f);
            }
        }).catch(function (err) {
            updateFileList(_FileData, { status: 'error', response: err.data });
            console.log(err, 'err');
            if (onError) {
                onError(err, f);
            }
        });
    };
    var uploadFile = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                Post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (file) {
                        Post(file);
                    });
                    if (onChangee) {
                        onChangee(file);
                    }
                }
                else {
                    if (result !== false) {
                        Post(file);
                    }
                    if (onChangee) {
                        onChangee(file);
                    }
                }
            }
        });
    };
    var renderUploadList = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", null, fileList === null || fileList === void 0 ? void 0 : fileList.map(function (e) { return (React.createElement("div", { className: 'upload-list', key: e.uid },
                React.createElement(Icon, { icon: 'file-alt', theme: 'secondary' }),
                React.createElement("span", { className: "upload-list-title" },
                    " ",
                    e.name,
                    " "),
                React.createElement("span", { className: 'file-status' },
                    (e.status === 'uploading' || e.status === 'ready') &&
                        React.createElement(Icon, { className: 'file-status-icon', icon: "spinner", spin: true, theme: "primary" }),
                    e.status === 'success' &&
                        React.createElement(Icon, { className: 'file-status-icon', icon: "check-circle", theme: "success" }),
                    e.status === 'error' &&
                        React.createElement(Icon, { className: 'file-status-icon', icon: "times-circle", theme: "danger" }),
                    React.createElement("span", { className: 'file-status-x' },
                        React.createElement(Icon, { icon: 'times', color: "#6c757d", onClick: function () { handleRemove(e); } }))),
                React.createElement(Progress, { style: props.progressStyle, className: 'upload-p', percent: e.percent, showText: true }))); }))));
    };
    return (React.createElement("div", { style: props.style },
        React.createElement("div", { className: "lig-upload" },
            React.createElement("div", { onClick: handleClick, className: "upload-dragger" },
                React.createElement("input", { accept: accept, type: 'file', onChange: handleChange, style: { display: 'none' }, className: "upload-input", ref: fileInput }),
                dragger ? React.createElement(Dragger, { onFile: function (files) { uploadFile(files); } }, children) : children)),
        renderUploadList()));
};
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = __read(useState(false), 2), dragOver = _a[0], setDragOver = _a[1];
    var klass = classNames('lig-dragger', {
        'is-dragger': dragOver
    });
    var handleDragger = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: klass, onDragOver: function (e) { handleDragger(e, true); }, onDragLeave: function (e) { handleDragger(e, false); }, onDrop: handleDrop }, children));
};
Upload.defaultProps = {
    name: 'file'
};
