import React from "react";
export interface MenuItemProps {
    index?: string;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const MenuItem: React.FC<MenuItemProps>;
