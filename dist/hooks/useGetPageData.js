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
import { useState } from "react";
export var useGetPageData = function (pageSize, array) {
    var _a = __read(useState(1), 2), page = _a[0], setPage = _a[1];
    var newArray = __spreadArray([], __read(array), false);
    var r = [[]];
    for (var i = 0; i < Math.ceil(newArray.length / pageSize); i++) {
        var start = i * pageSize;
        var end = start + pageSize;
        r.push(newArray.slice(start, end));
    }
    var _result = r[page];
    return { sourceResult: _result, page: page, setPage: setPage, newArray: r };
};
