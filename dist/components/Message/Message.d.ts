import { ReactNode } from 'react';
export declare type MessageType = 'info' | 'success' | 'danger' | 'warning';
export interface MessageProps {
    className?: string;
    top?: string;
    /**
     * @MessageType message类型
     */
    MessageType?: MessageType;
    icon?: any;
    /**
     * @duration 消失时间
     */
    duration?: number;
    /**
       * @content message内容
       */
    content?: ReactNode;
}
export declare const createMessage: () => (content: MessageProps) => void;
/**
 * 全局消息
 * ### 引用方法
 *
 * ~~~js
 * import { createMessage } from "@light3711/lightui"
 * ~~~
 */
export declare const Message: (props: {
    rootDom: HTMLElement;
    parentDom: HTMLElement;
    content: MessageProps;
}) => JSX.Element;
