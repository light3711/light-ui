/// <reference types="react" />
import { styleType } from '../../utils/type';
import { PaginationProps } from '../Pagination/Pagination';
interface TransferData {
    key: string;
    title: string;
}
/**
 * @title Transfer
 */
export interface TransferProps extends styleType, Pick<PaginationProps, 'total' | 'pageSize'> {
    /**
     * @pagaintion 开启分页模式
     */
    pagaintion?: boolean;
    /**
     * @sourceArray 左边源数据
     */
    dataSource?: TransferData[];
    /**
     * @sourceBtn 自定义左边按钮
     */
    sourceBtn?: any;
    /**
     * @targetBtn 自定义右边按钮
     */
    targetBtn?: any;
    /**
     * @sourceTitle 自定义左边标题
     */
    sourceTitle?: any;
    /**
     * @targetTitle 自定义右边标题
     */
    targetTitle?: any;
}
/**
 * 两栏布局的多选组件，将元素从一栏即时移到另一栏
 * ### 引用方法
 *
 * ~~~js
 * import { Transfer } from "@light3711/lightui"
 * ~~~
 */
export declare const Transfer: (props: TransferProps, ref: any) => JSX.Element;
export {};
