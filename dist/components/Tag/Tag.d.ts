import { CSSProperties, ReactNode } from "react";
export declare type ligDesignColor = 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'cyan' | '';
export interface TagProps {
    style?: CSSProperties;
    children?: any;
    className?: string | string[];
    size?: 'mini' | 'lg';
    /**
     *  需要清除
     */
    allowClose?: boolean;
    /**
     * @zh 设置标签背景颜色
     */
    color?: ligDesignColor;
    /**
     * @zh 是否显示边框
     */
    border?: Boolean;
    /**
     * @zh 设置标签显示隐藏
     */
    visible?: boolean;
    /**
     * @zh 是否可关闭标签
     */
    closable?: boolean;
    /**
     * @zh 是否支持选中
     */
    checkable?: boolean;
    /**
     * @zh 是否默认选中
     */
    defaultChecked?: boolean;
    /**
     * @zh 是否选中（受控模式）
     */
    checked?: boolean;
    /**
     * @zh 设置图标
     */
    icon?: ReactNode;
    /**
     * @zh 关闭标签回调函数
     */
    onClose?: (e: any, children: any) => Promise<any> | void;
    /**
     * @zh 选中的回调
     */
    onCheck?: (checked: boolean) => void;
}
/**
 * 用于信息的选择、筛选、分类
 * ### 引用方法
 *
 * ~~~js
 * import { Tag } from "@light3711/lightui"
 * ~~~
 */
declare const Tag: {
    (props: TagProps, ref: any): JSX.Element;
    defaultProps: {
        allowClose: boolean;
    };
};
export default Tag;
