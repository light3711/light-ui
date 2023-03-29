import React from "react";
import { styleType } from "../../utils/type";
import { InputProps } from "../Input/Input";
interface CarcaderData {
    value: string;
    label: string;
    children?: CarcaderData[];
}
interface CarcaderProps extends styleType, Pick<InputProps, 'placeholder' | 'onChange' | 'allowClear'> {
    /**
     * @dataSource 数据源
     */
    dataSource?: CarcaderData[];
    disabled?: boolean;
    /**
     * @inputTag 开启inputTag模式
     */
    inputTag?: boolean;
}
/**
 * 指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔
 * ### 引用方法
 *
 * ~~~js
 * import { Cascader } from "@light3711/lightui"
 * ~~~
 */
export declare const Cascader: React.FC<CarcaderProps>;
export default Cascader;
