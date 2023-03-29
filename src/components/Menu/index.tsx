import {FC} from 'react'
import Menu,{MenuProps} from './Menu'
import SubMenu,{SubMenuProps} from './Submenu'
import {MenuItem,MenuItemProps} from './MenuItem'

export type MenuComponent = FC<MenuProps> & {
    Item:FC<MenuItemProps>
    SubMenu:FC<SubMenuProps>
}

const TransMenu = Menu as MenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu