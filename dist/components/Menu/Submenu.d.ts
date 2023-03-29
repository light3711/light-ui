import React, { CSSProperties } from "react";
export interface SubMenuProps {
    className?: string;
    index?: string;
    title?: string;
    style?: CSSProperties;
    children?: any;
    icon?: any;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
