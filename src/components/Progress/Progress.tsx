import classNames from "classnames";
import React from "react";
import { styleType } from "../../utils/type";
import { ThemeProps } from "../Icon/Icon";

export interface ProgressProps extends styleType{
    percent:number
    showText:boolean
    theme?:ThemeProps
}

export const Progress:React.FC<ProgressProps> = (props)=>{

    const {percent,showText, theme} = props

    const cx = classNames('lig-progress',{

    },props.className)
    return (
        <div className={cx} style={{
            display:`${percent}%`==='100%'? 'none' : 'block' }} >
            <div className="progress-outer"  >
               <div className={`progress-inner-color-${theme}`} style={{width:`${percent}%` }} >
                   
                   </div> 
            </div>
        </div>
    )
}


Progress.defaultProps={
    showText:true
    ,theme:'primary'
}