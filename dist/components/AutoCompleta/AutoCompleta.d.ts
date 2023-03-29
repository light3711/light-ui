import { FC } from "react";
import { InputProps } from "../Input/Input";
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     *
     * @fetchSuggestion 异步结果
     */
    fetchSuggestion?: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    /**
     * @dataSource 数据源
     */
    dataSource?: any[];
}
export interface DataSourceObject {
    value: string;
    number: number;
}
export declare type DataSourceType<T = {}> = DataSourceObject;
/**
 * 输入框或自定义输入控件的自动补全功能。
 *
 * ### 引用方法
 *
 * ~~~js
 * import { AutoCompleta } from "@light3711/lightui"
 * ~~~
 */
export declare const AutoCompleta: FC<AutoCompleteProps>;
export default AutoCompleta;
