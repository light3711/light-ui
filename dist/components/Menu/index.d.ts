import { FC } from 'react';
import { MenuProps } from './Menu';
import { SubMenuProps } from './Submenu';
import { MenuItemProps } from './MenuItem';
export declare type MenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: MenuComponent;
export default TransMenu;
