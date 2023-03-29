import React from "react";
import Tag from "../components/Tag/Tag";
export function RenderTitle(title, api) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { color: 'gray' } }, title),
        React.createElement("div", { style: { marginRight: '10px' } }),
        api && React.createElement(Tag, { size: "mini", allowClose: false, color: 'blue' },
            " ",
            api,
            " ")));
}
