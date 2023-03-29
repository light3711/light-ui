import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
/**
 *
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from "@light3711/lightui"
 * ~~~
 */
export declare const Icon: React.FC<IconProps>;
