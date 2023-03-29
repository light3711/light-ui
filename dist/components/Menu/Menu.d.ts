import React from "react";
import { defaultType, styleType } from "../../utils/type";
export declare type MenuType = 'horizontal ' | 'vertical';
export interface MenuProps extends styleType, Pick<defaultType, 'onClick'> {
    type?: MenuType;
    childent?: React.ReactNode;
    defaultIndex?: string;
    defalutOpenSubMenu?: string[];
    icon?: any;
}
interface MyMenuContext {
    index: string;
    itemClick?: (selectedIndex: string) => void;
    type?: MenuType;
    defalutOpenSubMenu?: string[];
    icon?: any;
}
export declare const MenuContext: React.Context<MyMenuContext>;
/**
 * 收纳、排列并展示一系列选项的列表。
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from "@light3711/lightui"
 * ~~~
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
