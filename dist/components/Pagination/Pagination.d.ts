import React from 'react';
import { styleType } from '../../utils/type';
export interface PaginationProps extends styleType {
    /**
     * @total 数据总量
     */
    total?: number;
    /**
     * @count 展示页左右翼数量
     */
    count?: number;
    /**
     * @currentPage 初始页
     */
    currentPage?: number;
    /**
     * @onClick current点击回调 返回current
     */
    onClick?: (e: number) => void;
    /**
     * @inputJumper  input类型的跳转框
     */
    inputJumper?: boolean;
    /**
     * @selectJumperOption select类型的跳转框
     */
    selectJumperOption?: number[];
    /**
     * @pageSize 每页数据量
     */
    pageSize?: number;
    pageSelectOption?: number[];
    /**
     * @mini 开启mini模式
     */
    mini?: boolean;
    /**
     * @prevCLick 上一页点击回调
     */
    prevCLick?: (value: number) => void;
    /**
     * @nextCLick 下一页点击回调
     */
    nextCLick?: (value: number) => void;
}
/**
 * 采用分页控制单页内的信息数量，也可进行页面跳转
 * ### 引用方法
 *
 * ~~~js
 * import { Pagination } from "@light3711/lightui"
 * ~~~
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<unknown>>;
